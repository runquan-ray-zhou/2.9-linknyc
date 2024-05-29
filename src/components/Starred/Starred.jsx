import { useEffect, useState } from "react";
import LinkTerminal from "../LinkTerminal/LinkTerminal";
import './Starred.css';

export default function Starred() {

    const [starredLocations, setStarredLocations] = useState([])

    const starredURL = "https://665683d19f970b3b36c5aa7e.mockapi.io/api/v1/terminals"

    useEffect(() => {
        fetch(starredURL)
        .then((res) => res.json())
        .then((res) => {
            setStarredLocations([...res])
        })
    },[])

    return (
        <div className="starred">
            <h1>Starred Locations</h1>
            <ul>
            {starredLocations[0] && starredLocations.map((terminal, i) => 
                    <LinkTerminal 
                    key={i} 
                    terminal={terminal} 
                    />
                )}
            </ul>
        </div>
    )
}