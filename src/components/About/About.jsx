import "./About.css"

export default function About() {
    return (
        <div className="About">
            <img className="About__img" src="https://media.licdn.com/dms/image/v2/D4E03AQHV7_mind9zJQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1709449259555?e=1728518400&v=beta&t=UnGcu7gL0_T1lIwedmLZwRC9zN5M1z7emehM9HRZZ8c" alt="self portrait" />
            <p>LinkNYC Finder By: Runquan (Ray) Zhou</p>
            <div className="About__icons">
                <a href="mailto:rzhou@pursuit.org"><i className="fa-regular fa-envelope"></i></a>
                <a href="https://github.com/runquan-ray-zhou"><i className="fa-brands fa-github"></i></a>
                <a href="https://www.linkedin.com/in/runquanrayzhou/"><i className="fa-brands fa-linkedin"></i></a>
                <a href="https://github.com/runquan-ray-zhou/2.9-linknyc"><i className="fa-solid fa-code"></i></a>
            </div>
            <iframe
                width="300"
                height="175"
                style={{border: "none"}}
                src="https://test-ar-marker-react.netlify.app/"
                allowFullScreen
                allow="camera"
            ></iframe>
            <p>All Rights Reserved 2024</p>
        </div>
    )
}