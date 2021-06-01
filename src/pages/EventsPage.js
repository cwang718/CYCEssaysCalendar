import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../components/Header";
import { Modal, Button } from "react-bootstrap";
import { fireDb } from "../Firebase/config";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EventsPage() {
    const history = useHistory();
    const [deleted, setDeleted] = useState(false);
    const [events, setEvents] = useState([]);
    const [load, setLoad] = useState(true);
    const [edit, setEdit] = useState(false);

    let curStr = new Date().toLocaleString();
    let curArr = curStr.split(",");
    let curDate = curArr[0].split("/");
    let curTime = curArr[1].replace(/\s+/g, '').split(":");
    let curDoN = curTime[2].substring(2,4);

    let years = [parseInt(curDate[2]) - 1, parseInt(curDate[2]), 
                 parseInt(curDate[2]) + 1, parseInt(curDate[2]) + 2,
                 parseInt(curDate[2]) + 3, parseInt(curDate[2]) + 4];

    const [selectedName, setSelectedName] = useState("");

    let curMonth = parseInt(curDate[0] - 1);

    const [selectedStartMonth, setSelectedStartMonth] = useState(curMonth);
    const [selectedStartDay, setSelectedStartDay] = useState(curDate[1]);
    const [selectedStartYear, setSelectedStartYear] = useState(curDate[2]);
    const [selectedStartHour, setSelectedStartHour] = useState(curTime[0]);
    const [selectedStartMin, setSelectedStartMin] = useState(curTime[1]);
    const [selectedStartDoN, setSelectedStartDoN] = useState(curDoN);
    
    const [selectedEndMonth, setSelectedEndMonth] = useState(curMonth);
    const [selectedEndDay, setSelectedEndDay] = useState(curDate[1]);
    const [selectedEndYear, setSelectedEndYear] = useState(curDate[2]);
    const [selectedEndHour, setSelectedEndHour] = useState(curTime[0]);
    const [selectedEndMin, setSelectedEndMin] = useState(curTime[1]);
    const [selectedEndDoN, setSelectedEndDoN] = useState(curDoN);

    const [selectedVacancy, setSelectedVacancy] = useState("NOT FULL");

    const [selectedColor, setSelectedColor] = useState("5987E7");

    const [selectedDesc, setSelectedDesc] = useState("");

    const [selectedLoadMonth, setSelectedLoadMonth] = useState(curMonth);

    const [price, setPrice] = useState("");
    const [popOpen, setPopOpen] = useState(false);
    const regex = /^\d+(.\d{1,2})?$/;

    let temp = [];

    useEffect(() => {
            let loadDate = String(parseInt(selectedLoadMonth) + 1) + "-" + curDate[2];
            //let loadDate = selectedLoadMonth + "-" + curDate[2];
            try{
                fireDb
                    .ref(`/events/${loadDate}`)
                    .on("value", (snapshot) => {
                        snapshot.forEach((snap) => {
                            temp.push(snap.val());
                        });
                    });
                setEvents(temp);
            } catch (err) {console.log("Failed to retrieve events: " + err)}
    }, [load, edit, deleted]);

    const handlePriceChange = (e) => {
        let typedPrice = e.target.value;
        setPrice(typedPrice);
        setPopOpen(!regex.test(typedPrice));
    }

    const closeModal = () => {
        setEdit(false);
    }

    const loadHandler = () => {
        setLoad(!load);
    }

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

    const editButtonHandler = (e) => {
        let parent = e.target.parentElement.parentElement.children;

        let name = parent[0].innerHTML;

        let startMonth = parseInt(parent[1].children[1].childNodes[0].data) - 1;
        let startDay = parent[1].children[1].childNodes[2].data;
        let startYr = parent[1].children[1].childNodes[4].data;
        let startHr = parseInt(parent[1].children[1].childNodes[6].data);
        let startMin = parent[1].children[1].childNodes[8].data;
        let startDon = parent[1].children[1].childNodes[10].data;

        let endMonth = parseInt(parent[2].children[1].childNodes[0].data) - 1;
        let endDay = parent[2].children[1].childNodes[2].data;
        let endYr = parent[2].children[1].childNodes[4].data;
        let endHr = parseInt(parent[1].children[1].childNodes[6].data);
        let endMin = parent[2].children[1].childNodes[8].data;
        let endDon = parent[2].children[1].childNodes[10].data;

        let desc = parent[3].childNodes[1].data;

        let vac = parent[5].children[0].innerHTML;

        let cardColor = hexc(e.target.parentElement.parentElement.style.backgroundColor).toUpperCase();

        setSelectedName(name);

        setSelectedStartMonth(startMonth);
        setSelectedStartDay(startDay);
        setSelectedStartYear(startYr);
        setSelectedStartHour(startHr);
        setSelectedStartMin(startMin);
        setSelectedStartDoN(startDon);
        
        setSelectedEndMonth(endMonth);
        setSelectedEndDay(endDay);
        setSelectedEndYear(endYr);
        setSelectedEndHour(endHr);
        setSelectedEndMin(endMin);
        setSelectedEndDoN(endDon);

        setSelectedVacancy(vac);
        setSelectedColor(cardColor);
        setSelectedDesc(desc);

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

        setEdit(true);
    }

    const editEventHandler = (e) => {
        let startHr = selectedStartDoN==="AM" ? parseInt(selectedStartHour) : (parseInt(selectedStartHour) + 12);
        let endHr = selectedEndDoN==="AM" ? parseInt(selectedEndHour) : (parseInt(selectedEndHour) + 12);

        let key = selectedName + "_" + 
                (parseInt(selectedStartMonth)) + "_" + 
                selectedStartDay + "_" + 
                selectedStartYear + "_" + 
                selectedStartHour + ":" + 
                parseInt(selectedStartMin) + selectedStartDoN + "_" + 
                selectedEndMonth + "_" + 
                selectedEndDay + "_" + 
                selectedEndYear + "_" + 
                selectedEndHour + ":" + 
                parseInt(selectedEndMin) + selectedEndDoN + "_" +
                selectedVacancy + "_" + 
                selectedColor + "_" + 
                selectedDesc;
        
        let editPrice = (price ? (parseFloat(price)) : price);

        fireDb.ref("/events/" + e.target.id).set({
            id: key,
            node: e.target.id,

            name: selectedName,
    
            startMonth: parseInt(selectedStartMonth),
            startDay: parseInt(selectedStartDay),
            startYear: parseInt(selectedStartYear),
            startHour: parseInt(startHr),
            startMin: parseInt(selectedStartMin),
      
            endMonth: parseInt(selectedEndMonth),
            endDay: parseInt(selectedEndDay),
            endYear: parseInt(selectedEndYear),
            endHour: parseInt(endHr),
            endMin: parseInt(selectedEndMin),

            vac: selectedVacancy,

            color: selectedColor,
    
            desc: selectedDesc,

            price: editPrice,
          })
          .then(() => console.log('Event edited.'));

        setEdit(false);
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
        let endHr = parseInt(parent[2].children[1].childNodes[6].data);
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
       
        let query = fireDb.ref("/events/")
                          .orderByChild("id")
                          .equalTo(key);
        query.once("value", function(snapshot) {
            snapshot.forEach(function(child) {
              child.ref.remove();
            })
        });
        setDeleted(!deleted);
    }

    return (
        <>
        <div className="layout">
            <Header></Header>
            <div className="pageTitle eventTitle">Event Details</div>
            <hr></hr>
            <div className="eventsButtonCon" style={{ display: 'flex', justifyContent: 'center',  }}>
                <Link to="addevent">
                    <button className="loginButton" style={{ backgroundColor: '#a3e3aa', }}>Add Event</button>
                </Link>
            </div>
            <div className="eventsCon cormorant">
                {events.map(event => (
                    <div 
                        style={{ paddingBottom:'25px' }}
                        key={event.title + event.startMonth + event.startDay + event.startYear + event.startHour + event.startMin + event.endMonth + event.endDay + event.endYear + event.endHour + event.endMin + event.vac + event.color + event.desc}>
                        <div className="eventCard shadow"
                            id={event.node}
                            style={{backgroundColor: `#${event.color}`, width:'60%', borderRadius: 10, marginLeft: 'auto', marginRight: 'auto', }}>
                            <div className="eventTitle">{event.name}</div>
                            <hr></hr>
                            <div className="eventStartTime eventInfo">
                                <em> Start time:</em> <span className="eventStartDet">{parseInt(event.startMonth) + 1}/{event.startDay}/{event.startYear} at {event.startHour>12 ? event.startHour - 12 : event.startHour}:{event.startMin<10 ? ("0" + event.startMin) : event.startMin} {event.startHour>12 ? "PM" : "AM"}</span>
                            </div>
                            <div className="eventEndTime eventInfo"><em>End time:</em> <span>{parseInt(event.endMonth) + 1}/{event.endDay}/{event.endYear} at {event.endHour>12 ? event.endHour - 12 : event.endHour}:{event.endMin<10 ? ("0" + event.endMin) : event.endMin}  {event.endHour>12 ? "PM" : "AM"}</span>
                            </div>
                            <div className="eventDesc eventInfo"><em>Description: </em>{event.desc}</div>
                            <div className="eventPrice eventInfo"><em>Price: </em>{event.price ? ("$" + event.price.toFixed(2))  : "N/A"}</div>
                            {event.vac==="FULL" ? (<div className="eventVac" style={{ padding: 10, color: '#e66060'}}><strong>{event.vac}</strong></div>) : (<div className="eventVac" style={{ padding: 10 }}><strong>{event.vac}</strong></div>)}
                            <div style={{ display: 'flex', justifyContent:'space-between' }}>
                                <button
                                    onClick={editButtonHandler} 
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
                        <Modal show={edit} onHide={closeModal} backdrop="static">
                            <Modal.Header closeButton>Edit Event</Modal.Header>
                        <Modal.Body>
            <div className="eventsCon">
                    <div>Event title: <span style={{ color: 'red' }}>*</span></div>
                    <div className="row">
                        <input
                            name="title"
                            defaultValue={event.name}
                            onChange={(e) => setSelectedName(e.target.value)}
                            required
                        ></input>
                    </div>
                    <div>Starting time: <span style={{ color: 'red' }}>*</span></div>
                <div className="row">
                    <form>
                        <select 
                            defaultValue={event.startMonth}
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
                        <select
                            defaultValue={event.startDay} 
                            onChange={(input) => setSelectedStartDay(input.target.value)}>
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
                        <select 
                            defaultValue={event.startYear} 
                            onChange={(input) => setSelectedStartYear(input.target.value)}>
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
                            defaultValue={event.startHour>12 ? (parseInt(event.startHour - 12)) : parseInt(event.startHour)}
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
                            defaultValue={event.startMin}
                            onChange={(input) => setSelectedStartMin(input.target.value)}>
                            <option value={0}>00</option>
                            <option value={1}>01</option>
                            <option value={2}>02</option>
                            <option value={3}>03</option>
                            <option value={4}>04</option>
                            <option value={5}>05</option>
                            <option value={6}>06</option>
                            <option value={7}>07</option>
                            <option value={8}>08</option>
                            <option value={9}>09</option>
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
                            <option value={32}>32</option>
                            <option value={33}>33</option>
                            <option value={34}>34</option>
                            <option value={35}>35</option>
                            <option value={36}>36</option>
                            <option value={37}>37</option>
                            <option value={38}>38</option>
                            <option value={39}>39</option>
                            <option value={40}>40</option>
                            <option value={41}>41</option>
                            <option value={42}>42</option>
                            <option value={43}>43</option>
                            <option value={44}>44</option>
                            <option value={45}>45</option>
                            <option value={46}>46</option>
                            <option value={47}>47</option>
                            <option value={48}>48</option>
                            <option value={49}>49</option>
                            <option value={50}>50</option>
                            <option value={51}>51</option>
                            <option value={52}>52</option>
                            <option value={53}>53</option>
                            <option value={54}>54</option>
                            <option value={55}>55</option>
                            <option value={56}>56</option>
                            <option value={57}>57</option>
                            <option value={58}>58</option>
                            <option value={59}>59</option>
                        </select>
                    </form>
                    <form>
                        <select 
                            defaultValue={event.startHour>12 ? "PM" : "AM"}
                            onChange={(input) => setSelectedStartDoN(input.target.value)}>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </form>
                </div>
                
                    <div>Ending time: <span style={{ color: 'red' }}>*</span></div>
                <div className="row">
                    <form>
                        <select
                            defaultValue={event.endMonth}
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
                        <select  
                            defaultValue={event.endDay} 
                            onChange={(input) => setSelectedEndDay(input.target.value)}>
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
                        <select 
                            defaultValue={event.endYear} 
                            onChange={(input) => setSelectedEndYear(input.target.value)}>
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
                            defaultValue={event.endHour>12 ? (parseInt(event.endHour) - 12) : parseInt(event.endHour)}
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
                            defaultValue={event.endMin}
                            onChange={(input) => setSelectedEndMin(input.target.value)}>
                            <option value={0}>00</option>
                            <option value={1}>01</option>
                            <option value={2}>02</option>
                            <option value={3}>03</option>
                            <option value={4}>04</option>
                            <option value={5}>05</option>
                            <option value={6}>06</option>
                            <option value={7}>07</option>
                            <option value={8}>08</option>
                            <option value={9}>09</option>
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
                            <option value={32}>32</option>
                            <option value={33}>33</option>
                            <option value={34}>34</option>
                            <option value={35}>35</option>
                            <option value={36}>36</option>
                            <option value={37}>37</option>
                            <option value={38}>38</option>
                            <option value={39}>39</option>
                            <option value={40}>40</option>
                            <option value={41}>41</option>
                            <option value={42}>42</option>
                            <option value={43}>43</option>
                            <option value={44}>44</option>
                            <option value={45}>45</option>
                            <option value={46}>46</option>
                            <option value={47}>47</option>
                            <option value={48}>48</option>
                            <option value={49}>49</option>
                            <option value={50}>50</option>
                            <option value={51}>51</option>
                            <option value={52}>52</option>
                            <option value={53}>53</option>
                            <option value={54}>54</option>
                            <option value={55}>55</option>
                            <option value={56}>56</option>
                            <option value={57}>57</option>
                            <option value={58}>58</option>
                            <option value={59}>59</option>
                        </select>
                    </form>
                    <form>
                        <select 
                            defaultValue={event.endHour>12 ? "PM" : "AM"}
                            onChange={(input) => setSelectedEndDoN(input.target.value)}>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </form>
                </div>

                    <div>Vacancy: <span style={{ color: 'red' }}>*</span></div>
                <div className="row">
                    <form>
                        <select 
                            defaultValue={event.vac}
                            onChange={(input) => setSelectedVacancy(input.target.value)}>
                            <option value="NOT FULL">Not full</option>
                            <option value="FULL">Full</option>
                        </select>
                    </form>
                </div>

                    <div>Color: <span style={{ color: 'red' }}>*</span></div>
                    <div className="row">
                    <form>
                        <select 
                            defaultValue={event.color}
                            onChange={(input) => setSelectedColor(input.target.value)}>
                            <option value="5987E7">Blue (default)</option>
                            <option value="8CE5EB">Turquoise</option>
                            <option value="FFD076">Golden</option>
                            <option value="B49EDE">Lavender</option>
                            <option value="E6A8ED">Pink</option>
                        </select>
                    </form>
                    </div>

                    <div>Description: <span style={{ color: 'red' }}>*</span></div>
                    <div className="row">
                    <textarea 
                        rows="5" 
                        cols="40"
                        defaultValue={event.desc}
                        onChange={(input) => setSelectedDesc(input.target.value)}>
                    </textarea>
                    </div>

                    <div>Price (optional): </div>
                    <div className="row">
                    <span>$ </span>
                    <input
                        name="price"
                        defaultValue={event.price}
                        onChange={handlePriceChange}
                    ></input>
                    </div>
                </div>
                <div style={{ color: 'red', paddingTop: 20, paddingBottom: 20 }}>* Required fields</div>
                <div style={{ display: 'flex', justifyContent: 'center' }} onClick={editEventHandler}>
                    <Button id={event.node}>
                        Submit Edits
                    </Button>
                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                ))}
            </div>
            <div className="eventsButtonCon" style={{ display: 'flex', justifyContent: 'center',  }}>
                <form>
                    <select 
                        className="custom-select"
                        defaultValue={curMonth}
                        onChange={(input) => setSelectedLoadMonth(input.target.value)}>
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
                <button className="loginButton" style={{ backgroundColor: '#4880b8', marginLeft: 20 }} onClick={loadHandler}>
                    Load Events
                </button>
            </div>
        </div>
        
        </>
    )
}
