var Sequelize = require('sequelize');

const config = {
    userName: 'PW_DataCollect',
    password: '!data!',
    hostName: 'PW10inf-SQL.perkinswill.net',
    dbName: 'PWAssetsPush'
}

const PWAssetDb =  new Sequelize(config.dbName, config.userName, config.password, {
    dialect: 'mssql',
    host: config.hostName,
    port: 1433,
    logging: false,
    dialectOptions: {
        requestTimeout: 30000
    }
});

PWAssetDb
    .authenticate()
    .then( () => {
        console.log(`Connection to ${config.dbName} is successful.` )
    })
    .catch( err => {
        console.error(`Unable to connect to ${config.dbName}...`)
    })

const CollectedData = PWAssetDb.define('CollectedData', {
    date_created: {
        type: Sequelize.DATE
    },
    computer_name: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    site: {
        type: Sequelize.STRING
    },
    serial: {
        type: Sequelize.STRING
    },
    console_user: {
        type: Sequelize.STRING
    },
    UPN: {
        type: Sequelize.STRING
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
        type: Sequelize.STRING
    },
    current_os_install_date: {
        type: Sequelize.STRING
    },
    original_os_install_date: {
        type: Sequelize.STRING
    },
    original_os_build_number: {
        type: Sequelize.STRING
    }
},
{timestamps: false});

CollectedData.findAll({
    attributes: ["date_created", "site", "computer_name"]
}).then(ws => ws)
