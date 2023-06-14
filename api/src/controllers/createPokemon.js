const {Pokemon,Types} = require('../db')

async function createPokemon(req, res) {
    const { id,nombre,imagen,vida,ataque,defensa,velocidad,altura,peso,types } = req.body;
  
    const [newPokemon, created] = await Pokemon.findOrCreate({
      where: { id: id },
      defaults: {nombre,imagen,vida,ataque,defensa,velocidad,altura,peso},
    
    });
    
  
    // Relacionar el pokemon con sus tipos
    const tiposPokemon = await Types.findAll({ where: { nombre: types } });
   
    await newPokemon.setTypes(tiposPokemon);
  
    return res.status(201).json(newPokemon);
  }

module.exports = createPokemon