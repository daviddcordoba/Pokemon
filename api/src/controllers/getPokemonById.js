
const axios = require('axios');
const {Pokemon} = require('../db')

async function getPokemonById(req,res){
    try{
        const {idPokemon} = req.params
        const data_db = await Pokemon.findByPk(idPokemon);
        const pokemon_data_db = data_db?.dataValues;
        
        if(pokemon_data_db){
            return res.status(200).json(pokemon_data_db)
        }else{
            const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
            const {id,sprites,stats,weight,height} = data.data;
                
                return res.status(200).json({
                    id: id,
                    nombre: data.data.name,
                    imagen:sprites.other.home.front_default,
                    vida : stats[0].base_stat,
                    ataque:stats[1].base_stat,
                    defensa:stats[2].base_stat,
                    velocidad:stats[5].base_stat,
                    altura:height,
                    peso:weight,
                    types: data.data.types.map( type => type.type.name)
                })
        }
    }catch(error){
        return res.status(500).json({error:error.message})
    }
}

module.exports = getPokemonById;