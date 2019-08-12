import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logOutUser } from "../Authentication/auth";

function Navbar({ user }) {
    return (
        <nav className="container-fluid navbar navbar-expand-md navbar-dark bg-primary border-bottom shadow">
            <Link to="/" className="navbar-brand">
                <h4>Randome</h4>
            </Link>
            {user ?
                <div className="d-block d-md-none ml-auto">
                    <UserDropdown user={user} />
                </div>
                : null}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mainNavbar">
                <div className="navbar-nav mr-auto">
                    <NavbarLink text="Collection" to="/browse" />
                </div>
                <div className="navbar-nav ml-auto">
                    {user ?
                        <div className="d-none d-md-block">
                            <UserDropdown user={user} />
                        </div>
                        :
                        <NavbarLink text="Login" to="/login" />
                    }
                </div>
            </div>



        </nav>

    );
}


function UserDropdown({ user }) {
    return (
        <div className="dropdown mx-2">
            <img className="nav-item dropdown-toggle rounded-circle navbar-brand" style={{ width: "3rem", maxHeight: "3.5rem" }} src={user.photoURL} id="dropdownMenuButton" alt="user" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item" to="/profile">{user.displayName}</Link>
                <Link className="dropdown-item" to="/create">Create</Link>
                <button className="btn btn-link dropdown-item" onClick={() => logOutUser()}>Logout</button>
            </div>
        </div>
    );
}

const NavbarLink = withRouter(function ({ text, to, location }) {
    const path = location.pathname;
    let classnames = "nav-item nav-link";
    classnames += path === to ? " active" : "";
    return (
        <Link className={classnames} to={to}>{text}</ Link>
    );
});

const mapStateToProps = state => ({
    user: state.auth.user
});


export default connect(mapStateToProps)(Navbar);
