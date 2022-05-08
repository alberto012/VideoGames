import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterByGenre, filterByRating, getCreated, getGenre, getRating, getVideoGames, orderAZ }  from "../Actions/actions";

// import Card from "../components/Card";
import AllCard from "../Cards/allCards";
import Searchbar from "./Search";
import s from "./Home.module.css";
import Paginado from "./Pagin";

export default function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.videogame); // es lo mismo que hacer el map state to props aqui lo que hacemos
  const gen=useSelector((state)=>state.genres)
  const [maymen,setMaymen]= useState(" ")
  
  
  //////// paginado
  
  //es guardar en la constante allgames todos los stados que hay dentro del array videogames
  //---Paginado---
  const [order,setOrder]= useState(" ")
   const [currentPage, setCurrentPage] = useState(1);
  
  // USEEFFECT
  useEffect(() => {
    dispatch(getVideoGames());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getRating());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);
  

// const pagin = (pages) => {
//   setCurrentPage(pages);
// };
useEffect(() => {
  // esto reemplaza todo lo que hace el mapdispatch y mapstate
  dispatch(getVideoGames());
}, [dispatch]); // en los corchetes son excepcione que colocamos, ej para que funcione el dispatch tiene que haber el componente ej x


  // funciones que me filtren el por genero
  function filtrosGen(e) {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
  }
  

  function filtroRating(e){
    e.preventDefault()
    dispatch(filterByRating(e.target.value))
    setCurrentPage(1);
    setOrder(e.target.value)
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideoGames());
    setCurrentPage(1);
  }
  function handleCreated(e) {
    e.preventDefault();
    dispatch(getCreated(e.target.value));
    setCurrentPage(1);
    setMaymen(e.target.value);
  
  }
  function handleOrder(e) {
    e.preventDefault();
    dispatch(orderAZ(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }
  return (
    <div>
      <h1>Welcome to Videogames PI</h1>
      

      <div>
            {/* //////////// SearchBar */}
            <div>
          
          <Searchbar/>
            </div>
            {/* //////// searchBar */}
        <h1>Videogames</h1>
        {/* boton para crear */}
        
        <button
        className={s.button}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Volver a cargar
        </button>
        <br/>
        {/* Terminado Boton recargar Home */}
        <Link to="/created">Crear Juego</Link>
        {/* boton para crear */}
        {/* traer info a la home */}
        <div>
          <select  className={s.filtros} onChange={e=> handleOrder(e)}>
            <option value="all">todos</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
          <select  className={s.filtros} onChange={e=>handleCreated(e)}>
            <option value="all">Videojuegos</option>
            <option value="api">Existentes</option>
            <option value="created">creados</option>
          </select>
        <select  className={s.filtros} onChange={e=> filtroRating(e)}>
            <option value="all">Ratings</option>
            <option value="asc">Mejor Valorados</option>
            <option value="desc">Menos Valorados</option>
          </select>
          <select  className={s.filtros} onChange={e=>filtrosGen(e)}>
          <option value="all">Generos</option>
              {gen &&
                gen.map((e) => (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                ))}
            </select>
          
        </div>
        <Paginado
     
        />
        {/* fin de funcion que trae info a la home */}
      </div>
     
      <div className={s.contenedor}>

      <AllCard/>
      </div>
    </div>
  );
}
