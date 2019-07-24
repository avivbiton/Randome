import React, { Component } from "react";

class LandingPage extends Component {
    render() {
        return (

            <div className="container">
                <h1 className="display-3 text-primary mt-3">Randome</h1>
                <div className="row">
                    <div className="col-md-6">
                        <p className="lead">
                            Create, share and use a large variety of randomizers. Randome stores a collection of pre-built randomizers that will kick in your inspiration, give you some ideas or just make you laugh.
                        </p>
                        <p className="lead">
                            Can't find what you are looking for? You can create your own randomizer. You choose if to keep it private, share it with the world or later on just delete it from existence. And it is all for free.
                        </p>
                        <div className="row">
                            <div className="col-md-6">
                                <button className="btn btn-outline-primary btn-lg btn-block mb-2 mb-md-0">Get Started</button>
                            </div>
                            <div className="col-md-6">
                                <button className="btn btn-outline-secondary btn-lg btn-block">Create one yourself</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <RegisterForm />
                    </div>
                </div>
            </div>

        );
    }
}

function RegisterForm() {
    return (
        <form>
            <div className="card text-center shadow mt-2 mb-4 mt-md-0 ml-auto w-100 w-md-75">
            <h3 className="card-header bg-primary text-white">Join Our Community</h3>
                <div className="card-body">
                    <div className="card-text">
                        <input className="form-control large-input" type="email" name="email" placeholder="Email" />

                        <input className="form-control large-input mt-3"
                            type="password" name="password" placeholder="Password" />
                        <input className="form-control large-input mt-3"
                            type="password" name="passwordConfirm" placeholder="Confirm Password" />
                        <button className="btn btn-primary btn-block mt-3">Register</button>
                    </div>
                </div>
            </div>
        </form>
    );
}



export default LandingPage;
