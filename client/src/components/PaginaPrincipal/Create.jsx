import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {getVideoGames, createGame, getGenre, reset } from "../Actions/actions";
import { useDispatch, useSelector } from "react-redux";

function validar(estado){
  let error={};
  if (!estado.name){
    error.name=" No te olvides del nombre "}
    else if(!error.background_image){
      error.background_image= "mmm... y la imagen?"
    }else if(!error.description){
      error.description="te falto algo aca!"
    }else if(!error.genres){
      error.description="wey ya, te olvidas el genero"
    }else if(!error.platforms){
      error.description="anda, elige uno"
    }else if(!error.released){
      error.description="se que puedes leerme muchachx, llena el cuadro"
    }else if(!error.rating){
      error.description="bueno bueno, elige un numero valido"
    
  }else if (error.rating<0|| error.rating>6){
    error.description="emmm nop, del 1 al 6"
  }
  return error
}


export default function Create() {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const plataformas = useSelector((state) => state.videogame);
  const generos = useSelector((state) => state.genres);
  const setArr = [];
  
  plataformas.map((e) => e.platforms?.map((e) => setArr.push(e)));
  let newData = [...new Set(setArr)];
  console.log(newData);
  const [estado, setEstado] = useState({
    name: "",
    background_image: "",
    description: "",
    released: "",
    platforms: [],
    genres: [],
    rating: "",
  });
  const [err,SetErr]= useState({});

  ///eventos
  function handleRESET(e) {
    e.preventDefault();
    dispatch(reset({}));
    navigate("/home");
  }
  function handleChange(e) {
    setEstado({
      ...estado,
      [e.target.name]: e.target.value,
    });
    SetErr(validar({
      ...estado,
      [e.target.name]: e.target.value
    }))
  }
  function handleSelect(e) {
    setEstado({
      ...estado,
      genres: [...estado.genres, e.target.value],
    });
  }
  function handlePlatForms(e) {
    setEstado({
      ...estado,
      platforms: [...estado.platforms, e.target.value],
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createGame(estado));
    alert("Juego Añadido");
    setEstado({
      name: "",
      background_image: "",
      description: "",
      released: "",
      platforms: [],
      genres: [],
      rating: "",
    });
  }
  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getVideoGames());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre: </label>
          <input
            type="text"
            value={estado.name}
            name="name"
            onChange={(e) => handleChange(e)}
          
          />
          {
            err.name &&(
              <p>{err.name}</p>
            )
          }
        </div>
        <div>
          <label>Fecha de Lanzamiento: </label>
          <input
            type="date"
            value={estado.released}
            name="released"
            onChange={(e) => handleChange(e)}
            required= "se te olvido algo"
          />
          {
            err.released &&(
              <p>{err.released}</p>
            )
          }
        </div>
        <div>
          <label>Imagen: </label>
          <input
            type="text"
            value={estado.background_image}
            name="background_image"
            onChange={(e) => handleChange(e)}
            required= "se te olvido algo"
          />
          {
            err.background_image &&(
              <p>{err.background_image}</p>
            )
          }
        </div>
        <div>
          <label>Descripcion: </label>
          <input
            type="text"
            value={estado.description}
            name="description"
            onChange={(e) => handleChange(e)}
            required= "se te olvido algo"
          />
          {
            err.description &&(
              <p>{err.description}</p>
            )
          }
        </div>
        <div>
          <label>Rating: </label>
          <input
            type="text"
            value={estado.rating}
            name="rating"
            onChange={(e) => handleChange(e)}
            required= "se te olvido algo"
          />
          {
            err.rating &&(
              <p>{err.rating}</p>
            )
          }
        </div>
        <label>Generos: </label>
        <select onChange={(e) => handleSelect(e)}>
          {generos.map((gen) => (
            <option value={gen.name}>{gen.name}</option>
          ))}
          {
            err.genres &&(
              <p>{err.genres}</p>
            )
          }
        </select>
        <ul>Generos Seleccionados: {estado.genres.map((e) => e + " ,")}</ul>
        <div>
          <label>Plataformas: </label>
          <select onChange={(e) => handlePlatForms(e)}>
            {newData?.map((e) => (
              <option value={e}>{e}</option>
            ))}
            {
            err.platforms &&(
              <p>{err.platforms}</p>
            )
          }
          </select>
        </div>
        <ul>
          Plataformas Seleccionadas: {estado.platforms.map((e) => e + " ,")}
        </ul>
        <button onClick={(e)=>handleRESET(e)}>Crealo!</button>
      </form>
    </div>
  );
}
