module.exports = {
    server: {
        port: 20319
    },
    templateFolder: process.cwd() + '/templates',
    dataBase: 'db.db',
    public: 'public',
    crypto: {
        iterations: 128,
        keylen: 64,
        digest: 'sha512'
    },
    nodemailer: {
        transport: {
            host: "smtp.gmail.com",
            port: 465,
            secure: true // true for 465, false for other ports
        }
    },
    auth: {
        facebook: {
            clientID: "546907092793321",
            clientSecret: "1b1cdb0736dcd8791c74a0f6b1a39d13"
        },
        vk: {
            clientID: '7185562',
            clientSecret: 'J1GA28mST8Sj0kKWiaBy'
        }
    }
}