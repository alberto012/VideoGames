import React from 'react'
import { NavLink } from 'react-router-dom';

import s from "./Nav.module.css"
function NavBar() {
  return (
      <div className={s.nav}>
    <NavLink to="/"><button className={s.btn}>Inicio </button></NavLink>
     
      </div>
  )
}

export default NavBar