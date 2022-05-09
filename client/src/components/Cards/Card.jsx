import React from "react";

// import { getVideoGames } from "../Actions/actions";
import s from "./Card.module.css";
// import img from "./meme.png"
export default function Card({
  currentGame,
  description,
  released,
  rating,
  id,
  name,
  background_image,
  genres,
  platforms
}) {
  

  let expression = 	
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w  .-]*)*\/?$/;
  
  var image = expression.test(currentGame.background_image) === false || currentGame.background_image === "" ? "https://38.media.tumblr.com/87557f6cfdb8997d55435b26f6d16a5c/tumblr_naxk2obyGN1t3m3ico1_500.gif" : currentGame.background_image;

  //UTILIZO EL DISPATCH PARA HACER EL PEDIDO A LA API
 

  return (
    <div className={s.prim} key={id}>
      <div className={s.card}>
        <ul>
          <h1>{name}</h1>
          <img className={s.imagen}src={!background_image?image:background_image}alt= "holis" height="200" width="250px" />
          <p>{description}</p>
          <p>{genres?.map((e) => e.name + " ")}</p>
          <h1>{released}</h1>
          <h1>{rating}</h1>
          <p>{platforms?.map((e)=>e.platform + " ")}</p>
        </ul>
      </div>
    </div>
  );
}
