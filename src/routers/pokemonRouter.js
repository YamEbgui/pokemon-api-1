const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
module.exports = router;

router.get('/get/:id', async (request, response) => {
	const { id } = request.params;
	let pokemonObject = pokemonToRespond(await getPokemon(id));
	response.send(pokemonObject);
});

router.get('/query', async (request, response) => {
	const query = request.query.name;
	const pokemon = await getPokemon(query);
	if (pokemon) {
		console.log('in if');
		let pokemonObject = pokemonToRespond(pokemon);
		response.send(pokemonObject);
	} else {
		response.send('No such pokemon, try another name');
	}
});

router.put('/catch/:id', async (request, response) => {
	const username = request.headers.username;
	const id = request.params.id;

	if (hasCaughtPokemon(username, id)) {
		response.status(403);
		response.send(`${username} has already cought this pokemon`);
	} else {
		try {
			await catchPokemon(username, id);
			response.send(`${username} cought this wild pokemon!`);
		} catch {
			response.status(500);
			response.send("Couldn't catch this pokemon, please try again later");
		}
	}
});

async function getPokemon(id) {
	try {
		return await P.getPokemonByName(id).then((response) => {
			return response;
		});
	} catch (error) {
		return false;
	}
}

function pokemonToRespond(pokemon) {
	console.log(pokemon);
	return {
		name: pokemon.name,
		height: pokemon.height,
		weight: pokemon.weight,
		types: pokemon.types,
		front_pic: pokemon.sprites.front_default,
		back_pic: pokemon.sprites.back_default,
		abilities: pokemon.abilities,
	};
}

function hasCaughtPokemon(username, id) {
	const userPokemons = fs.readdirSync(`./users/${username}`);
	for (const pokemon of userPokemons) {
		if (path.parse(`${pokemon}`).name == id) {
			return true;
		}
	}
	return false;
}

async function catchPokemon(username, id) {
	const pokemon = pokemonToRespond(await getPokemon(id));
	await fs.writeFile(
		`./users/${username}/${id}.json`,
		JSON.stringify(pokemon),
		(error) => {
			if (error) {
				return error;
			}
		}
	);
}
