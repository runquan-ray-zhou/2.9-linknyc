import { getDistance, openGoogleMap, formatAddress} from "../../functions/functions";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LinkTerminal from "../LinkTerminal/LinkTerminal";
import googlemaps from '../../assets/googlemaps.svg';
import './Locations.css';

export default function Locations() {

const { address } = useParams()

const borough = address.split("|")[1]
const zip = address.split("|")[0]
const street = address.split("|")[2]

const LINK_URL = `https://data.cityofnewyork.us/resource/varh-9tsp.json?city=${borough}&postcode=${zip}&ssid=LinkNYC%20Free%20Wi-Fi`

const boroughURL = `https://data.cityofnewyork.us/resource/varh-9tsp.json?city=${borough}&ssid=LinkNYC%20Free%20Wi-Fi`

const url = `https://api.geocod.io/v1.7/geocode?q=${street}+${borough}+NY&api_key=${import.meta.env.VITE_API_KEY}`

const [linkLocations, setLinkLocations] = useState([])
const [location, setLocation] = useState({})
const [longitude, setLongitude] = useState(0)
const [latitude, setLatitude] = useState(0)

// fetch for terminal locations and replace each object with new terminal object.
  useEffect(() => {
    fetch(zip ? LINK_URL : boroughURL)
    .then((res) => res.json())
    .then((res) => {
        const milesArray = res.map(terminal => {
        return {"location": formatAddress(terminal.location),
                "lat": terminal.lat,
                "lon": terminal.lon,
                "borough": terminal.boroname,
                "zipcode": terminal.postcode,
                "objectid": terminal.objectid,
                "miles" : getDistance(latitude, longitude, terminal.lat, terminal.lon),
              }
            })
    const sortedArray = milesArray.sort((a, b) => a.miles - b.miles)
    setLinkLocations(sortedArray.slice(0,5))
    })
    .catch((err) => console.error(err))
  },[location])

// fetch for longitude and latitude of current location.
  useEffect(() => {
    fetch(url)
    .then((res) => res.json())
    .then((res) => {
        setLocation(res.results[0].address_components)
        setLongitude(res.results[0].location.lng)
        setLatitude(res.results[0].location.lat)
    })
    .catch((err) => console.error(err))
  },[])

    return (
        <div className="locations">
            <h2>Current Location</h2>
            {location.number && 
              <div className="locations__current">
                <div className="locations__current-map">
                  <img onClick={() => openGoogleMap(latitude, longitude)} src={googlemaps} alt="googlemap icon" />
                </div>
                <div className="locations__current-address" >
                  {location.number} {location.street} {location.secondarynumber} {location.secondaryunit}
                  <br />
                  {location.city}
                  <br />
                  {location.zip}
                </div>
                <div className="locations__current-star">
                  <img onClick={() => openGoogleMap(latitude, longitude)} src={googlemaps} alt="googlemap icon" />
                </div>
              </div>}
            <h2>Closest LinkNYC</h2>
            <ul>
            {linkLocations[0] && linkLocations.map(terminal => 
                    <LinkTerminal 
                    key={terminal.objectid} 
                    terminal={terminal} 
                    latitude={latitude} 
                    longitude={longitude}
                    />
                )}
            </ul>
        </div>
    )
}