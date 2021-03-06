const cluster = require('cluster');
const os = require('os');
const pid = process.pid;

if (cluster.isMaster) {
    const cpusCount = os.cpus().length;
    console.log(`CPUs: ${cpusCount}`);
    console.log(`Master started. Pid: ${pid}`);
    for(let i = 0; i < cpusCount-1; i++) {
        cluster.fork();
    }
}

if (cluster.isWorker)  {
    require('./index.js')
}