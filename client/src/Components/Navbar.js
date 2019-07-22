import React from "react";
import brandIcon from "../Images/brand.png";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
            <Link to="/" className="navbar-brand">
                <img src={brandIcon} width="80" height="60" alt="Randome"
                    className="d-inline-block align-middle" />
                <span className="d-md-inline-block d-none">Randome</span>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse ml-auto" style={{ flexGrow: "0" }} id="mainNavbar">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link text-secondary" to="/browse">Randomizers</Link>
                    <Link className="nav-item nav-link text-secondary" to="/">Contact Us</Link>
                    <Link className="nav-item nav-link text-secondary" to="/">Signup</Link>
                    <Link className="nav-item nav-link text-secondary" to="/">Login</Link>
                </div>
            </div>

        </nav>
    );
}
