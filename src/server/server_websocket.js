const logger = require('minilog')('app');

const { createServer } = require('http');

const TIMEOUT = 30000;

const { ws_port } = require('./config');

module.exports = () => {

  const wss = createServer((req, res) => {
    res.writeHead(404);
    res.end();
  });

  wss.listen(ws_port, () => {
    logger.info(`Websocket Server is now running on ws://localhost:${ ws_port }`);
  });

  wss.on('connection', ws => {
    ws.isAlive = true;
    ws.on('pong', () => {
      ws.isAlive = true;
    });
  });

  setInterval(() => {
    // wss.clients.forEach(ws => {
    //   if (ws.isAlive === false)
    //     return ws.terminate();

    //   ws.isAlive = false;
    //   ws.ping('', false, true);
    // });
  }, TIMEOUT);

  return wss;

};
