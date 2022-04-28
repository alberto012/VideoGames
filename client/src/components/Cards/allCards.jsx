import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import { NavLink } from "react-router-dom";
import getVideogames from "../../actions/actions";
export default function AllCard() {
  //pidiendo a redux el estado de los videojuegos
  const eGames = useSelector((state) => state.videogame)

  const dispatch = useDispatch();
//UTILIZO EL DISPATCH PARA HACER EL PEDIDO A LA API
  useEffect(() => {
    dispatch(getVideogames());
    /////SI HAY CAMBIOS EN EL DISPACH VUELVE A RENDERIZAR LA PAGINA
  }, [dispatch]);


  return (
    <>
      <div >
        
          {
        eGames?.map((e) => {
          return (
      
            <div key={e.id}>
            {/* <NavLink to={`/videogame/${e.id}`} key={e.id}> */}
              <Card
              
                name={e.name}
                genres={e.genres}
                background_image={e.background_image}
                
              />
              {/* </NavLink>  */}
            </div>
          );
        })}
         
          <p>Cargando...</p>
        
      </div>
    </>
  );
}
