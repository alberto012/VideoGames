import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Landing.module.css";
export default function Landing() {
  return (
    <div className={s.land}>
      <h1 className={s.h1}>
        <span>W e l c o m e</span>
        
        <br />
        <span>t o</span>
        
        <br />
        <span>G a m e </span>
         
       
        <span> S t o r e</span>
      
      </h1>
      <div>
        <br />
        <NavLink to="/home">
          <button className={s.buttons}>
            <div>Ingresar</div>
          
          </button>
        </NavLink>
      </div>
    </div>
  );
}
