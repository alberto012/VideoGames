const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    released: {
      type: DataTypes.STRING, //STRING //DATEONLY
      allowNull: false, // no son obligatorias
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING), //DataTypes.STRING, //array de objetos DataTypes.ARRAY(DataTypes.STRING)
      allowNull: false,
    },

    background_image: {
      type: DataTypes.STRING(2000),///tipo TEXT sirve tambien
      
      allowNull: false,
    },

    createdVideoGame: {
      //esta propiedad me sirve para consultar solo aquellos juegos creados en mi base de datos
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
