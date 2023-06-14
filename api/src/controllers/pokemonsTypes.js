const  axios = require("axios")
const {Types} = require('../db')
async function pokemonsTypes(req,res){
    try {
        const {data} = await axios.get('https://pokeapi.co/api/v2/type')
        
        for (const type of data.results) {
            
            let type_id = type.url.split('/')
            type_id = type_id[type_id.length - 2] 
            
            if(Number(type_id) < 19){
                await Types.findOrCreate(
                    {where: {id:type_id,nombre:type.name}})
            }
        }

        const types_db = await Types.findAll();
        
        return res.status(200).json(types_db)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
module.exports = pokemonsTypes

/* results": [
    {
      "name": "normal",
      "url": "https://pokeapi.co/api/v2/type/1/"
    },
    {
      "name": "fighting",
      "url": "https://pokeapi.co/api/v2/type/2/"
    },
 ] */