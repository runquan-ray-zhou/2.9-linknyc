import "./About.css";

export default function About() {
  return (
    <div className="About">
      <div className="About_info">
        <h1>What is LinkNYC? and What does LinkNYC terminal, Links, do?</h1>
        <h4>
          LinkNYC is a first-of-its-kind communications network that is
          replacing New York City pay phones with state-of-the-art kiosks called
          Links. Each Link is equipped with free services like high-speed Wi-Fi,
          phone calls, a tablet for maps and city services, and device charging
          for anyone living in or visiting New York City to enjoy. In addition
          to Link’s features being free to the public, they also come at no cost
          to taxpayers. Links are installed across the five boroughs.
        </h4>
        <h4>
          <a
            href="https://www.link.nyc/home.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click for more info{" "}
          </a>
        </h4>
        <h4>
          LinkNYC Finder is a web application designed to help users locate the
          nearest LinkNYC terminals in New York City. These terminals offer free
          Wi-Fi access across the city. Users can simply input their location,
          and the app will display a list of the closest terminals where they
          can connect to the internet for free.
        </h4>
      </div>
      <img
        className="About__img"
        src="https://avatars.githubusercontent.com/u/151119924?v=4"
        alt="self portrait"
      />
      <p>LinkNYC Finder By: Runquan (Ray) Zhou</p>
      <div className="About__icons">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="mailto:rzhou@pursuit.org"
        >
          <i className="fa-regular fa-envelope"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/runquan-ray-zhou"
        >
          <i className="fa-brands fa-github"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/runquanrayzhou/"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/runquan-ray-zhou/2.9-linknyc"
        >
          <i className="fa-solid fa-code"></i>
        </a>
      </div>
      <p>All Rights Reserved 2025</p>
    </div>
  );
}
