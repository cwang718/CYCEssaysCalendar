import React from "react";
import '../App.css';

export default function Header() {
    return (
        <div className="header">
            <img className="headerLogo" src="tws.png" alt="headerLogo"/>
            <span className="headerText">The Write Calendar</span>
        </div>
    )
}
