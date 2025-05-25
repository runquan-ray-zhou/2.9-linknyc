import {
  getDistance,
  openGoogleMap,
  formatAddress,
} from "../../functions/functions";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LinkTerminal from "../LinkTerminal/LinkTerminal";
import googlemaps from "../../assets/googlemaps.svg";
import "./Locations.css";

export default function Locations() {
  const { address } = useParams();

  const borough = address.split("|")[1];
  const zip = address.split("|")[0];
  const street = address.split("|")[2];

  const LINK_URL = `https://data.cityofnewyork.us/resource/s4kf-3yrf.json?boro=${borough}&postcode=${zip}`;

  const boroughURL = `https://data.cityofnewyork.us/resource/s4kf-3yrf.json?boro=${borough}`;

  const url = `https://api.geocod.io/v1.7/geocode?q=${street}+${borough}+NY&api_key=${
    import.meta.env.VITE_API_KEY
  }`;

  const [linkLocations, setLinkLocations] = useState([]);
  const [location, setLocation] = useState({});
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  // fetch for terminal locations and replace each object with new terminal object.
  useEffect(() => {
    fetch(zip ? LINK_URL : boroughURL)
      .then((res) => res.json())
      .then((res) => {
        const milesArray = res.map((terminal) => {
          return {
            street_address: formatAddress(terminal.street_address),
            latitude: terminal.latitude,
            longitude: terminal.longitude,
            borough: terminal.boro,
            zipcode: terminal.postcode,
            cb_link_id: terminal.cb_link_id,
            miles: getDistance(
              latitude,
              longitude,
              terminal.latitude,
              terminal.longitude
            ),
          };
        });
        const sortedArray = milesArray.sort((a, b) => a.miles - b.miles);
        setLinkLocations(sortedArray.slice(0, 10));
      })
      .catch((err) => console.error(err));
  }, [location]);

  // fetch for longitude and latitude of current location.
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setLocation(res.results[0].address_components);
        setLongitude(res.results[0].location.lng);
        setLatitude(res.results[0].location.lat);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="locations">
      <h1>Current Location</h1>
      {location.number && (
        <div className="locations__current">
          <div className="locations__current-map">
            <img
              onClick={() => openGoogleMap(latitude, longitude)}
              src={googlemaps}
              alt="googlemap icon"
            />
          </div>
          <div className="locations__current-address">
            {location.number} {location.street} {location.secondarynumber}{" "}
            {location.secondaryunit}
            <br />
            {location.city}
            <br />
            {location.zip}
          </div>
          <div className="locations__current-star">
            <img
              onClick={() => openGoogleMap(latitude, longitude)}
              src={googlemaps}
              alt="googlemap icon"
            />
          </div>
        </div>
      )}
      <h1>Closest LinkNYC</h1>
      <ul>
        {linkLocations[0] &&
          linkLocations.map((terminal) => (
            <LinkTerminal
              key={terminal.cb_link_id}
              terminal={terminal}
              latitude={latitude}
              longitude={longitude}
            />
          ))}
      </ul>
    </div>
  );
}
