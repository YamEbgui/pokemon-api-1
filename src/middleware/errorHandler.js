const e = require('express');
const express = require('express');
// const router = express.Router();
module.exports = errorHandler;

// router.post('/info', (request, response,error,e) => {
// 	console.log(e);
// 	switch (error) {
// 		case 404:
// 			response.status(404);
// 			response.send('No such pokemon, try another name');
// 			break;

// 		case 403:
// 			response.status(403);
// 			response.send(`${username} has already cought this pokemon`);
// 			break;

// 		case 500:
// 			response.status(500);
// 			response.send('Server error, please try again later');
// 			break;

// 		case 401:
// 			response.status(401);
// 			response.send('No username was provided');
// 			break;
// 	}
// });

function errorHandler(error, response) {
	switch (error) {
		case 404:
			response.status(404);
			response.send('No such pokemon, try another name');
			break;

		case 403:
			console.log();
			response.status(403);
			response.send(
				`User tried to release an uncaught pokemon, or catching an already caught pokemon `
			);
			break;

		case 500:
			response.status(500);
			response.send('Server error, please try again later');
			break;

		case 401:
			response.status(401);
			response.send('Unauthenticated user request');
			break;
	}
}
