const crypto = require('crypto');
const config = require('config');

module.exports = (salt, password) => {
    return new Promise(resolve => {
        crypto.pbkdf2(password, salt, config.get('crypto.iterations'), config.get('crypto.keylen'), 'sha512', (err, key) => {
            resolve(key.toString('hex'));
        })
    })
}