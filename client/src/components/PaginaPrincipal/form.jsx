


import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGenre } from "../../actions/actions";
export default function Form() {
  const gen = useSelector((state) => state.genre);
  const dispatch = useDispatch();
 
  const [errorBtn, setErrorBtn] = useState(true);
  const[currentPage, setCurrentPage] = useState(1);
  const [game, setGame] = useState({
    id:"",
    description: "",
    rating: "",
    released: "",
    platforms: [],
    background_image: "",
    name: "",
    genre: [],
  });
 

  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);
  function handleGenre(e) {
    e.preventDefault();
    dispatch(getGenre());
    
  }

  // function handleSubmit(e) {}
 
  // function validar(e) {}
  // useEffect(() => {}, []);
  return (

    <div>
      <Link to= "/home">Volver</Link>
      <form >
  {/* <form onSubmit={handleSubmit}> */}
        <div>
          <div>
            <label>Name</label>
            <input
              name="name"
              value={game.name}
              // onChange={handleChange}              
            ></input>
          </div>
          <div>
            <label>Description</label>
            <input
              name="description"
              value={game.description}
              // onChange={handleChange}
             
            ></input>
          </div>
          <div>
            <label>Rating</label>
            <input></input>
          </div>
          <div></div>
          <div>
            <label>Released</label>
            <input
              name="released"
              value={game.released}
              // onChange={handleChange}
            ></input>
          </div>
          <div>
            <label>Platform</label>

            <input></input>
          </div>
          <div>
            <label>background_image</label>
            <input
              name="background_image"
              value={game.background_image}
              // onChange={handleChange}
            ></input>
          </div>
          <div>
            <label>Genres</label>
            {/* <select> */}
            <select onChange={(e) => handleGenre(e)}>
            <option value="all">Generos</option>
              {gen &&
                gen.map((e) => (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}
