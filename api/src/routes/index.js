const { Router } = require('express');
const getPokemons = require('../controllers/getPokemons');
const getPokemonById = require('../controllers/getPokemonById');
const getPokemonByName = require('../controllers/getPokemonByName');
const createPokemon = require('../controllers/createPokemon');
const pokemonsTypes = require('../controllers/pokemonsTypes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
router.get('/pokemons',getPokemons);
router.get('/pokemons/:idPokemon', getPokemonById);
router.get('/pokemons', getPokemonByName);
router.get('/types',pokemonsTypes)

router.post('/pokemons', createPokemon);

module.exports = router;
