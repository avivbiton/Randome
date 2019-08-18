/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";


const itemStyle = {
    fontWeight: "600",
    paddingRight: "1.25rem"
};

export default function Footer() {
    return (

        <nav className="nav flex-column p-2 border-top footer mt-auto">
            <div className="d-inline-flex flex-row pb-3 justify-content-center">
                <li>
                    <a target="_blank" href="https://github.com/avivbiton/Randome" style={itemStyle}>Source Code</a>
                </li>
                <li>
                    <a target="_blank" href="https://avivbiton.website" style={itemStyle}>Contact</a>
                </li>
                <li>
                    <a target="_blank" href="https://avivbiton.website" style={itemStyle}>About</a>
                </li>
            </div>
            <div className="d-inline-flex flex-row pb-3 justify-content-center">
                <a target="_blank" href="https://github.com/avivbiton/Randome" className="fab fa-github fa-2x mx-1" />
                <a target="_blank" href="https://www.linkedin.com/in/aviv-biton-8746b5162/" className="fab fa-linkedin fa-2x mx-1" />
                <a target="_blank" href="https://avivbiton.website" className="far fa-envelope fa-2x mx-1" />
            </div>
            <p className="d-flex justify-content-center text-muted">
                Copyright &copy; Randome. All Rights Reserved
            </p>
        </nav>

    );
}
