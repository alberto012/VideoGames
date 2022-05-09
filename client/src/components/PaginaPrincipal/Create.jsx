import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {getVideoGames, createGame, getGenre, reset } from "../Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import s from "./Create.module.css"
function validar(estado){
  let error={};
  if (!estado.name){
    error.name=" No te olvides del nombre "}
      if(!error.background_image){
      error.background_image= "mmm... y la imagen?"
    }  if(!error.description){
      error.description="te falto algo aca!"
    }  if(!error.genres){
      error.description="wey ya, te olvidas el genero"
    }  if(!error.platforms){
      error.description="anda, elige uno"
    }  if(!error.released){
      error.description="se que puedes leerme muchachx, llena el cuadro"
    }  if(!error.rating){
      error.description="bueno bueno, elige un numero valido"
    
  }  if (error.rating<0|| error.rating>6){
    error.description="emmm nop, del 1 al 6"
  }else{
    error.submit= "ok"
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
 
  function handleChange(e) {
    if(e.target.name==="rating"){
      setEstado({
        ...estado,
        [e.target.name]: Number(e.target.value),
      });
      SetErr(validar({
        ...estado,
        [e.target.name]: Number(e.target.value)
      }))
    }
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
   
    <div className={s.Cont}>
     
     
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={s.general}>
        <div className={s.form}>
          <label>Nombre: </label>
          <input
            type="text"
            value={estado.name}
            name="name"
            className={s.body}
            onChange={(e) => handleChange(e)}
          
          />
          {
            err.name &&(
              <p>{err.name}</p>
            )
          }
        </div>
        <div className={s.form}>
          <label>Fecha de Lanzamiento: </label>
          <input
            type="date"
            value={estado.released}
            name="released"
            className={s.body}
            onChange={(e) => handleChange(e)}
            // required= "se te olvido algo"
          />
          {
            err.released &&(
              <p>{err.released}</p>
            )
          }
        </div>
        <div className={s.form}>
          <label>Imagen: </label>
          <input
            type="text"
            className={s.body}
            value={estado.background_image}
            name="background_image"
            onChange={(e) => handleChange(e)}
            // required= "se te olvido algo"
          />
          {
            err.background_image &&(
              <p>{err.background_image}</p>
            )
          }
        </div>
        <div className={s.form}>
          <label>Descripcion: </label>
          <input
            type="text"
            value={estado.description}
            name="description"
            className={s.body}
            onChange={(e) => handleChange(e)}
            required= "se te olvido algo"
          />
          {
            err.description &&(
              <p>{err.description}</p>
            )
          }
        </div>
        <div className={s.form}>
          <label>Rating: </label>
          <input
            type="number"
            value={estado.rating}
            name="rating"
            className={s.body}
            onChange={(e) => handleChange(e)}
            // required= "se te olvido algo"
          />
          {
            err.rating &&(
              <p>{err.rating}</p>
            )
          }
        </div>
        <div className={s.form}>
        <label >Generos: </label>
        <select className={s.body} onChange={(e) => handleSelect(e)}>
          {generos.map((gen) => (
            <option value={gen.name}>{gen.name}</option>
          ))}
          {
            err.genres &&(
              <p>{err.genres}</p>
            )
          }
        </select>
        </div>
        <div className={s.form}>
        <label>Generos Seleccionados: </label>
        <ul className={s.body}>{estado.genres.map((e) => e + " ,")}</ul>
        </div>
        <div className={s.form}>
          <label>Plataformas: </label>
          <select className={s.body} onChange={(e) => handlePlatForms(e)}>
            {newData?.map((e) => (
              <option className={s.body} value={e}>{e}</option>
            ))}
            {
            err.platforms &&(
              <p>{err.platforms}</p>
            )
          }
          </select>
        </div>
        <div className={s.form}>
        <ul className={s.body}>
          Plataformas Seleccionadas: {estado.platforms.map((e) => e + " ,")}
        </ul>
        </div >
        <div className={s.dis}>

        <button className={s.buttons}onClick={(e)=>handleSubmit(e)}>Crealo!</button>
      <Link to="/home">
        <button className={s.buttons}>Volver</button>
      </Link>
      </div>
        </div>
      </form>
      </div>
    
  );
}
