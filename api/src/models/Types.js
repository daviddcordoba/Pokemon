const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('types', {
        id :{
        type: DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true 
        },
        nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        }
    }, 
    {
      timestamps: false // Excluye las propiedades createdAt y updatedAt
    });
    };
