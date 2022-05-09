import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cardDetails, reset } from "../Actions/actions";
import s from "./Detail.module.css";

export default function Details(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  function handleRESET(e) {
    e.preventDefault();
    dispatch(reset({}));
    navigate("/home");
  }

  useEffect(() => {
    dispatch(cardDetails(id));
  }, [dispatch, id]);
  const videogames = useSelector((state) => state.detail);
  console.log(videogames);
  return (
    <div className={s.primero}>
      <div className={s.caja}>
      {videogames.name ? (
        <div className={s.primer}>
          <div className={s.boxOne}>

          Nombre:
          <h1>
            {!videogames.createdVideoGame ? videogames.name : videogames.name}
          </h1>
          </div>
          <div className={s.boxtwo}>

          <img
            src={
              videogames.createdVideoGame
                ? videogames.background_image
                : videogames.image
            }
            className={s.imagen}
            alt="pic"
          />
          </div>
          
          <div className={s.boxThree}>
            
            Generos:
            <h3>
              {!videogames.createdVideoGame
                ? videogames.genres.map((e) => " " + e.name + " ") + " "
                : videogames.genres.map((e) => " " + e.name + " ")}
            </h3>
          </div>
          <div>
            Descripcion:{" "}
          <h2 className={s.boxFinal}>
            {!videogames.createdVideoGame
              ? " " + videogames.description
              : " " + videogames.description}
          </h2>
            </div>
<div className={s.boxFinal}>
          <div>
          Fecha de Lanzamiento:
          <h3  className={s.h3}>
            {!videogames.createdVideoGame
              ? " " + videogames.released
              : " " + videogames.released}
          </h3>
          </div>
         
            <div>
              Plataformas:{" "}
          <h3 className={s.h3}>
            {!videogames.createdVideoGame
              ? videogames.platforms.map((e) => " " + e.platform.name + " ")
              : videogames.platforms.map((e) => " " + e + " ")}
          </h3>
              </div>
              <div>
              Rating:<h3 className={s.h3}> {videogames.rating}</h3>

              </div>
        </div>
      
<div className={s.button}>

      <button className= {s.back} onClick={(e) => handleRESET(e)}>Back</button>
</div>
        </div>
      ) : (
        videogames.name
      )}
      </div>
    </div>
  );
}
