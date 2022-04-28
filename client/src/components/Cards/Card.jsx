import React from "react";
export default function Card({id,name, background_image,genres}){
  return (
    <div key={id}>
     <div>
       <h1>{name}</h1>
       <h3>{genres } </h3>
       <img src={background_image} alt="flag"/>
     </div>
    </div> )
}
