const db = require('../../createDB');

module.exports = async (obj, callback) => {
    return new Promise(resolve => {
        let newUser = db.prepare(`INSERT INTO Users(
            email, 
            confirmemail, 
            displayname, 
            dateregistration, 
            password,
            salt,
            avatarpath) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`);
    
        newUser.run(obj.email, false, obj.displayname, new Date(), obj.password, obj.salt, 'img/ava.jpg', () => {
            callback();
            resolve();
        });
    })
    

}