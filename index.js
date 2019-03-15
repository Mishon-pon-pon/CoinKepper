const server = require('./app');
const config = require('config');

server.listen(config.get('server.port'), () => {
    console.log('Server is run!');
});