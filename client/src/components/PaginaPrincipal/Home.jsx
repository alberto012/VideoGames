import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterByGenre, getGenre } from "../../actions/actions";
import getVideogames from '../../actions/actions'
// import Card from "../components/Card";
import AllCard from "../Cards/allCards";

export default function Home() {
  const dispatch = useDispatch();
  const gen=useSelector((state)=>state.genres)
  const [game, setGame]= useState({
    description: "",
    rating: "",
    released: "",
    platforms: "",
    background_image: "",
    name: "",
    genres: [],
  });
  
  // USEEFFECT
  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);

  //////// paginado
  const [currentPage, setCurrentPage] = useState(1);

  //////// FUNCIONES
  // funciones que me filtren el por genero
  function filtrosGen(e) {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
  }
  
  function handleGenres(e) {
    e.preventDefault();
    dispatch(getGenre());
    setCurrentPage(1);
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
    setCurrentPage(1);
  }

  return (
    <div>
      <h1>Home</h1>
      

      <div>
        {/* boton para volver al home */}
        <Link to="/form">Crear Juego</Link>
        {/* boton para volver al home */}
        <h1>Videogames</h1>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Volver a cargar
        </button>
        {/* Terminado Boton recargar Home */}
        {/* traer info a la home */}
        <div>
          <select>
            <option value="all">todos</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
          <select>
            <option value="all">Videojuegos</option>
            <option value="asc">Existentes</option>
            <option value="desc">creados</option>
          </select>
          <select onChange={filtrosGen}>
          <option value="all">Generos</option>
              {gen &&
                gen.map((e) => (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                ))}
            </select>
          
        </div>
        
        {/* fin de funcion que trae info a la home */}
      </div>
      <AllCard />
    </div>
  );
}
