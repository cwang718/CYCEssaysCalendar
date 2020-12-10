import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EventsPage from "./pages/EventsPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path="/eventdetails">
            <EventsPage />
          </Route>

          <Route exact path="/addevent">

          </Route>

          <Route exact path="/">
            <LoginPage />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
