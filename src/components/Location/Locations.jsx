import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import './Locations.css'
import icon from '../../assets/google.svg';

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

  useEffect(() => {
    fetch(zip ? LINK_URL : boroughURL)
    .then((res) => res.json())
    .then((res) => {
        const milesArray = res.map(terminal => {
        return {"location": terminal.location,
                "lat": terminal.lat,
                "lon": terminal.lon,
                "miles" : distance(latitude, longitude, terminal.lat, terminal.lon)}
    })
    const sortedArray = milesArray.sort((a, b) => a.miles - b.miles)
    setLinkLocations(sortedArray.slice(0, 5))
    })
    .catch((err) => console.error(err))
  },[location])

  useEffect(() => {
    fetch(url)
    .then((res) => res.json())
    .then((res) => {
        console.log(res)
        setLocation(res.results[0].address_components)
        setLongitude(res.results[0].location.lng)
        setLatitude(res.results[0].location.lat)
    })
    .catch((err) => console.error(err))
  },[])


  function distance(lat1, lon1, lat2, lon2) {
    const r = 6371; // km
    const p = Math.PI / 180;
    //haversine formula
    const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
                  + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
                    (1 - Math.cos((lon2 - lon1) * p)) / 2;  
    //change to miles
    let miles = 2 * r * Math.asin(Math.sqrt(a)) * 0.621371
    return Number.parseFloat(miles.toFixed(4))
  }

    function openMap(lat, lon) {
    window.open(`https://maps.google.com?q=${lat},${lon}`);
  }
    return (
        <div className="locations">
            <h2>Current Location</h2>
            {location.number && 
              <div>
                <img onClick={() => openMap(latitude, longitude)} src={icon} alt="google icon" />
                <div>
                {location.number} {location.street} {location.secondarynumber} {location.secondaryunit}
                <br />
                {location.city}
                <br />
                {location.zip}
                </div>
                {/* Lat: {latitude} Lng: {longitude} */}
              </div>}
            <h2>Closest LinkNYC Locations</h2>
            <ul>
            {linkLocations[0] && linkLocations.map((terminal, i) => 
                <li key={i}>
                    <span>
                    <img onClick={() => openMap(terminal.lat, terminal.lon)} src={icon} alt="google icon" />
                    <br />
                    {terminal.location}
                    <br />
                    {borough} {zip || location.zip}
                    </span>
                    <br />
                    {/* <span>Lat: {terminal.lat} Lng: {terminal.lon}</span> */}
                    <span>Distance from current location:
                    <br />
                      {distance(latitude, longitude, terminal.lat, terminal.lon)} miles
                    </span>
                                     
                </li>)}
            </ul>
        </div>
    )
}