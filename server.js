const development = process.env.NODE_ENV !== 'production';
if (development) require('dotenv').config();
const cluster = require('cluster');

if (cluster.isMaster) {
  const workerPool = process.env.WEB_CONCURRENCY || 1;
  for (let i=0; i < workerPool; i++) {
    cluster.fork();
  }
  cluster.on('exit', function(worker, _, signal) {
    console.log(`Worker ${worker.id} died.`);
    cluster.fork();
  });
} else {
  const express = require('express');
  const helmet = require('helmet');
  const cors = require('cors');
  
  const app = express();
  const port = process.env.PORT || 3000;
  const appRouter = require(`${__dirname}/route/endpoints`);

  app.use(helmet());
  app.use(cors());
  app.use(express.static('public'));
  app.use(appRouter);

  app.get('/', function (_req, res) {
    res.sendFile(__dirname + '/views/index.html');
  });

  app.listen(port, function () {
    if (development) {
      console.log(`Worker ${cluster.worker.id} listening at: http://localhost:${port}`);
    }
  });
}