import { Link } from "react-router-dom";
import "./Home.css"
import google from '../../assets/google.svg'
import star from '../../assets/star.svg'

export default function Home() {

    return (
        <div className="home">
            <h1>LinkNYC Terminals</h1>
                <Link to="/form">
                    <button>
                        <img className="home__google-icon" src={google} alt="google icon" />
                    </button>
                </Link>
            <h1>Starred Locations</h1>
                <Link to="/starred">
                    <button>
                        <img className="home__star-icon" src={star} alt="star icon" />
                    </button>
                </Link>
        </div>
    )
}