import React, { Component } from "react";
import RegisterForm from "../RegisterForm";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class LandingPage extends Component {


    render() {
        return (
            <div className="container">
                <div className="row">
                    <section className="col-md-6">
                        <h1 className="display-3 text-primary mt-3">Randome</h1>
                        <p className="lead">
                            Create, share and use a large variety of randomizers. Randome stores a collection of pre-built randomizers that will kick in your inspiration, give you some ideas or just make you laugh.
                        </p>
                        <p className="lead">
                            Can't find what you are looking for? You can create your own randomizer. You choose if to keep it private, share it with the world or later on just delete it from existence. And it is all for free.
                        </p>
                        <div className="row">
                            <div className="col-md-6">
                                <Link className="btn btn-outline-primary btn-lg btn-block mb-2 mb-md-0" to="/browse">Browse Our Collection</Link>
                            </div>
                            <div className="col-md-6">
                                <button className="btn btn-outline-secondary btn-lg btn-block">Start Creating</button>
                            </div>
                        </div>
                    </section>
                    <section className="col-md-6 d-flex justify-content-end mt-4">
                        {!this.props.user ?
                            <RegisterForm title="Join Our Community" />
                            :
                            null}
                    </section>
                </div>
            </div>

        );
    }
}



const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(LandingPage);
