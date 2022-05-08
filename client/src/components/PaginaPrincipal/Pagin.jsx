import React from "react";
// import s from './paginado.module.css'
export default function Paginado({ gamesPerPage, allGames, pagin }) {
  const pageNumber = [];
  for (let i = 0; i <= Math.ceil(allGames / gamesPerPage) - 1; i++) {
    pageNumber.push(i+1);
  }

  
  return (
    <nav>
      <div>
      <ul className= 'paginado'>
      
         
        
        {pageNumber && 
        pageNumber.map(number => (
           <button key={number}>

             <a href={number} onClick={() => pagin(number)}>{number}</a>
       
           </button>
          ))}
          
      </ul>
      </div>
      </nav>
  );
}