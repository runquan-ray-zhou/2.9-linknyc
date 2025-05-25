import {
  getDistance,
  getDirectionOnGoogleMap,
  openGoogleMap,
} from "../../functions/functions";
import google from "../../assets/google.svg";
import star from "../../assets/star.svg";
import emptystar from "../../assets/emptystar.png";
import del from "../../assets/del.png";
import "./LinkTerminal.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentForm from "../CommentForm/CommentForm";

export default function LinkTerminal({ terminal, longitude, latitude }) {
  const navigate = useNavigate();

  const [showDetails, setShowDetails] = useState("none");
  const [shown, setShown] = useState("Show Comments");
  const [starred, setStarred] = useState([]);

  // mockapi holding list of starred terminal locations
  const starredURL =
    "https://665683d19f970b3b36c5aa7e.mockapi.io/api/v1/terminals";

  // fetch starredURL to check for starred locations
  useEffect(() => {
    fetch(starredURL)
      .then((res) => res.json())
      .then((res) => setStarred(res))
      .catch((err) => console.error(err));
  }, []);

  // function to check if location is already starred
  async function checkTerminal(id, url) {
    try {
      const res = await fetch(url);
      const res_1 = await res.json();
      return res_1.some((obj) => obj.cb_link_id === id);
    } catch (err) {
      return console.error(err);
    }
  }

  // function to add terminal location to mock api
  async function addTerminal(terminal, url) {
    const options = {
      method: "POST",
      body: JSON.stringify(terminal),
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch(`${url}`, options);
      await response.json();
      navigate(0);
    } catch (err) {
      return console.error(err);
    }
  }

  // onClick function to add terminal location to starred page
  function addTerminalToStarred(terminal, url) {
    checkTerminal(terminal.cb_link_id, url)
      .then((haveTerminal) => {
        if (haveTerminal) {
          alert("This Terminal is already starred");
        } else {
          addTerminal(terminal, url);
        }
      })
      .catch((err) => console.error(err));
  }

  // function to delete terminal location from starred page
  async function deleteTerminal(id) {
    const options = { method: "DELETE" };
    try {
      await fetch(`${starredURL}/${id}`, options);
      return navigate(0);
    } catch (err) {
      return console.error(err);
    }
  }

  // function to toggle comments section
  function toggleDetails() {
    if (showDetails === "none") {
      setShowDetails("block");
      setShown("Hide Comments");
    } else {
      setShowDetails("none");
      setShown("Show Comments");
    }
  }

  return (
    <div className="linkTerminal__container">
      {latitude ? (
        <div className="linkTerminal">
          <div className="linkTerminal__map">
            <img
              className="linkTerminal__icon-img"
              onClick={() =>
                getDirectionOnGoogleMap(
                  terminal.latitude,
                  terminal.longitude,
                  latitude,
                  longitude,
                  terminal.street_address,
                  terminal.borough
                )
              }
              src={google}
              alt="google icon"
            />
          </div>
          <div className="linkTerminal__address">
            {terminal.street_address}
            <br />
            {terminal.borough} {terminal.zipcode}
            <br />
            {getDistance(
              latitude,
              longitude,
              terminal.latitude,
              terminal.longitude
            )}{" "}
            miles
            <br />
            <span
              style={{ cursor: "pointer", color: "#E63946" }}
              onClick={toggleDetails}
            >
              {shown}
            </span>
          </div>
          {starred.length ? (
            starred.some((obj) => obj.cb_link_id === terminal.cb_link_id) ? (
              <div className="linkTerminal__star">
                <img
                  className="linkTerminal__icon-img"
                  src={star}
                  alt="star icon"
                />
              </div>
            ) : (
              <div className="linkTerminal__star">
                <img
                  className="linkTerminal__icon-img"
                  onClick={() => addTerminalToStarred(terminal, starredURL)}
                  src={emptystar}
                  alt="emptystar icon"
                />
              </div>
            )
          ) : (
            <div className="linkTerminal__star">
              <img
                className="linkTerminal__icon-img"
                onClick={() => addTerminalToStarred(terminal, starredURL)}
                src={emptystar}
                alt="emptystar icon"
              />
            </div>
          )}
          <div></div>
          <div style={{ display: showDetails }}>
            <div className="comments">
              <CommentForm terminalId={terminal.cb_link_id} />
            </div>
          </div>
        </div>
      ) : (
        <div className="linkTerminal__starred">
          <div className="linkTerminal__map">
            <img
              className="linkTerminal__icon-img"
              onClick={() =>
                openGoogleMap(terminal.latitude, terminal.longitude)
              }
              src={google}
              alt="google icon"
            />
          </div>
          <div className="linkTerminal__address">
            {terminal.street_address}
            <br />
            {terminal.borough} {terminal.zipcode}
            <br />
            <span
              style={{ cursor: "pointer", color: "#E63946" }}
              onClick={toggleDetails}
            >
              {shown}
            </span>
          </div>
          <div className="linkTerminal__del">
            <img
              className="linkTerminal__del-img"
              onClick={() => deleteTerminal(terminal.id)}
              src={del}
              alt="delete icon"
            />
          </div>
          <div></div>
          <div style={{ display: showDetails }}>
            <div className="comments">
              <CommentForm terminalId={terminal.cb_link_id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
