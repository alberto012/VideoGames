import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideoGames } from "../Actions/actions";
import s from "./Card.module.css";
import img from "./meme.png"
export default function Card({
  description,
  released,
  rating,
  id,
  name,
  background_image,
  genres,
}) {
  
  const eGames = useSelector((state) => state.videogame);
  let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
  var urlExp = new RegExp(expression);
  let image = urlExp.test(eGames.background_image) === false || eGames.background_image === "" ? img : eGames.background_image;
  const dispatch = useDispatch();
  //UTILIZO EL DISPATCH PARA HACER EL PEDIDO A LA API
  useEffect(() => {
    dispatch(getVideoGames());
    /////SI HAY CAMBIOS EN EL DISPACH VUELVE A RENDERIZAR LA PAGINA
  }, [dispatch]);

  return (
    <div className={s.prim} key={id}>
      <div>
        <ul>
          <h1>{name}</h1>
          <img src={background_image?background_image:image}alt= "holis" height="200px" width="250px" />
          <p>{description}</p>
          <p>{genres?.map((e) => e.name + " ")}</p>
          <h1>{released}</h1>
          <h1>{rating}</h1>
        </ul>
      </div>
    </div>
  );
}
