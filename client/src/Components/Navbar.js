import React from "react";
import brandIcon from "../Images/brand.png";
import { Link, withRouter } from "react-router-dom";

function Navbar({ location }) {

    return (

        <nav className="container-fluid navbar navbar-expand-md navbar-dark bg-primary border-bottom shadow">
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
                    <LinksContainer location={location}>
                        <NavbarLink text="Home" to="/" />
                        <NavbarLink text="Randomizers" to="/browse" />
                        <NavbarLink text="FAQ" to="/faq" />
                        <NavbarLink text="Login" to="/login" />
                    </LinksContainer>
                </div>
            </div>

        </nav>

    );
}

function LinksContainer({ location, children }) {
    const withProps = React.Children.map(children, child => React.cloneElement(child, { location: location }));
    return <>{withProps}</>;
}
function NavbarLink({ text, to, location }) {
    const path = location.pathname;
    let classnames = "nav-item nav-link";
    classnames += path === to ? " active" : "";
    return (
        <Link className={classnames} to={to}>{text}</ Link>
    );
}


export default withRouter(Navbar);
