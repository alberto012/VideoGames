
import axios from "axios";

export default function getVideogames() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/videogames");
    console.log(json)
    return dispatch({
        type: "GET_VIDEOGAMES",
        payload: json.data
    })
  };
}
export function createGame(payload){
  return async function(dispatch){
    const data= await axios.post("http://localhost:3001/videogame", payload)
    return data
  }
}

export function getGenre(){
  return async function(dispatch){
    const gender= await axios.get('http://localhost:3001/genre',{});
    return dispatch({
      type: "GET_GENRE",
      payload:gender.data
    })
  }
}
export function filterByGenre(payload){
    return{
      type: "FILTER_GENRE",
      payload,
    }
  
}
export function cardDetails(id){
  return async function(dispatch){
    try{
      var info= await axios.get(`http://localhost:3001/videogames/${id}`)
      return dispatch({
        type:"CARD_DETAIL",
        payload: info.data,
      })
    }catch (err){
      return err
    }
  }
}