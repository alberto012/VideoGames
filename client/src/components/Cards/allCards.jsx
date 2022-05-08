import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import img from "../Cards/meme.png"
import s from "./Allcard.module.css"
import { NavLink } from "react-router-dom";
import Card from "./Card";
import { getVideoGames } from "../Actions/actions";

export default function AllCard() {
  
  //pidiendo a redux el estado de los videojuegos
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
    <>
      <div className={s.allcard}>
        {eGames?.map((e) => {
          return (
            <div key={e.id}>
              <NavLink
                style={{ textDecoration: "none" }}
                to={`/details/${e.id}`}
                key={e.id}
              >
                <div>
                  <Card
                  name={e.name}
                  background_image={e.background_image}
                  description={e.description}
                  genres={e.genres?.map((e) => e.name + " ")}
            released={e.released}
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
