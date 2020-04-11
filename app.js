// Modules
const express = require('express');

// Globals
const port = process.env.PORT || 3000;

// Initiate Express
const app = express();
app.use('/', express.static(`${__dirname}/public`)); 

app.get('/', function(req, res) {
	res.sendFile(`${__dirname}/index.html`);
});

app.listen(port, function(req, res) {
	console.log('App listening on port 3000');
});
