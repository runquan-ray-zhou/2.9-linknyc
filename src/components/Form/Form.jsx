import { getCorrectBorough } from "../../functions/functions";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function Form() {
  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!e.target.address.value) {
      alert("Please add an address");
    } else if (!e.target.borough.value) {
      alert("Please select a borough");
    } else {
      navigate(
        `/locations/${e.target.zipcode.value}|${e.target.borough.value}|${e.target.address.value}`
      );
    }
  }

  // reverseGeocode gets current location from geocod.io service
  async function reverseGeocode(lat, lng) {
    const response = await fetch(
      `https://api.geocod.io/v1.7/reverse?q=${lat},${lng}&api_key=${
        import.meta.env.VITE_API_KEY
      }`
    );

    if (!response.ok) {
      throw new Error("Failed to reverse geocode");
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const { address_components } = data.results[0];
      console.log(address_components);
      const address = `${address_components.number} ${address_components.street}, ${address_components.city}, ${address_components.state} ${address_components.zip}`;
      return {
        fullAddress: address,
        borough: address_components.city,
        zip: address_components.zip,
      };
    }

    throw new Error("No results found");
  }

  // handleUseCurrentLocation navigates to locations page with current position
  function handleUseCurrentLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const { fullAddress, borough, zip } = await reverseGeocode(
            latitude,
            longitude
          );
          console.log("Reverse Geocoded:", fullAddress);

          // Navigate using the same format as your form submission
          navigate(
            `/locations/${zip}|${getCorrectBorough(
              borough
            )}|${encodeURIComponent(fullAddress)}`
          );
        } catch (error) {
          console.error("Reverse geocoding error:", error);
          alert("Failed to get address from your location.");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Could not access your location.");
      },
      { enableHighAccuracy: true }
    );
  }

  return (
    <div className="find">
      <h1>Find Closest LinkNYC Terminal</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          <div className="find__label">Address:</div>
          <br />
          <input
            className="find__address"
            type="text"
            name="address"
            id="address"
            placeholder="Enter Current Location"
          />
        </label>
        <br />
        <label>
          <div className="find__label">Borough:</div>
          <br />
          <select className="find__borough" name="borough" id="borough">
            <option value="">Choose a Borough</option>
            <option value="Bronx">Bronx</option>
            <option value="Manhattan">Manhattan</option>
            <option value="Queens">Queens</option>
            <option value="Brooklyn">Brooklyn</option>
            <option value="Staten Island">Staten Island</option>
          </select>
        </label>
        <br />
        <label>
          <div className="find__label">Zip code:</div>
          <br />
          <input
            className="find__zipcode"
            type="text"
            name="zipcode"
            id="zipcode"
            placeholder="Enter Current Zip Code"
          />
        </label>
        <br />
        <button type="submit" className="find__button">
          Find
        </button>
      </form>
      <button
        type="submit"
        onClick={handleUseCurrentLocation}
        className="my__button"
      >
        Use My Location
      </button>
    </div>
  );
}
