import React from "react";
import { connect } from "react-redux";
import brandIcon from "../Images/brand.png";
import { Link, withRouter } from "react-router-dom";
import { logOutUser } from "../Authentication/auth";

function Navbar({ location, user }) {

    return (

        <nav className="container-fluid navbar navbar-expand-md navbar-dark bg-primary border-bottom shadow">
            <Link to="/" className="navbar-brand">
                <img src={brandIcon} width="80" height="60" alt="Randome"
                    className="d-inline-block align-middle" />
                <span className="d-md-inline-block d-none">Randome</span>
            </Link>
            {user ?
                <div className="d-block d-md-none ml-auto">
                    <UserDropdown user={user} />
                </div>
                : null}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse ml-auto" style={{ flexGrow: "0" }} id="mainNavbar">
                <div className="navbar-nav">
                    <LinksContainer location={location}>
                        <NavbarLink text="Home" to="/" />
                        <NavbarLink text="Randomizers" to="/browse" />
                        <NavbarLink text="FAQ" to="/faq" />
                        {user ?
                            <div className="d-none d-md-block">
                                <UserDropdown user={user} />
                            </div>
                            :
                            <NavbarLink text="Login" to="/login" />
                        }
                    </LinksContainer>
                </div>
            </div>

        </nav>

    );
}


function UserDropdown({ user }) {
    return (
        <div className="dropdown mx-2">
            <img className="nav-item dropdown-toggle rounded-circle navbar-brand" style={{ width: "3.5rem", maxHeight: "4rem" }} src={user.photoURL} id="dropdownMenuButton" alt="user" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item" to="/profile">{user.displayName}</Link>
                <Link className="dropdown-item" to="/settings">Settings</Link>
                <button className="btn btn-link dropdown-item" onClick={() => logOutUser()}>Logout</button>
            </div>
        </div>
    );
}

function LinksContainer({ location, children }) {
    const withProps = React.Children.map(children, child => React.cloneElement(child, { location }));
    return <>{withProps}</>;
}
function NavbarLink({ text, to, location }) {
    const path = location.pathname;
    let classnames = "nav-item nav-link mt-1";
    classnames += path === to ? " active" : "";
    return (
        <Link className={classnames} to={to}>{text}</ Link>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user
});


export default connect(mapStateToProps)(withRouter(Navbar));
