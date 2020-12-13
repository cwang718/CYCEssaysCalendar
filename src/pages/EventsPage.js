import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { fireDb } from "../Firebase/config";
import '../App.css';

export default function EventsPage() {
    let events = [];
    fireDb
      .ref("/events")
      .on("value", (snapshot) => {
          snapshot.forEach((snap) => {
              events.push(snap.val());
          });
      });

    return (
        <div className="login">
            <Header></Header>
            <div className="pageTitle">Event Details</div>
            <div className="eventsCon">
                {events.map(event => (
                    <div className="eventCard" 
                         key={event.startMonth + event.startDay + event.startYear + event.startHour + event.startMin + event.endMonth + event.endDay + event.endYear + event.endHour + event.endMin}
                         style={{backgroundColor: `#${event.color}`}}>
                        <div className="eventTitle">{event.name}</div>
                        <div className="eventTime">Start time: {event.startMonth + 1}/{event.startDay}/{event.startYear} at {event.startHour}{event.startMin}</div>
                        <div className="eventTime">End time: {event.endMonth + 1}/{event.endDay}/{event.endYear} at {event.endHour}{event.endMin}</div>
                        <div className="eventDesc">Description: {event.desc}</div>
                    </div>
                ))}
            </div>
            <div className="eventsButtonCon">
                <Link to="addevent">
                    <button className="loginButton">Add Event</button>
                </Link>
            </div>
        </div>
    )
}
