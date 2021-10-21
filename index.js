const express = require('express');
const app = express();
const port = 8080;
const pokemonRouter = require('./src/routers/pokemonRouter');

app.use('/pokemon', pokemonRouter);

// start the server
app.listen(port, function () {
	console.log('app started');
});
