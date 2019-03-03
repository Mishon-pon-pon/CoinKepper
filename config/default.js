module.exports = {
    port: 20319,
    templateFolder: process.cwd() + '/templates',
    dataBase: 'db.db',
    public: 'public',
    crypto: {
        iterations: 128,
        keylen: 64,
        digest: 'sha512'
    }
}