import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import '../App.css';

export default function EventsPage() {
    const [code, setCode] = useState("");

    return (
        <div className="login">
            <Header></Header>
            <img className="logo" src="tws.png" alt="logo"/>
            <div className="title">The Write Story</div>
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
