import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

export default function Header() {
    return (
        <Link to="/eventdetails" style={{ textDecoration: 'none', color: '#21243b' }}>
            <div className="header cormorant">
                <nav class="navbar navbar-light">
                <a class="navbar-brand" href="">
                    <img  className="headerLogo d-inline-block" src="tws.png" alt="headerLogo" />
                    <span className="text-white">The Write Calendar </span>
                </a>
            </nav>
            </div>
           
        </Link>
    )
}
