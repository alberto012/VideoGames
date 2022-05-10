import React from "react";
import s from './Paginado.module.css'
export default function Paginado({ gamePerPage, allGames, pagination }) {
  const pageNumber = [];
  for (let i = 0; i < Math.ceil(allGames / gamePerPage); i++) {
    pageNumber.push(i+1);
  }

  
  return (
    <nav>
      <div>
      <ul className={s.paginado}>
      
         
        
        {pageNumber && 
        pageNumber.map(number => (
           <button className={s.boton} key={number} onClick={() => pagination(number)}>

             {number}
       
           </button>
          ))}
          
      </ul>
      </div>
      </nav>
  );
}