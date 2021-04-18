import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

export default function Header() {
    return (
        <Link to="/eventdetails" style={{ textDecoration: 'none', color: '#21243b' }}>
            <div className="header">
                <img className="headerLogo" src="tws.png" alt="headerLogo"/>
                <span className="headerText">The Write Calendar</span>
            </div>
        </Link>
    )
}
