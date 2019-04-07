module.exports = {
    server: {
        port: 20319
    },
    templateFolder: process.cwd() + '/templates',
    dataBase: 'db.db',
    public: 'client',
    crypto: {
        iterations: 128,
        keylen: 64,
        digest: 'sha512'
    },
    nodemailer: {
        transport: {
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'CoinKepperCorp@gmail.com', // generated ethereal user
                pass: 'Kfpfymz@166' // generated ethereal password
            }
        }
    }
}