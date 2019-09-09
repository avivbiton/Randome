import React from "react";
import RegisterForm from "../RegisterForm";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FeaturedItems from "../FeaturedItems";

function LandingPage() {

    const user = useSelector(state => state.auth.user);

    return (
        <>
            <div id="landing" className="container">
                <div className="d-flex flex-row" style={{ minHeight: "100vh" }}>
                    <div className="row">
                        <section className="col-md-6 pb-5 ml-lg-5">
                            <h1 className="display-3 text-primary mt-3">Randome</h1>
                            <p className="lead" style={{ fontSize: "2rem" }}>
                                Create, share and use a large variety of randomizers. Randome stores a collection of randomizers that will kick in your inspiration, give you some ideas or just make you laugh.

                        </p>
                            <div className="row">
                                <div className="col-md-6">
                                    <Link className="btn btn-primary btn-lg btn-block mb-2 mb-md-0"
                                        style={{ fontSize: "150%" }}
                                        to="/browse">Browse Collection</Link>
                                </div>
                                <div className="col-md-6">
                                    <Link className="btn btn-outline-secondary btn-lg btn-block"
                                        style={{ fontSize: "150%" }}
                                        to="/create">Create</Link>
                                </div>
                            </div>

                        </section>
                        <section className="col-md-5 d-flex justify-content-center justify-content-xl-end" style={{ maxHeight: "550px" }}>
                            {!user ?
                                <RegisterForm title="Join Our Community" />
                                :
                                null}
                        </section>
                    </div>
                </div>
            </div>
            <div className="container-fluid">

                <FeaturedItems />

            </div>
        </>
    );
}


export default LandingPage;
