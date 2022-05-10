import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  filterByGenre,
  filterByRating,
  getCreated,
  getGenre,
  getVideoGames,
  orderAZ,
} from "../Actions/actions";
import AllCard from "../Cards/allCards";
import s from "./Home.module.css";
import Paginado from "./Paginado";
import NavBar from "./NavBar";
import Searchbar from "./Search";

export default function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.videogame);
  // es lo mismo que hacer el map state to props aqui lo que hacemos
  const gen = useSelector((state) => state.genres);
  const [maymen, setMaymen] = useState("");

  //////// paginado
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gamePerPage, setGamePerPage] = useState(15);
  const indexLG = currentPage * gamePerPage; //15 juegos
  const indexFG = indexLG - gamePerPage; //trae al minimo
  const currentGame = allGames.slice(indexFG, indexLG);
  const pagination = (number) => {
    setCurrentPage(number);
  };

  //es guardar en la constante allgames todos los stados que hay dentro del array videogames
  //---Paginado---

  // USEEFFECT

  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVideoGames());
  }, [dispatch]); // en los corchetes son excepcione que colocamos, ej para que funcione el dispatch tiene que haber el componente ej x

  // funciones que me filtren el por genero
  function filtrosGen(e) {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
  }

  function filtroRating(e) {
    e.preventDefault();
    dispatch(filterByRating(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
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
    <div className={s.homes}>
      {/* <NavBar/> */}
      <NavLink to="/">
        {" "}
        <h1 className={s.home}>Welcome to Videogames PI</h1>
      </NavLink>
      {/* <h1 className={s.home}>Welcome to Videogames PI</h1> */}

      <div>
        <div>
          <Searchbar />
        </div>
        <div className={s.barra}>
          {/* //////// searchBar */}

          {/* boton para crear */}

          <button
            className={s.button}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Volver a cargar
          </button>
          <br />
          <div>
            <NavLink to="/created">
              <button className={s.button}>Crear Juego</button>
            </NavLink>
          </div>
        </div>
        <div>
          <select className={s.filtros} onChange={(e) => handleOrder(e)}>
            <option value="all">todos</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
          <select className={s.filtros} onChange={(e) => handleCreated(e)}>
            <option value="all">Videojuegos</option>
            <option value="api">Existentes</option>
            <option value="created">creados</option>
          </select>
          <select className={s.filtros} onChange={(e) => filtroRating(e)}>
            <option value="all">Ratings</option>
            <option value="asc">Mejor Valorados</option>
            <option value="desc">Menos Valorados</option>
          </select>
          <select className={s.filtros} onChange={(e) => filtrosGen(e)}>
            <option value="all">Generos</option>
            {gen &&
              gen.map((e) => (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              ))}
          </select>
          <div className={s.paginado}>
            <Paginado
              gamePerPage={gamePerPage}
              allGames={allGames.length}
              pagination={pagination}
            />
          </div>
        </div>

        {/* fin de funcion que trae info a la home */}
      </div>

      <div className={s.contenedor}>
        {allGames === "AxiosError" ? (
          <p>No se encuentra</p>
        ) : (
          <AllCard currentGame={currentGame} />
        )}
      </div>
    </div>
  );
}
