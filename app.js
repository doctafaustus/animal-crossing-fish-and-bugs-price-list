// Modules
const express = require('express');
const favicon = require('serve-favicon');


// Initiate Express
const app = express();
app.use(favicon(`${__dirname}/favicon.ico`));

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

app.get('/optimizely-test', (req, res) => {
	res.sendFile(`${__dirname}/optimizely-test.html`);
});

app.get('/privacy-policy', (req, res) => {
	res.sendFile(`${__dirname}/privacy-policy.html`);
});

app.listen(process.env.PORT || 3000, (req, res) => {
	console.log('App listening on port 3000');
});
