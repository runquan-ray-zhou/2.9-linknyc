import { getDistance, openMap } from "../../functions/functions";
import icon from '../../assets/google.svg';
import star from '../../assets/star.svg';
import del from '../../assets/del.png';
import './LinkTerminal.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CommentForm from '../CommentForm/CommentForm';

export default function LinkTerminal( { terminal, longitude, latitude} ) {
    const navigate = useNavigate()

    const [showDetails, setShowDetails] = useState("none")
    const [shown, setShown] = useState("Show More...")

    const starredURL = "https://665683d19f970b3b36c5aa7e.mockapi.io/api/v1/terminals"

// function to check if location is already starred
function checkTerminal(id, url){
    return fetch(url)
    .then((res) => res.json())
    .then((res) => {
        return res.some(obj => obj.objectid === id)
    })
    .catch(err => console.error(err))
} 

// function to add terminal location to mock api
function addTerminal(terminal, url) {
    const options = {
        method: "POST",
        body: JSON.stringify(terminal),
        headers: { "Content-Type": "application/json" },
    };
    return fetch(`${url}`, options)
    .then((response) => {
        return response.json();
    })
    .then(() => {navigate(0)})
    .catch(err => console.error(err));
}

//onClick function to add terminal location to starred page
function addTerminalToStarred(terminal, url){
    checkTerminal(terminal.objectid, url)
    .then((haveTerminal) => {
    if(haveTerminal) {
        alert("This Terminal is already starred")         
    } else {
        addTerminal(terminal, url)
    }
    })
    .catch(err => console.error(err))
}

// function to delete terminal location from starred page
function deleteTerminal(id) {
    const options = { method: 'DELETE' };
    return fetch(
      `https://665683d19f970b3b36c5aa7e.mockapi.io/api/v1/terminals/${id}`,
      options
    ).then(() => navigate(0))
    .catch(err => console.error(err));
}

// function to toggle comments section
function toggleDetails(){
    if(showDetails === "none") {
        setShowDetails("block")
        setShown("Show Less...")
    } else {
        setShowDetails("none")
        setShown("Show More...")
    }
}

    return (
        <div className="linkTerminal__container">
           {latitude ?
            <div className="linkTerminal">
                <div className="linkTerminal__map">
                    <img onClick={() => openMap(terminal.lat, terminal.lon)} src={icon} alt="google icon" />
                </div>
                <div className="linkTerminal__address">
                    {terminal.location}
                    <br />
                    {terminal.borough} {terminal.zipcode}
                    <br />
                    {getDistance(latitude, longitude, terminal.lat, terminal.lon)} miles
                    <br />
                    <span onClick={toggleDetails}>{shown}</span>
                </div>
                <div className="linkTerminal__star">
                    <img onClick={() => addTerminalToStarred(terminal, starredURL)} src={star} alt="star icon" />
                </div>
                <div></div>
                <div style={{display: showDetails}}>
                    <div className="comments">
                        <CommentForm terminalId={terminal.objectid}/>
                    </div>
                </div>    
            </div> :
            <div className="linkTerminal__starred">
                <div className="linkTerminal__map">
                    <img className="linkTerminal__icon-img" onClick={() => openMap(terminal.lat, terminal.lon)} src={icon} alt="google icon" />
                </div>
                <div className="linkTerminal__address">
                    {terminal.location}
                    <br />
                    {terminal.borough} {terminal.zipcode}
                    <br />
                    <span onClick={toggleDetails}>{shown}</span>
                </div>
                <div className="linkTerminal__del">
                    <img className="linkTerminal__del-img" onClick={() => deleteTerminal(terminal.id)} src={del} alt="delete icon" />
                </div>
                <div></div>
                <div style={{display: showDetails}}>
                    <div className="comments">
                        <CommentForm terminalId={terminal.objectid}/>
                    </div>
                </div>    
            </div>}
        </div>
    )
}