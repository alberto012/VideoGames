
import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Landing.module.css"
export default function Landing() {
  return (
    <div>
        <div>
        
        <h1 className={s.frase}>Bienvenidos</h1>
        </div>
      <NavLink to="/home">
        <button className={s.boton} >Ingresar</button>
      </NavLink>
    </div>
  );
}