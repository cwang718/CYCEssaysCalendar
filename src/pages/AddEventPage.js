import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { fireDb } from "../Firebase/config";
import '../App.css';

export default function AddEventPage() {
    let curStr = new Date().toLocaleString();
    let curArr = curStr.split(",");
    let curDate = curArr[0].split("/");
    let curTime = curArr[1].replace(/\s+/g, '').split(":");
    let curDoN = curTime[2].substring(2,4);

    let years = [parseInt(curDate[2]) - 1, parseInt(curDate[2]), 
                 parseInt(curDate[2]) + 1, parseInt(curDate[2]) + 2,
                 parseInt(curDate[2]) + 3, parseInt(curDate[2]) + 4];

    const [selectedName, setSelectedName] = useState("");

    const [selectedStartMonth, setSelectedStartMonth] = useState(curDate[0]-1);
    const [selectedStartDay, setSelectedStartDay] = useState(curDate[1]);
    const [selectedStartYear, setSelectedStartYear] = useState(curDate[2]);
    const [selectedStartHour, setSelectedStartHour] = useState(curTime[0]);
    const [selectedStartMin, setSelectedStartMin] = useState(curTime[1]);
    const [selectedStartDoN, setSelectedStartDoN] = useState(curDoN);
    
    const [selectedEndMonth, setSelectedEndMonth] = useState(curDate[0]-1);
    const [selectedEndDay, setSelectedEndDay] = useState(curDate[1]);
    const [selectedEndYear, setSelectedEndYear] = useState(curDate[2]);
    const [selectedEndHour, setSelectedEndHour] = useState(curTime[0]);
    const [selectedEndMin, setSelectedEndMin] = useState(curTime[1]);
    const [selectedEndDoN, setSelectedEndDoN] = useState(curDoN);

    const [selectedDesc, setSelectedDesc] = useState("");

    const [selectedColor, setSelectedColor] = useState("5987E7");

    const handleNewEvent = (e) => {
        let startHr = selectedStartDoN==="AM" ? parseInt(selectedStartHour) : (parseInt(selectedStartHour) + 12);
        let endHr = selectedEndDoN==="AM" ? parseInt(selectedEndHour) : (parseInt(selectedEndHour) + 12);
    
        let eventNodeId = (parseInt(selectedStartMonth)+1) + "-" + selectedStartYear;
        const newReference = fireDb.ref('/events')
                                   .child(`/${eventNodeId}`)
                                   .push();
        console.log('Auto generated key: ', newReference.key);
    
        newReference
          .set({
            name: selectedName,
    
            startMonth: selectedStartMonth - 1,
            startDay: selectedStartDay,
            startYear: selectedStartYear,
            startHour: startHr,
            startMin: selectedStartMin,
      
            endMonth: selectedEndMonth - 1,
            endDay: parseInt(selectedEndDay),
            endYear: selectedEndYear,
            endHour: endHr,
            endMin: selectedEndMin,

            color: selectedColor,
    
            desc: selectedDesc,
          })
          .then(() => console.log('Event added.'));
    };

    return (
        <div className="login">
            <Header></Header>
            <div className="pageTitle">Add an Event</div>
            <div className="eventsCon">
                <div className="row">
                    <span className="label">Event title: </span>
                    <input
                        className="title"
                        name="title"
                        value={selectedName}
                        onChange={(e) => setSelectedName(e.target.value)}
                        required
                    ></input>
                </div>
                <div className="row">
                    <span className="label">Starting time: </span>
                    <form>
                        <select 
                            className="time" 
                            defaultValue={parseInt(curDate[0]) - 1}
                            onChange={(input) => setSelectedStartMonth(input.target.value)}>
                            <option value={0}>Jan</option>
                            <option value={1}>Feb</option>
                            <option value={2}>Mar</option>
                            <option value={3}>Apr</option>
                            <option value={4}>May</option>
                            <option value={5}>Jun</option>
                            <option value={6}>Jul</option>
                            <option value={7}>Aug</option>
                            <option value={8}>Sep</option>
                            <option value={9}>Oct</option>
                            <option value={10}>Nov</option>
                            <option value={11}>Dec</option>
                        </select>
                    </form>
                    <form>
                        <select className="time" defaultValue={curDate[1]} onChange={(input) => setSelectedStartDay(input.target.value)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                            <option value={12}>12</option>
                            <option value={13}>13</option>
                            <option value={14}>14</option>
                            <option value={15}>15</option>
                            <option value={16}>16</option>
                            <option value={17}>17</option>
                            <option value={18}>18</option>
                            <option value={19}>19</option>
                            <option value={20}>20</option>
                            <option value={21}>21</option>
                            <option value={22}>22</option>
                            <option value={23}>23</option>
                            <option value={24}>24</option>
                            <option value={25}>25</option>
                            <option value={26}>26</option>
                            <option value={27}>27</option>
                            <option value={28}>28</option>
                            <option value={29}>29</option>
                            <option value={30}>30</option>
                            <option value={31}>31</option>
                        </select>
                    </form>
                    <span>,</span>
                    <form>
                        <select className="time" defaultValue={parseInt(curDate[2])} onChange={(input) => setSelectedStartYear(input.target.value)}>
                        <option value={years[0]}>{years[0]}</option>
                            <option value={years[1]}>{years[1]}</option>
                            <option value={years[2]}>{years[2]}</option>
                            <option value={years[3]}>{years[3]}</option>
                            <option value={years[4]}>{years[4]}</option>
                            <option value={years[5]}>{years[5]}</option>
                        </select>
                    </form>
                    <span>,</span>
                    <form>
                    <select 
                            className="time" 
                            defaultValue={curTime[0]}
                            onChange={(input) => setSelectedStartHour(input.target.value)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                            <option value={12}>12</option>
                        </select>
                    </form>
                    <span>:</span>
                    <form>
                        <select 
                            className="time" 
                            defaultValue={curTime[1]}
                            onChange={(input) => setSelectedStartMin(input.target.value)}>
                            <option value={0}>00</option>
                            <option value={15}>15</option>
                            <option value={30}>30</option>
                            <option value={45}>45</option>
                        </select>
                    </form>
                    <form>
                        <select 
                            className="time" 
                            defaultValue={curDoN}
                            onChange={(input) => setSelectedStartDoN(input.target.value)}>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </form>
                </div>
                
                <div className="row">
                    <span className="label">Ending time: </span>
                    <form>
                        <select 
                            className="time" 
                            defaultValue={parseInt(curDate[0]) - 1}
                            onChange={(input) => setSelectedEndMonth(input.target.value)}>
                            <option value={0}>Jan</option>
                            <option value={1}>Feb</option>
                            <option value={2}>Mar</option>
                            <option value={3}>Apr</option>
                            <option value={4}>May</option>
                            <option value={5}>Jun</option>
                            <option value={6}>Jul</option>
                            <option value={7}>Aug</option>
                            <option value={8}>Sep</option>
                            <option value={9}>Oct</option>
                            <option value={10}>Nov</option>
                            <option value={11}>Dec</option>
                        </select>
                    </form>
                    <form>
                        <select className="time" defaultValue={curDate[1]} onChange={(input) => setSelectedEndDay(input.target.value)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                            <option value={12}>12</option>
                            <option value={13}>13</option>
                            <option value={14}>14</option>
                            <option value={15}>15</option>
                            <option value={16}>16</option>
                            <option value={17}>17</option>
                            <option value={18}>18</option>
                            <option value={19}>19</option>
                            <option value={20}>20</option>
                            <option value={21}>21</option>
                            <option value={22}>22</option>
                            <option value={23}>23</option>
                            <option value={24}>24</option>
                            <option value={25}>25</option>
                            <option value={26}>26</option>
                            <option value={27}>27</option>
                            <option value={28}>28</option>
                            <option value={29}>29</option>
                            <option value={30}>30</option>
                            <option value={31}>31</option>
                        </select>
                    </form>
                    <span>,</span>
                    <form>
                        <select className="time" defaultValue={parseInt(curDate[2])} onChange={(input) => setSelectedEndYear(input.target.value)}>
                            <option value={years[0]}>{years[0]}</option>
                            <option value={years[1]}>{years[1]}</option>
                            <option value={years[2]}>{years[2]}</option>
                            <option value={years[3]}>{years[3]}</option>
                            <option value={years[4]}>{years[4]}</option>
                            <option value={years[5]}>{years[5]}</option>
                        </select>
                    </form>
                    <span>,</span>
                    <form>
                        <select 
                            className="time" 
                            defaultValue={curTime[0]}
                            onChange={(input) => setSelectedEndHour(input.target.value)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                            <option value={12}>12</option>
                        </select>
                    </form>
                    <span>:</span>
                    <form>
                        <select 
                            className="time" 
                            defaultValue={curTime[1]}
                            onChange={(input) => setSelectedEndMin(input.target.value)}>
                            <option value={0}>00</option>
                            <option value={15}>15</option>
                            <option value={30}>30</option>
                            <option value={45}>45</option>
                        </select>
                    </form>
                    <form>
                        <select 
                            className="time" 
                            defaultValue={curDoN}
                            onChange={(input) => setSelectedEndDoN(input.target.value)}>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </form>
                </div>

                <div className="row">
                    <span className="label">Color: </span>
                    <form>
                        <select 
                            className="time" 
                            defaultValue="5987E7"
                            onChange={(input) => setSelectedColor(input.target.value)}>
                            <option value="5987E7">Blue (default)</option>
                            <option value="8CE5EB">Turquoise</option>
                            <option value="FFD076">Golden</option>
                            <option value="B49EDE">Lavender</option>
                            <option value="E6A8ED">Pink</option>
                        </select>
                    </form>
                </div>

                <div className="row">
                    <span className="label">Description: </span>
                    <textarea 
                        className="desc" 
                        rows="5" 
                        cols="40"
                        onChange={(input) => setSelectedDesc(input.target.value)}>
                    </textarea>
                </div>
            </div>
            <div className="loginButtonPageCon">
                <Link to="eventdetails">
                    <button className="loginButton" onClick={handleNewEvent}>Add Event</button>
                </Link>
            </div>
        </div>
    )
}
