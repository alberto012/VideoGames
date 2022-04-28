
const initialState = {
    videogame: [],
    backUpGames:[],
    genres:[],
    backUpGenres:[],
  };

function ReducerReducer(state=initialState, action){
    switch(action.type){
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogame:action.payload,
                backUpGames:action.payload,
            }
            case 'GET_GENRE':
                return{
                    ...state,
                    genres:action.payload,
                    
                }
                case 'FILTER_GENRE':
                    const allGames= state.backUpGames
                    const filtrado= 
                    action.payload === "all"
                    ? allGames
                    :allGames.filter((e)=> e.genres?.includes(action.payload))
                    return{
                        ...state,
                        videogame: filtrado
                    }
            default:
            return state
    }
}
export default ReducerReducer;  