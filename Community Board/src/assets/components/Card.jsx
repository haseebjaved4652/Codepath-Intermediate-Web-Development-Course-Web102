import React from "react";
import '../../index.css';



const Card = (props) => {
    return (
        <div className={'Card '}>
            <img src={props.imageUrl} alt={`Cover of ${props.HackathonName}`} className="Card-image" />
            <h5>{props.HackathonName}</h5>
            <h6>{props.Dates}</h6>
            <a href={props.HackathonUrl} target="_blank" rel="noopener noreferrer">
                <button>Register for Hackathon</button>
            </a>
        </div>
    )
}


export default Card;
