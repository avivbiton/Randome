import React, { Component } from "react";
import RegisterForm from "../RegisterForm";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FeaturedItems from "../FeaturedItems";
class LandingPage extends Component {


    render() {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <section className="col-md-6 min-vh-100">
                            <h1 className="display-3 text-primary mt-3">Randome</h1>
                            <p className="lead" style={{ fontSize: "2rem" }}>
                                Create, share and use a large variety of randomizers. Randome stores a collection of randomizers that will kick in your inspiration, give you some ideas or just make you laugh.
                                Start using or create one yourself!
                        </p>
                            <div className="row">
                                <div className="col-md-6">
                                    <Link className="btn btn-outline-primary btn-lg btn-block mb-2 mb-md-0" to="/browse">Browse Our Collection</Link>
                                </div>
                                <div className="col-md-6">
                                    <Link className="btn btn-outline-secondary btn-lg btn-block" to="/create">Start Creating</Link>
                                </div>
                            </div>
                        </section>
                        <section className="col-md-6 d-flex justify-content-center justify-content-lg-end" style={{ maxHeight: "550px" }}>
                            {!this.props.user ?
                                <RegisterForm title="Join Our Community" />
                                :
                                null}
                        </section>
                    </div>
                </div>
                <div className="container-fluid">

                    <FeaturedItems />

                </div>
            </>
        );
    }
}



const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(LandingPage);
