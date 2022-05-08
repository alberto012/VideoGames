const initialState = {
  videogame: [],
  backUpGames: [],
  genres: [],
  backUpGenres: [],
  detail: {},
};

function ReducerReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogame: action.payload,
        backUpGames: action.payload,
      };
    case "GET_GENRE":
      return {
        ...state,
        genres: action.payload,
        backUpGenres: action.payload,
      };
    case "POST_GAME":
      return {
        ...state,
      };
    case "FILTER_GENRE":
      const allGames = state.backUpGames;
      const filtrado =
        action.payload === "all"
          ? allGames
          : allGames.filter((e) =>
              e.genres?.map((e) => e.name).includes(action.payload)
            );
      return {
        ...state,
        videogame: filtrado,
      };
    case "FILTER_CREATED":
      const filterCreate =
        action.payload === "created"
          ? state.backUpGames.filter((e) => e.createdVideoGame)
          : state.backUpGames.filter((e) => !e.createdVideoGame);

      return {
        ...state,
        videogame: filterCreate,
      };
    case "ORDEN_AZ":
      let abc =
        action.payload === "desc"
          ? state.videogame?.sort(function (a, b) {
              if (a.name < b.name) {
                return 1;
              }
              if (a.name > b.name) {
                return -1;
              } else {
                return 0;
              }
            })
          : state.videogame?.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              } else {
                return 0;
              }
            });

      return {
        ...state,
        videogame: abc,
      };
    case "FILTER_RATING":
      let star =
        action.payload === "asc"
          ? state.videogame?.sort(function (a, b) {
              if (a.rating < b.rating) {
                return 1;
              }
              if (a.rating > b.rating) {
                return -1;
              } else {
                return 0;
              }
            })
          : state.videogame?.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (a.rating < b.rating) {
                return -1;
              } else {
                return 0;
              }
            });

      return {
        ...state,
        videogame: star,
      };
    case "GET_NAME":
      return {
        ...state,
        videogame: action.payload,
      };
    case "CARD_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
      case "RESET":
        return{
          ...state,
          detail:action.payload,
        }
    default:
      return state;
  }
}
export default ReducerReducer;
