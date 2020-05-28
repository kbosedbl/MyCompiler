/*const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/execution' , require('./execution'));
module.exports = app;

*/

const http = require('http');

const app = require('./App');
const config = require('./configs/default');

const port = config.port;
const server = http.createServer(app);
server.listen(port);

console.log('server is running on port ' + port);