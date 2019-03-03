const db = require('../../createDB');

module.exports = async (obj, callback) => {
    let newUser = db.prepare(`INSERT INTO Users(
        email, 
        confirmemail, 
        displayname, 
        dateregistration, 
        password,
        salt,
        avatarpath) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`);

    newUser.run(obj.email, false, obj.displayname, new Date(), obj.password, 'salt', 'img/ava.jpg', () => {
        callback();
    });

}