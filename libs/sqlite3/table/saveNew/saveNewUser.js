const db = require('../../createDB');

module.exports = async (user, callback) => {
    return new Promise(resolve => {
        let newUser = db.prepare(`INSERT INTO Users(
            id,
            email, 
            confirmemail, 
            displayname, 
            dateregistration, 
            password,
            salt,
            avatarpath) 
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?)`);
    
        newUser.run(user.id, user.email, false, user.displayname, user.password, user.salt, 'img/ava.jpg', () => {
            callback();
            resolve();
        });
    })
    

}