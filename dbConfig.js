const config = {
    user: 'sa',
    password: 'foo',
    server: 'DARSHAN_PC',
    database: 'suggesto',
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instanceName: 'SQLEXPRESS'
    },
    port: 1433
}

module.exports = config;
