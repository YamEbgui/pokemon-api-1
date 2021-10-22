const express = require('express');
const router = express.Router();
const errorHandler = require('../middleware/errorHandler');
const fs = require('fs');
module.exports = router;

router.post('/', (request, response) => {
	const username = request.headers.username;
	if (!doesUserExist(username)) {
		errorHandler(401, response);
	} else {
		response.send(request.headers.username);
	}
});

function doesUserExist(username) {
	const usersList = fs.readdirSync(`./users`);
	for (const user of usersList) {
		if (username == user) {
			return true;
		}
	}
	return false;
}