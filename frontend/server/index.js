const express = require('express');
const cors = require('cors');
const serveStatic = require('serve-static');
const proxy = require('express-http-proxy');

const app = express();

const port = 3000;

app.use(cors());

app.get('/api/*', proxy(process.env.API_URL || 'localhost:3000'));

app.use(serveStatic('build', {index: 'index.html'}));

app.listen(port, () => {
	/* eslint-disable-next-line no-console */
	console.log(`Server is running on port ${port}`);
});
