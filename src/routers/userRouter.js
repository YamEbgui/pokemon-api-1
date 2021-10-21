const { response } = require('express');
const express = require('express');
const router = express.Router();
module.exports = router;

router.post('/', (request, response) => {
	console.log('in');
	try {
		response.send(request.headers.username);
	} catch {
		response.status(401);
		response.send('No username was provided');
	}
});
