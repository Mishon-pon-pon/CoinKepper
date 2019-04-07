const db = require('../../createDB');

module.exports = async (user, callback) => {
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
    
        newUser.run(user.email, false, user.displayname, new Date(), user.password, user.salt, 'img/ava.jpg', () => {
            callback();
            resolve();
        });
    })
    

}