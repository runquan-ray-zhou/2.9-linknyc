import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function Form() {
  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!e.target.address.value) {
      alert("Please add an address");
    } else if (!e.target.borough.value) {
      alert("Please select an borough");
    } else {
      navigate(
        `/locations/${e.target.zipcode.value}|${e.target.borough.value}|${e.target.address.value}`
      );
    }
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
    </div>
  );
}
