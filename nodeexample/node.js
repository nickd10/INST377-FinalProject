const http = require('http');

const hostName = '127.0.0.1';
const port = 3000;

const server = http.createServer(() => {});
server.listen(port, hostName, () => {
  console.log(`Server running at http://${hostNamw}:${port}`);
});