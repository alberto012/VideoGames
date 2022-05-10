import React from "react";
import img from "../PaginaPrincipal/tumblr_naxk2obyGN1t3m3ico1_500.gif"
// import { getVideoGames } from "../Actions/actions";
import s from "./Card.module.css";
// import img from "./meme.png"
export default function Card({
  
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
  
  //UTILIZO EL DISPATCH PARA HACER EL PEDIDO A LA API
 

  return (
    <div className={s.prim} key={id}>
      <div className={s.card}>
        
          <h1>{name}</h1>
          <img className={s.imagen}src={expression.test(background_image)?background_image:img}alt= "holis" height="200" width="250px" />
          <p>{description}</p>
          <p>{genres?.map((e) => e.name + " ")}</p>
          <h1>{released}</h1>
          <h1>{rating}</h1>
          <p>{platforms?.map((e)=>e.platform + " ")}</p>
        
      </div>
      
    </div>
  );
}
