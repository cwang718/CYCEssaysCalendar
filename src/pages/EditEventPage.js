import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Header from "../components/Header";
import { fireDb } from "../Firebase/config";
import { Tooltip } from 'reactstrap';
import '../App.css';

export default function EditEventPage() {
    const { event_id } = useParams();
    const history = useHistory();

    let oldArr = event_id.split("_");
        
    let oldStartTime = oldArr[4].split(":");
    let oldStartMin = oldStartTime[1].slice(0,-2);
    let oldStartDon = oldStartTime[1].slice(-2);

    let oldEndTime = oldArr[8].split(":");
    let oldEndMin = oldEndTime[1].slice(0,-2);
    let oldEndDon = oldEndTime[1].slice(-2);

    const [selectedName, setSelectedName] = useState(oldArr[0]);

    const [selectedStartMonth, setSelectedStartMonth] = useState(oldArr[1]);
    const [selectedStartDay, setSelectedStartDay] = useState(oldArr[2]);
    const [selectedStartYear, setSelectedStartYear] = useState(oldArr[3]);
    const [selectedStartHour, setSelectedStartHour] = useState(oldStartTime[0]);
    const [selectedStartMin, setSelectedStartMin] = useState(oldStartMin);
    const [selectedStartDoN, setSelectedStartDoN] = useState(oldStartDon);

    const [selectedEndMonth, setSelectedEndMonth] = useState(oldArr[5]);
    const [selectedEndDay, setSelectedEndDay] = useState(oldArr[6]);
    const [selectedEndYear, setSelectedEndYear] = useState(oldArr[7]);
    const [selectedEndHour, setSelectedEndHour] = useState(oldEndTime[0]);
    const [selectedEndMin, setSelectedEndMin] = useState(oldEndMin);
    const [selectedEndDoN, setSelectedEndDoN] = useState(oldEndDon);

    let years = [parseInt(oldArr[3]) - 1, parseInt(oldArr[3]), 
                 parseInt(oldArr[3]) + 1, parseInt(oldArr[3]) + 2,
                 parseInt(oldArr[3]) + 3, parseInt(oldArr[3]) + 4];

    const [selectedVacancy, setSelectedVacancy] = useState(oldArr[9]);

    const [selectedColor, setSelectedColor] = useState(oldArr[10]);

    const [selectedDesc, setSelectedDesc] = useState(oldArr[11]);

    const [price, setPrice] = useState("");
    const [popOpen, setPopOpen] = useState(false);
    const regex = /^\d+(.\d{1,2})?$/;
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {  
        if(deleted){
            fireDb.ref("events/" + event_id)
                .on("value", function(snapshot) {
                    let oldData = snapshot.val();
                    console.log("oldData in EditPage:", oldData);

                    let oldStartHr = (oldData.startHour>12 ? (parseInt(oldData.startHour) - 12) : parseInt(oldData.startHour));
                    let oldStartDon = (oldData.startHour>12 ? "PM" : "AM");

                    let oldEndHr = (oldData.endHour>12 ? (parseInt(oldData.endHour) - 12) : parseInt(oldData.endHour));
                    let oldEndDon = (oldData.endHour>12 ? "PM" : "AM");

                    setSelectedName(oldData.name);
                    
                    setSelectedStartMonth(oldData.startMonth);
                    setSelectedStartDay(oldData.startDay);
                    setSelectedStartYear(oldData.startYear);
                    setSelectedStartHour(oldStartHr);
                    setSelectedStartMin(oldData.startMin);
                    setSelectedStartDoN(oldStartDon);

                    setSelectedEndMonth(oldData.endMonth);
                    setSelectedEndDay(oldData.endDay);
                    setSelectedEndYear(oldData.endYear);
                    setSelectedEndHour(oldEndHr);
                    setSelectedEndMin(oldData.endMin);
                    setSelectedEndDoN(oldEndDon);

                    setSelectedVacancy(oldData.vac);

                    setSelectedColor(oldData.color);

                    setSelectedDesc(oldData.desc);
                }, function (errorObject) {
                    console.log("Realtime DB read failed: " + errorObject.code);
                });
        }                            
    }, [event_id, deleted])

    const handlePriceChange = (e) => {
        let typedPrice = e.target.value;
        setPrice(typedPrice);
        setPopOpen(!regex.test(typedPrice));
    }

    const handleEditEvent = (e) => {
        let startHr = selectedStartDoN==="AM" ? parseInt(selectedStartHour) : (parseInt(selectedStartHour) + 12);
        let endHr = selectedEndDoN==="AM" ? parseInt(selectedEndHour) : (parseInt(selectedEndHour) + 12);

        let key = selectedName + "_" + 
                (parseInt(selectedStartMonth)) + "_" + 
                selectedStartDay + "_" + 
                selectedStartYear + "_" + 
                selectedStartHour + ":" + 
                selectedStartMin + selectedStartDoN + "_" + 
                selectedEndMonth + "_" + 
                selectedEndDay + "_" + 
                selectedEndYear + "_" + 
                selectedEndHour + ":" + 
                selectedEndMin + selectedEndDoN + "_" +
                selectedVacancy + "_" + 
                selectedColor + "_" + 
                selectedDesc;
        key = key.replaceAll(".", "").replaceAll("#", "").replaceAll("$", "").replaceAll("[", "").replaceAll("]", "");
    
        fireDb.ref('/events/' + key)
              .set({
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

            price: price,
          })
          .then(() => console.log('Editted event added.'));

          setDeleted(true);
          fireDb.ref("/events/" + event_id).remove();
          history.push("/eventdetails");
          
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
                        style={{ borderRadius: 15, border:'2px solid black', padding: 5 }}
                    ></input>
                </div>
                <div className="row">
                    <span className="label">Starting time: </span>
                    <form>
                        <select 
                            className="time" 
                            defaultValue={selectedStartMonth}
                            onChange={(input) => setSelectedStartMonth(input.target.value)}
                            style={{ borderRadius: 15, border:'2px solid black', padding: 5 }}>
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
                            className="time" 
                            defaultValue={selectedStartDay} 
                            onChange={(input) => setSelectedStartDay(input.target.value)}
                            style={{ borderRadius: 15, border:'2px solid black', padding: 5 }}>
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
                            className="time" 
                            defaultValue={selectedStartYear} 
                            onChange={(input) => setSelectedStartYear(input.target.value)}
                            style={{ borderRadius: 15, border:'2px solid black', padding: 5 }}>
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
                            defaultValue={selectedStartHour}
                            onChange={(input) => setSelectedStartHour(input.target.value)}
                            style={{ borderRadius: 15, border:'2px solid black', padding: 5 }}>
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
                            defaultValue={selectedStartMin}
                            onChange={(input) => setSelectedStartMin(input.target.value)}
                            style={{ borderRadius: 15, border:'2px solid black', padding: 5 }}>
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
                            className="time" 
                            defaultValue={selectedStartDoN}
                            onChange={(input) => setSelectedStartDoN(input.target.value)}
                            style={{ borderRadius: 15, border:'2px solid black', padding: 5 }}>
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
                            defaultValue={selectedEndMonth}
                            onChange={(input) => setSelectedEndMonth(input.target.value)}
                            style={{ borderRadius: 15, border:'2px solid black', padding: 5 }}>
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
                            className="time" 
                            defaultValue={selectedEndDay} 
                            onChange={(input) => setSelectedEndDay(input.target.value)}
                            style={{ borderRadius: 15, border:'2px solid black', padding: 5 }}>
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
                            className="time" 
                            defaultValue={selectedEndYear} 
                            onChange={(input) => setSelectedEndYear(input.target.value)}
                            style={{ borderRadius: 15, border:'2px solid black', padding: 5 }}>
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
                            defaultValue={selectedEndHour}
                            onChange={(input) => setSelectedEndHour(input.target.value)}
                            style={{ borderRadius: 15, border:'2px solid black', padding: 5 }}>
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
                            defaultValue={selectedEndMin}
                            onChange={(input) => setSelectedEndMin(input.target.value)}
                            style={{ borderRadius: 15, border:'2px solid black', padding: 5 }}>
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
                            className="time" 
                            defaultValue={selectedEndDoN}
                            onChange={(input) => setSelectedEndDoN(input.target.value)}
                            style={{ borderRadius: 15, border:'2px solid black', padding: 5 }}>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </form>
                </div>

                <div className="row">
                    <span className="label">Vacancy: </span>
                    <form>
                        <select 
                            className="time" 
                            defaultValue={selectedVacancy}
                            onChange={(input) => setSelectedVacancy(input.target.value)}
                            style={{ borderRadius: 15, border:'2px solid black', padding: 5 }}>
                            <option value="NOT FULL">Not full</option>
                            <option value="FULL">Full</option>
                        </select>
                    </form>
                </div>

                <div className="row">
                    <span className="label">Color: </span>
                    <form>
                        <select 
                            className="time" 
                            defaultValue={selectedColor}
                            onChange={(input) => setSelectedColor(input.target.value)}
                            style={{ borderRadius: 15, border:'2px solid black', padding: 5 }}>
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
                        defaultValue={selectedDesc}
                        onChange={(input) => setSelectedDesc(input.target.value)}
                        style={{ borderRadius: 15, border:'2px solid black', padding: 5 }}>
                    </textarea>
                </div>

                <div className="row" style={{ paddingBottom: 50 }}>
                    <span className="label">Price (optional): </span>
                    <span style={{ fontSize: 30 }}>$</span>
                    <input
                        className="price"
                        id="price"
                        name="price"
                        value={price}
                        onChange={handlePriceChange}
                        style={{ borderRadius: 15, border:'2px solid black', padding: 5 }}
                    ></input>
                </div>
                
                <Tooltip
                    isOpen={popOpen}
                    placement="bottom"
                    text="Bottom"
                    target="price"
                    style={{ padding: 10, backgroundColor: '#c7e3ed', border: "1px solid black",WebkitBorderRadius: '10px', position: 'relative' }}>
                    Price must be in this form:<br />
                    <em>Integer</em> OR <em>Integer</em>.XX
                </Tooltip>
            </div>
            <div className="loginButtonPageCon">
                <Link to="eventdetails">
                    <button 
                        className="loginButton" 
                        onClick={handleEditEvent} 
                        style={{ backgroundColor: `#${selectedColor}` }}>
                        Submit Editted Event
                    </button>
                </Link>
            </div>
        </div>
    )
}
