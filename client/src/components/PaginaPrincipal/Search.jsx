import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../Actions/actions";
import s from "./Search.module.css"

export default function Searchbar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  function handlebutton(e) {
    e.preventDefault();
    if (!search) {
      return alert("Colocar una busqueda");
    }
    else {
      dispatch(getName(search));
      setSearch("");
      document.getElementById.value = "";
    }
    dispatch(getName(search));
    
  }
  return (
    <div>
     
      
      <input
      className={s.control}
        value={search}
        onChange={(e) => handleChange(e)}
        type="text"
        placeholder="Buscar"
      />
      <button className={s.boton}type="submit" onClick={(e) => handlebutton(e)}>
        Buscar
      </button>
    </div>
  );
}
