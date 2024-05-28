import { getDistance } from "../../functions/functions"


export default function LinkTerminal( { terminal, icon, longitude, latitude} ) {
    return (
        <div className="linkTerminal">
            <div>
                    <img onClick={() => openMap(terminal.lat, terminal.lon)} src={icon} alt="google icon" />
                    <br />
                    {terminal.location}
                    <br />
                    {terminal.borough} {terminal.zipcode}
                    <br />
                    {getDistance(latitude, longitude, terminal.lat, terminal.lon)} miles away.
            </div>          
        </div>
    )
}