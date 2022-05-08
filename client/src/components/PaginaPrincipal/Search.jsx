import React from "react"
import { useState } from "react";
import {useDispatch} from "react-redux";
import { getName } from "../Actions/actions";
 export default function Searchbar(){
     const dispatch = useDispatch();
     const [search, setSearch]=useState(' ');

     function handleChange(e){
         e.preventDefault();
         setSearch(e.target.value);

     }
     function handlebutton(e){
        e.preventDefault();
        dispatch(getName(search));

    }
 return (
    <div>
        <input
        onChange={(e)=>handleChange(e)}
        type="text"
        placeholder="Buscar"
        />
        <button 
        type= "submit"
        onClick={(e)=>handlebutton(e)}>Buscar</button>
    </div>
 )
 }