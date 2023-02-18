import React from 'react';

export default function Scoreboard(props) {
    return (
        <div className="score">
            <h4> Current Score: {props.currentScore} </h4>
            <h4> Best Score: {props.bestScore} </h4>
            
        </div> 
    )
}