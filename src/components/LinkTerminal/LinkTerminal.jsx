import { getDistance, openMap } from "../../functions/functions";
import icon from '../../assets/google.svg';
import star from '../../assets/star.svg';
import './LinkTerminal.css';

export default function LinkTerminal( { terminal, longitude, latitude} ) {
    return (
        <div className="linkTerminal">
            <div className="linkTerminal__map">
                <img onClick={() => openMap(terminal.lat, terminal.lon)} src={icon} alt="google icon" />
            </div>
            <div className="linkTerminal__address">
                {terminal.location}
                <br />
                {terminal.borough} {terminal.zipcode}
                <br />
                {getDistance(latitude, longitude, terminal.lat, terminal.lon)} miles away.
            </div>
            <div className="linkTerminal__star">
                <img onClick={() => openMap(terminal.lat, terminal.lon)} src={star} alt="star icon" />
            </div>
        </div>
    )
}