const logger = require('minilog')('app');

const { createServer } = require('http');
const WebSocket = require('ws')

let interval = null
const TIMEOUT  = 30000

const {
  ws_port
} = require('./config');

module.exports = (app) => {

  wss = createServer( function(req,res){
    res.writeHead(404)
    res.end()
  });

  wss.listen(ws_port, ()=>{
    logger.info(`Websocket Server is now running on http://localhost:${ws_port}`)
  });

  return wss;

  // heartbeat example taken from:
  // https://github.com/websockets/wss
  function heartbeat(){
    this.isAlive = true
  }

  wss.on('connection', function connection(ws){
    console.log(ws);
    ws.isAlive = true
    ws.on('pong', heartbeat)
  })

  interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
      if(ws.isAlive === false) {

        console.log( "We found a dead WebSocket client. Terminate it!")
        return ws.terminate()
      }

      ws.isAlive = false
      ws.ping('', false, true)
    });
  }, TIMEOUT);
}
