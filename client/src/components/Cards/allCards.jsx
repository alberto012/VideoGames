import React from "react";
import { useSelector} from "react-redux";
import s from "./Allcard.module.css"
import { NavLink } from "react-router-dom";
import Card from "./Card";

export default function AllCard({currentGame}) {
  const eGames = useSelector((state) => state.videogame);
  let expression = 	
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  var image = expression.test(eGames.background_image) === false || eGames.background_image === "" ? "https://38.media.tumblr.com/87557f6cfdb8997d55435b26f6d16a5c/tumblr_naxk2obyGN1t3m3ico1_500.gif" : eGames.background_image;

  return (
    <>
      <div className={s.allcard}>
        {currentGame?.map((e) => {
          return (
            <div key={e.id}>
              <NavLink
                style={{ textDecoration: "none" }}
                to={`/details/${e.id}`}
                key={e.id}
              >
                <div>
                  <Card
                  currentGame={currentGame}
                  name={e.name}
                  background_image={e.background_image?e.background_image:image}
                 
                  genres={e.genres}
            
                 rating= {e.rating}
                 
                  />
                </div>
              </NavLink>
            </div>
          );
        })}

        <p>Cargando...</p>
      </div>
    </>
  );
}
