exports.configServer = {
    port: 7000,
    console: {
        express: true,
        database: true
    },
    mssql: {
        connectionString: "Driver={SQL Server Native Client 11.0};Server=localhost;Database=SQL_Test;Uid=dx;Pwd=654321;"
    }
}