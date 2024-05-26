import { useNavigate } from "react-router-dom"
import './Form.css'

export default function Form() {
    const navigate = useNavigate()

    function handleFormSubmit(e) {
        e.preventDefault()
        if (!e.target.address.value) {
            alert("Please input an address")
        } else {
            navigate(`/locations/${e.target.zipcode.value}|${e.target.borough.value}|${e.target.address.value}`)
        }
    }

    return (
        <div className="search">
            <h1>Search for closest LinkNYC Terminal</h1>
            <form onSubmit={handleFormSubmit}>
                <label>
                <div className="search__label">
                Address:
                </div>
                <br />
                    <input 
                        className="search__address"
                        type="text" 
                        name="address" 
                        id="address" 
                        placeholder="Enter Current Location"
                    />
                </label>
                <br />
                <label>
                <div className="search__label">
                Borough:
                </div>
                <br />
                    <select
                        className="search__borough"
                        name="borough" 
                        id="borough">
                            <option value="">Choose a Borough</option>
                            <option value="Bronx">Bronx</option>
                            <option value="Manhattan">Manhattan</option>
                            <option value="Queens">Queens</option>
                            <option value="Brooklyn">Brooklyn</option>
                            <option value="Staten">Staten Island</option>
                    </select>
                </label>
                <br />
                <label>
                <div className="search__label">
                Zipcode:
                </div>
                <br />
                    <input
                    className="search__zipcode" 
                    type="text" 
                    name="zipcode" 
                    id="zipcode" 
                    placeholder="Enter Current Zip Code"
                    />
                </label>
                <br />
                <button type="submit" className="search__button">Search</button>
            </form>
        </div>
    )
}