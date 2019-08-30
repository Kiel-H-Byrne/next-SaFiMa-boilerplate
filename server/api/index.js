const express = require('express')
const cors = require('cors')
const router = express.Router()
const async = require('async');
require('dotenv')
    
function Start(callback) {
    console.log('Starting...');
    return
    // callback(null, 'Jake', 'United States');
}

function Insert(name, location, callback) {
    console.log("Inserting '" + name + "' into Table...");

    request = new Request(
        'INSERT INTO TestSchema.Employees (Name, Location) OUTPUT INSERTED.Id VALUES (@Name, @Location);',
        function(err, rowCount, rows) {
        if (err) {
            callback(err);
        } else {
            console.log(rowCount + ' row(s) inserted');
            callback(null, 'Nikita', 'United States');
        }
        });
    request.addParameter('Name', TYPES.NVarChar, name);
    request.addParameter('Location', TYPES.NVarChar, location);

    // Execute SQL statement
    connection.execSql(request);
}

function Update(name, location, callback) {
    console.log("Updating Location to '" + location + "' for '" + name + "'...");

    // Update the employee record requested
    request = new Request(
    'UPDATE TestSchema.Employees SET Location=@Location WHERE Name = @Name;',
    function(err, rowCount, rows) {
        if (err) {
        callback(err);
        } else {
        console.log(rowCount + ' row(s) updated');
        callback(null, 'Jared');
        }
    });
    request.addParameter('Name', TYPES.NVarChar, name);
    request.addParameter('Location', TYPES.NVarChar, location);

    // Execute SQL statement
    connection.execSql(request);
}

function Delete(name, callback) {
    console.log("Deleting '" + name + "' from Table...");

    // Delete the employee record requested
    request = new Request(
        'DELETE FROM TestSchema.Employees WHERE Name = @Name;',
        function(err, rowCount, rows) {
        if (err) {
            callback(err);
        } else {
            console.log(rowCount + ' row(s) deleted');
            callback(null);
        }
        });
    request.addParameter('Name', TYPES.NVarChar, name);

    // Execute SQL statement
    connection.execSql(request);
}

function Read(callback) {
    console.log('Reading rows from the Table...');

    // Read all rows from table
    request = new Request(
        'SELECT date_created, computer_name FROM [PWAssetsPush].[dbo].[CollectedData];',
        function(err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log(rowCount + ' row(s) returned');
                // callback(null);
                // return rows;
            }
        }
    );

    // Print the rows read
    var result = "";
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log("got result");
        // result = "";
        return result
    });

    // Execute SQL statement
    connection.execSql(request);
}

function Complete(err, result) {
    if (err) {
        callback(err);
    } else {
        console.log("Done!");
        connection.close()
    }
}

router.get('/test', function (req,res) {
    console.log("running tests...")
    // console.log(res)
    return res.json({"result": [
        {"ID":1,
    "name":"howdyho"},
    {"ID": 2,
    "name": "heidhgie"}
    ]})
})

router.get('/assets', (req,res) => {
    // Attempt to connect and execute queries if connection goes through
    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to SQL DB: ');

            // Execute all functions in the array serially
            return async.waterfall([
                Start,
                Read
            ], Complete)
        }
    });
    // console.log(res);
    return res.json({return: "hi"})
})

router.get('/sql', ({query, params},res) => {
    const sqlz =  new Sequelize(dbConfig.dbName, dbConfig.userName, dbConfig.password, {
        dialect: 'mssql',
        host: dbConfig.hostName,
        port: 1433,
        dialectOptions: {
            requestTimeout: 30000
        },
        paranoid: true,
        sync: { force: true },
        pool: {
            max: 5,
            idle: 30000,
            acquire: 60000,
        }
    });
    
    sqlz
    .authenticate()
    .then( () => {
        console.log(`Connection to ${dbConfig.dbName} is successful.` )
    })
    .catch( err => {
        console.error(`Unable to connect to ${dbConfig.dbName}...`)
    });

    // const makeQuery = (attr,query) => {
    //     attr: query
    // }
    const CollectedData = sqlz.define('CollectedData', {
        date_created: {
            type: Sequelize.DATE
        },
        computer_name: {
            type: Sequelize.STRING
        },
        site: {
            type: Sequelize.STRING
        },
        serial: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        console_user: {
            type: Sequelize.STRING,
            unique: true
        },
        UPN: {
            type: Sequelize.STRING,
            unique: true
        },
        logon_time_UTC: {
            type: Sequelize.TIME
        },
        ipv4_address: {
            type: Sequelize.STRING
        },
        manufacturer: {
            type: Sequelize.STRING
        },
        model_name: {
            type: Sequelize.STRING
        },
        model_number: {
            type: Sequelize.STRING
        },
        os_build_number: {
            type: Sequelize.STRING,
            unique: true
        },
        current_os_install_date: {
            type: Sequelize.STRING
        },
        original_os_install_date: {
            type: Sequelize.STRING
        },
        original_os_build_number: {
            type: Sequelize.STRING,
            unique: true
        }
    },
    {timestamps: false});
    
    // CollectedData.findAll({
    //     where: query,
    //     limit: 50000,
    //     attributes: ["date_created", "site", "serial", "computer_name", "console_user", "UPN", "logon_time_UTC", "model_number", "ipv4_address", "manufacturer","model_name", "current_os_install_date", "original_os_install_date", "os_build_number","original_os_build_number"]
    // })
    // .then(result => res.json(result))

    sqlz.query(`SELECT tt.*
    FROM [PWAssetsPush].[dbo].[CollectedData] tt
    INNER JOIN
        (SELECT computer_name, MAX(logon_time_UTC) AS MaxDateTime
        FROM [PWAssetsPush].[dbo].[CollectedData]
        GROUP BY computer_name) groupedtt 
    ON tt.computer_name = groupedtt.computer_name 
    AND tt.logon_time_UTC = groupedtt.MaxDateTime`, {
        type: sqlz.QueryTypes.SELECT
    }).then(result => {
        res.json(result)
    })

});

module.exports = router

//unique hostnames with most recent logon date
