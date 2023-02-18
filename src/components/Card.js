import React from 'react';
import uniqid from 'uniqid';


export default function Card(props) {
    return (
        <div className="card" onClick={props.chooseCard} key={props.id} id={props.id}>
             <img src={props.image}></img> 
             <p> {props.name} </p>
        </div> 
    )
}