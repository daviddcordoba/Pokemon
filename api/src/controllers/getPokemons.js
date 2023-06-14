const {Pokemon,Types} = require('../db')
const axios = require('axios')
const { Op } = require('sequelize');

const URL = 'https://pokeapi.co/api/v2/pokemon';

async function getPokemons(req,res){
    try{
        const {name} = req.query;
        
        if(name){
            const inDataBase = await Pokemon.findAll({
                where:{
                    nombre:{[Op.like]:`%${name}%`}
                },
                include: {
                    model:Types,
                    attributes:['nombre'],
                    through:{
                        attributes:[]
                        
                    },
                    raw: true 
            }
        });
            
            if (inDataBase.length > 0) {
                return res.status(200).json(inDataBase)
            }else{
                const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
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
                    types: data.data.types.map( type => {return {nombre:type.type.name}})
                })
            } 
        }
        
        const pokemon_data_api = [];
        
        const {data} = await axios.get(URL);
        for (const pokemon of data.results) {
            const {data:pokemon_data} = await axios.get(pokemon.url)
            
            const {id,sprites,stats,weight,height} = pokemon_data;
            
            pokemon_data_api.push({
                id: id,
                nombre: pokemon_data.name,
                imagen:sprites.other.home.front_default,
                vida : stats[0].base_stat,
                ataque:stats[1].base_stat,
                defensa:stats[2].base_stat,
                velocidad:stats[5].base_stat,
                altura:height,
                peso:weight,
                types: pokemon_data.types.map( type => {return {nombre:type.type.name}})
            })
        }
        let pokemon_data_db = [];
        
        pokemon_data_db = await Pokemon.findAll({
             include: {
                model:Types,
                attributes:['nombre'],
                through:{
                    attributes:[]
                    
                },
                raw: true 
            }
        });
        
        
        
        return res.status(200).json([...pokemon_data_api,...pokemon_data_db]); 
        
            }catch(error){
                res.status(500).send(error.message);
            }
}

module.exports = getPokemons;

  