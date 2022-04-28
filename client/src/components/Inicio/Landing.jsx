
import React from "react";
import { NavLink } from "react-router-dom";

export default function Landing() {
  return (
    <div>
        <div>
        
        <h1>Bienvenidos</h1>
        </div>
      <NavLink to="/home">
        <button >Ingresar</button>
      </NavLink>
    </div>
  );
}