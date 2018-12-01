const express = require('express');
const bodyParser = require('body-parser');


const host = "0.0.0.0";
const port = 6642;

const app = express();
app.use(express.static('frontend'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, host);
console.log(`Running on http://${host}:${port}`);

module.exports = app;
