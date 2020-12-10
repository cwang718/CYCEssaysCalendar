import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';

export default function LoginPage() {
    const [code, setCode] = useState("");

    return (
        <div className="login">
           <img className="logo" src="tws.png" alt="logo"/>
           <div className="title">The Write Calendar</div>
           <div className="subtitle">Create your calendar events</div>
           <div>
                <input
                    className="code"
                    name="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter code"
                    required
                ></input>
            </div>
            <div className="loginButtonCon">
                <Link to="eventdetails">
                    <button className="loginButton">Login</button>
                </Link>
            </div>
        </div>
    )
}
