const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const http = require('http');
const router = require('./router');
// https://www.npmjs.com/package/cors
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mern');

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));

router(app);

const port = process.env.PORT || 3090;

const server = http.createServer(app);
server.listen(port);

console.log('server listening on port: ' + port);


