require('module-alias/register');
import http from 'http';
import 'reflect-metadata';
import debugLib from 'debug';
import 'module-alias';
import { PORT, DB_URI } from '../shared/configs/env.config';
import logger from '../shared/configs/logs.config';
import App from '../app';
// import AuthController from '../modules/auth/auth.controller';
import connectMongoDb from '../shared/configs/db/mongo.config';
import connectPgDb from '../shared/configs/db/pg.config';
import DatabaseFactory from '../shared/configs/db';

const app = new App([
  //   new AuthController(),
]);

const debug = debugLib('<project-name>:server');

// connectDb(DB_URI);
const database = new DatabaseFactory(connectPgDb);
(async function (uri: string) {
  await database.connect(uri);
})(DB_URI);

const server = http.createServer(app.app);
// Get port from environment and store in express
const port = normalizePort(PORT);

app.app.set('port', port);

// Normalize a port into a number, string or false.
function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }
  return false;
}

// Event listener for http server 'listening' event
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  debug(`Listening on ${bind}`);
}

function onError(error: { syscall: string; code: any }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  //   handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.log(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

server.listen(port, () => {
  logger.info(
    `Server actively eavesdropping 👂 👂 👂 👂 @port: ${PORT}`.green.bold
  );
});

server.on('listening', onListening);
server.on('error', onError);
