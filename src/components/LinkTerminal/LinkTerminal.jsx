import { getDistance, openMap } from "../../functions/functions";
import icon from '../../assets/google.svg';
import star from '../../assets/star.svg';
import './LinkTerminal.css';
import { useNavigate } from "react-router-dom";

export default function LinkTerminal( { terminal, longitude, latitude} ) {
    const navigate = useNavigate()

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
                    <br />
                    {getDistance(latitude, longitude, terminal.lat, terminal.lon)} miles
                </div>
                <div className="linkTerminal__star">
                    <img onClick={() => addTerminalToStarred(terminal, starredURL)} src={star} alt="star icon" />
                </div>
            </div> :
            <div className="linkTerminal">
                <div className="linkTerminal__map">
                    <img onClick={() => openMap(terminal.lat, terminal.lon)} src={icon} alt="google icon" />
                </div>
                <div className="linkTerminal__address">
                    {terminal.location}
                    <br />
                    {terminal.borough} {terminal.zipcode}
                </div>
                <div className="linkTerminal__star">
                    <img onClick={() => addTerminalToStarred(terminal, starredURL)} src={star} alt="star icon" />
                </div>
            </div>}
        </div>
    )
}