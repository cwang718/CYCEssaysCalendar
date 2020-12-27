import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../components/Header";
import { fireDb } from "../Firebase/config";
import '../App.css';

export default function EventsPage() {
    const history = useHistory();
    const [deleted, setDeleted] = useState(false);
    const [events, setEvents] = useState([]);

    let temp = [];

    useEffect(() => {
        try{
            fireDb
                .ref("/events")
                .on("value", (snapshot) => {
                    snapshot.forEach((snap) => {
                        temp.push(snap.val());
                    });
                });
            setEvents(temp);
        } catch (err) {console.log("Failed to retrieve events: " + err)}
    }, [deleted]);
    

    function hexc(colorval) {
        let parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        delete(parts[0]);
        for (var i = 1; i <= 3; ++i) {
          parts[i] = parseInt(parts[i]).toString(16);
          if (parts[i].length === 1) parts[i] = '0' + parts[i];
        }
        let color = parts.join('');
        return color;
    }

    const editHandler = (e) => {
        let parent = e.target.parentElement.parentElement.children;

        let name = parent[0].innerHTML;

        let startMonth = parseInt(parent[1].children[1].childNodes[0].data) - 1;
        let startDay = parseInt(parent[1].children[1].childNodes[2].data);
        let startYr = parseInt(parent[1].children[1].childNodes[4].data);
        let startHr = parseInt(parent[1].children[1].childNodes[6].data);
        let startMin = parseInt(parent[1].children[1].childNodes[8].data);
        let startDon = parent[1].children[1].childNodes[10].data;

        let endMonth = parseInt(parent[2].children[1].childNodes[0].data) - 1;
        let endDay = parseInt(parent[2].children[1].childNodes[2].data);
        let endYr = parseInt(parent[2].children[1].childNodes[4].data);
        let endHr = parseInt(parent[1].children[1].childNodes[6].data);
        let endMin = parseInt(parent[2].children[1].childNodes[8].data);
        let endDon = parent[2].children[1].childNodes[10].data;

        let desc = parent[3].childNodes[1].data;

        let vac = parent[5].children[0].innerHTML;

        let cardColor = hexc(e.target.parentElement.parentElement.style.backgroundColor).toUpperCase();

        let key = name + "_" + 
                startMonth + "_" + 
                startDay + "_" + 
                startYr + "_" + 
                startHr + ":" + 
                startMin + startDon + "_" +
                endMonth + "_" + 
                endDay + "_" + 
                endYr + "_" + 
                endHr + ":" + 
                endMin + endDon + "_" +
                vac + "_" + 
                cardColor + "_" + 
                desc;
        key = key.replaceAll(".", "").replaceAll("#", "").replaceAll("$", "").replaceAll("[", "").replaceAll("]", "");

        history.push("/editevent/" + key);
    }

    const deleteHandler = (e) => {
        let parent = e.target.parentElement.parentElement.children;

        let name = parent[0].innerHTML;

        let startMonth = parseInt(parent[1].children[1].childNodes[0].data) - 1;
        let startDay = parseInt(parent[1].children[1].childNodes[2].data);
        let startYr = parseInt(parent[1].children[1].childNodes[4].data);
        let startHr = parseInt(parent[1].children[1].childNodes[6].data);
        let startMin = parseInt(parent[1].children[1].childNodes[8].data);
        let startDon = parent[1].children[1].childNodes[10].data;

        let endMonth = parseInt(parent[2].children[1].childNodes[0].data) - 1;
        let endDay = parseInt(parent[2].children[1].childNodes[2].data);
        let endYr = parseInt(parent[2].children[1].childNodes[4].data);
        let endHr = parseInt(parent[1].children[1].childNodes[6].data);
        let endMin = parseInt(parent[2].children[1].childNodes[8].data);
        let endDon = parent[2].children[1].childNodes[10].data;

        let desc = parent[3].childNodes[1].data;

        let vac = parent[5].children[0].innerHTML;

        let cardColor = hexc(e.target.parentElement.parentElement.style.backgroundColor).toUpperCase();

        let key = name + "_" + 
                startMonth + "_" + 
                startDay + "_" + 
                startYr + "_" + 
                startHr + ":" + 
                startMin + startDon + "_" +
                endMonth + "_" + 
                endDay + "_" + 
                endYr + "_" + 
                endHr + ":" + 
                endMin + endDon + "_" +
                vac + "_" + 
                cardColor + "_" + 
                desc;
        key = key.replaceAll(".", "").replaceAll("#", "").replaceAll("$", "").replaceAll("[", "").replaceAll("]", "");
        
        fireDb.ref("/events/" + key).remove();
        setDeleted(!deleted);
    }

    return (
        <div className="login">
            <Header></Header>
            <div className="pageTitle">Event Details</div>
            <div className="eventsCon">
                {events.map(event => (
                    <div 
                        style={{ paddingBottom:'25px' }}
                        key={event.title + event.startMonth + event.startDay + event.startYear + event.startHour + event.startMin + event.endMonth + event.endDay + event.endYear + event.endHour + event.endMin + event.vac + event.color + event.desc}>
                        <div className="eventCard" 
                            style={{backgroundColor: `#${event.color}`, width:'60%', borderRadius: 15, marginLeft: 'auto', marginRight: 'auto', }}>
                            <div className="eventTitle">{event.name}</div>
                            <div className="eventStartTime">
                                <em>Start time:</em> <span className="eventStartDet">{parseInt(event.startMonth) + 1}/{event.startDay}/{event.startYear} at {event.startHour>12 ? event.startHour - 12 : event.startHour}:{event.startMin<10 ? ("0" + event.startMin) : event.startMin} {event.startHour>12 ? "PM" : "AM"}</span>
                            </div>
                            <div className="eventEndTime"><em>End time:</em> <span>{parseInt(event.endMonth) + 1}/{event.endDay}/{event.endYear} at {event.endHour>12 ? event.endHour - 12 : event.endHour}:{event.endMin<10 ? ("0" + event.endMin) : event.endMin}  {event.endHour>12 ? "PM" : "AM"}</span>
                            </div>
                            <div className="eventDesc"><em>Description: </em>{event.desc}</div>
                            <div className="eventPrice"><em>Price: </em>{event.price ? ("$" + event.price) : "N/A"}</div>
                            {event.vac==="FULL" ? (<div className="eventVac" style={{ padding: 10, color: '#e66060' }}><strong>{event.vac}</strong></div>) : (<div className="eventVac" style={{ padding: 10 }}><strong>{event.vac}</strong></div>)}
                            <div style={{ display: 'flex', justifyContent:'space-between' }}>
                                <button
                                    onClick={editHandler} 
                                    style={{ paddingLeft: '3%', paddingRight: '3%', paddingTop: '2%', paddingBottom: '2%', borderRadius: 30, border: 'none', backgroundColor: '#fcebb1' }}
                                    >
                                    Edit
                                </button>
                                <button 
                                    style={{ paddingLeft: '3%', paddingRight: '3%', paddingTop: '2%', paddingBottom: '2%', borderRadius: 30, border: 'none', backgroundColor: '#fcb1b1' }}
                                    onClick={deleteHandler}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="eventsButtonCon" style={{ display: 'flex', justifyContent: 'center',  }}>
                <Link to="addevent">
                    <button className="loginButton" style={{ backgroundColor: '#a3e3aa', }}>Add Event</button>
                </Link>
            </div>
        </div>
    )
}
