import axios from "axios";

// export function getVideoGames() {
//   // aca sucede la conexion entre front y back
//   return async function (dispatch) {
//     var info = await axios.get(`http://localhost:3001/videogames`);
//     return dispatch({
//       type: "GET_VIDEOGAMES",
//       payload: info.data, // aca te devuelve la respuesta con un data, a diferencia de promesas
//     });
//   };
// }
export function getVideoGames() {
  return async function (dispatch) {
    try {
      const info = await axios.get("http://localhost:3001/videogames");

      return dispatch({
        type: "GET_VIDEOGAMES",
        payload: info.data,
        loading: false,
      });
    } catch (err) {
      return err;
    }
  };
}

export function getGenre() {
  return async function (dispatch) {
    const allGenres = await axios.get(`http://localhost:3001/genre`);
    return dispatch({
      type: "GET_GENRE",
      payload: allGenres.data,
    });
  };
}
export function filterByGenre(payload) {
  return {
    type: "FILTER_GENRE",
    payload,
  };
}

// export function getRating() {
//   return async function (dispatch) {
//     const rating = await axios.get("http://localhost:3001/videogames");
//     return dispatch({
//       type: "GET_RATING",
//       payload: rating.data,
//     });
//   };
// }


export function getCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function filterByRating(payload) {
  return {
    type: "FILTER_RATING",
    payload,
  };
}
export function getName(name) {
  // aca sucede la conexion entre front y back
  return async function (dispatch) {
    try {
      var game = await axios.get(
        `http://localhost:3001/videogames?name=` + name
      );

      return dispatch({
        type: "GET_NAME",
        payload: game.data, //
      });
    } catch (error) {
      return error;
    }
  };
}

export function orderAZ(payload) {
  return {
    type: "ORDEN_AZ",
    payload,
  };
}
export function cardDetails(id) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/videogames/${id}`)
      .then((game) =>
        dispatch(
          game.data.name
            ? { type: "CARD_DETAIL", payload: game.data } // DB
            : { type: "CARD_DETAIL", payload: game.data[0] } // API
        )
      )
      .catch((error) => console.log(error));
  };
}
export function reset(payload) {
  return {
    type: "RESET",
    payload: payload,
  };
}
export function createGame(payload) {
  return async function (dispatch) {
    const data = await axios.post("http://localhost:3001/videogame", payload);
    return dispatch({
      type: "CREATE_GAME",
      data,
    });
  };
}
