require("dotenv").config();
const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { API_KEY } = process.env;
const router = Router();
const axios = require("axios");
const { Videogame, Genre } = require("../db");
//DATOS DE LA BASE DE DATOS

const DBase = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const llamadoTotal = async () => {
  const llamado1 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}`
  );
  const llamado2 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=2`
  );
  const llamado3 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=3`
  );
  const llamado4 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=4`
  );
  const llamado5 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=5`
  );
  const llamadasApi = await llamado1.data.results.concat(
    llamado2.data.results,
    llamado3.data.results,
    llamado4.data.results,
    llamado5.data.results
  );
  const total = await Promise.all(llamadasApi);
  const final = await total.map((e) => {
    return {
      id: e.id,
      name: e.name,
      background_image: e.background_image,
      description: e.description_raw,
      released: e.released,
      platforms: e.platforms.map((e) => e.platform.name),
      genres: e.genres.map((e) => {
        return { name: e.name };
      }),
      rating: e.rating,
    };
  });
  return final;
};

const all = async () => {
  const apiInfo = await llamadoTotal();
  const dBaseInfo = await DBase();
  const todo = apiInfo.concat(dBaseInfo);
  return todo;
};
//buscar por query
const apiName = async (name) => {
  try {
    const vGmes = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
    );
    const segundo = await vGmes.data.results;
    const final = await segundo.map((e) => {
      return {
        id: e.id,
        background_image: e.background_image,
        name: e.name,
        description: e.description_raw,
        released: e.released,
        rating: e.rating,
        platforms: e.platforms.map((e) => e.platform.name),
        genres: (e) => {
          return { name: e.name };
        },
      };
    });
    return final;
  } catch (err) {
    console.log(err);
  }
};
////////////////////////////////buscar por query EN LA BASE DE DATOS
const db = async (name) => {
  try {
    const nGame = await Videogame.findAll({
      //busco en todos los juegos de mi db los que cumplan con la condicion where, o sea q coincida el nombre
      where: { name: name },
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const detalle = nGame.map((e) => {
      return {
        id: e.id,
        background_image: e.background_image,
        name: e.name,
        description: e.description,
        released: e.released,
        rating: e.rating,
        platforms: e.platforms,
        genres: (e) => {
          return { name: e.name };
        },
      };
    });
    return detalle;
  } catch (error) {
    console.log(error);
  }
};
const QueryAll = async (name) => {
  const apiInfo = await apiName(name);
  const dbInfo = await db(name);
  const todosQuery = dbInfo.concat(apiInfo);
  return todosQuery;
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
//RUTEO
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  // console.log(name);
  const allGames = await all(); //creo por fuera la const para llamarla si no me pasan name en el else abajo de todo
  if (name) {
    const allVid = await QueryAll(name);
    allVid.length //si mi funcion concatenada de api y db tenia coincidencias o sea elementos
      ? res.send(allVid.slice(0, 15)) //solo los primeros 15
      : res.status(404).send("this game does not exist"); //sino msj adecuado
    return;
  } else {
    res.status(200).send(allGames);
    return;
  }
});
///id

router.get("/videogames/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id);
    // console.log(API_KEY);
    if (id.toString().length < 15) {
      const idApiVideogame = [];
      console.log(idApiVideogame);
      await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`).then(
        (game) => {
          // FALTA: AGREGAR SI NO ENCUENTRA EL GAME RESUESTA
          idApiVideogame.push({
            name: game.data.name,
            id: game.data.id,
            genres: game.data.genres,
            released: game.data.released,
            rating: game.data.rating,
            description: game.data.description_raw,
            background_image: game.data.background_image,
            platforms: game.data.platforms,
          });
        
          res.status(200).json(idApiVideogame);
        }
      );
    } else {
      const videosdb = await Videogame.findOne({
        where: { id: id },
        include: Genre,
      });
      videosdb
        ? res.status(200).json(videosdb)
        : res.status(404).send("DB: Game don't exist, try with other game.");
    }
  } catch (error) {
    next(error);
  }
});

///Crear Juego
router.post("/videogame", async (req, res) => {
  const {
    id,
    name,
    background_image,
    description,
    released,
    rating,
    genres,
    platforms,
  } = req.body;
  try {
    let newVideogame = await Videogame.create({
      id,
      name,
      description,
      background_image,
      released,
      rating,
      platforms,
    });

    let findgenres = await Genre.findAll({
      where: { name: genres },
    });

    newVideogame.addGenre(findgenres);
    res.send("VideoGame Created Successfully");
  } catch (error) {
    console.log("Error en la ruta de Post");
  }
});


//todos los generos

const allGenres = async () => {
  const ApiGenre = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}&number=100`
  );
  const info = ApiGenre.data.results;
  const filtro = info.map((e) => e.name);

  const genre = filtro.map((e) => e?.split(" "));
  genre.forEach((e) => {
    e?.map((e) => {
      e = e.replace(/,/i, "");

      Genre.findOrCreate({
        where: { name: e },
      });
    });
  });
  const typeOpGenre = await Genre.findAll();

  return typeOpGenre;
};

/////// generos

router.get("/genre", async (req, res) => {
  let genre = await allGenres();
  res.status(200).send(genre);
});

///Delete

module.exports = router;
