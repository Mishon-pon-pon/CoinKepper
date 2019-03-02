const server = require('./app');
const config = require('config');

server.listen(config.get('port'), () => {
    console.log('Server is run!');
});