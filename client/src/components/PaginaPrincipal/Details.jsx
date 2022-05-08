import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {getVideoGames, cardDetails, reset } from "../Actions/actions";
import img from "../Cards/meme.png";
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
    dispatch(getVideoGames());
  }, [dispatch]);
  useEffect(() => {
    dispatch(cardDetails(id));
  }, [dispatch, id]);
  const videogames = useSelector((state) => state.detail);
  console.log("videogames", videogames);
  return (
    <div className={s.primero}>
      {videogames.name ? (
        <div>
          <h1>
            Nombre:
            {!videogames.createdVideoGame
              ? " " + videogames.name
              : " " + videogames.name}
          </h1>
          <h3>
            Generos:
            {!videogames.createdVideoGame
              ? videogames.genres.map((e) => " " + e.name + " ") + " "
              : videogames.genres.map((e) => " " + e.name + " ")}
          </h3>
          <h3>
            Fecha de Lanzamiento:
            {!videogames.createdVideoGame
              ? " " + videogames.released
              : " " + videogames.released}
          </h3>
          <h3>
            Descripcion:
            {!videogames.createdVideoGame
              ? " " + videogames.description
              : " " + videogames.description}
          </h3>

          <h3>
            Plataformas:
            {videogames.platforms?.map((e) =>" " + e.platform.name + " " )}
          </h3>
          <h3>Rating: {videogames.rating}</h3>

          <img
            src={
              videogames.createdVideoGame
                ? videogames.background_image
                : videogames.image
            }
            alt="pic"
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <button onClick={(e) => handleRESET(e)}>Back</button>
    </div>
  );
}
