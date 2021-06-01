import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import '../App.css';

export default function LoginPage() {
    const [code, setCode] = useState("");
    const { REACT_APP_CODE } = process.env;
    const history = useHistory();

    const handleLogin = (e) => {
        if(code.localeCompare(REACT_APP_CODE)===0) {
            console.log("Successful login");
            history.push("/eventdetails");
        } else {
            alert("Incorrect code");
        }
    }

    return (
        <div className="layout">
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
                <button className="loginButton" onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}
