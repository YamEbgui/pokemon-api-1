const express = require('express');
const router = express.Router();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
module.exports = router;

router.get('/get/:id', async (request, response) => {
	const { id } = request.params;
	let pokemonObject = pokemonToRespond(await getPokemon(id));
	response.send(pokemonObject);
});

router.get('/:query', async (request, response) => {
	const { query } = request.params;
	let pokemonObject = pokemonToRespond(await getPokemon(query));
	response.send(pokemonObject);
});

router.put('/catch/:id', (request, response) => {});

// function checkIfUserCatch(params) {}

async function getPokemon(id) {
	try {
		return await P.getPokemonByName(id).then((response) => {
			return response;
		});
	} catch (error) {
		console.log(error);
	}
}

function pokemonToRespond(pokemon) {
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
