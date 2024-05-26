import { Link } from "react-router-dom";
import "./Login.css"
import wifi from '../../assets/wifi.png';


export default function Login() {
    return (
        <div className="login">
            <div className="circle">
                <div className="circle1">
                    <div className="circle2">
                        <div className="circle3">
                        <img src={wifi} alt="google icon" />
                        </div>
                    </div>
                </div>
            </div>
            <span>LinkNYC Finder</span>
            <div className="login-button__container">
                <div className="edition">
                <p>2024 EDITION</p>
                </div>
                <Link to="/home">
                    <button className="login-button">LOGIN</button>
                </Link>
            </div>
        </div>
    )
}