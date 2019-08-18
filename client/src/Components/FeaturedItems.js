import React, { useState, useEffect } from "react";
import ItemDisplay from "./ItemDisplay";
import LoadingSpinner from "./LoadingSpinner";
import API from "../API/api";
import toastr from "toastr";
import { toastrDefault } from "../config";

import { SORT_TYPES } from "./Pages/browseRandomizerPage/Browse";

export default function FeaturedItems() {

    const [featured, setFeatured] = useState(null);

    useEffect(() => {
        async function fetchFeatured() {
            try {
                const data = await API.randomizers.fetch("", 0, SORT_TYPES.MOST_LIKES);
                data.splice(6, data.length - 6);
                setFeatured(data);
            } catch (error) {
                toastr.error("There was an error receiving data from our servers. Some services may be unavailable.",
                    "Error", toastrDefault);
            }
        }
        fetchFeatured();
    }, []);

    if (featured === null) return <div className="d-flex justify-content-center"><LoadingSpinner size="lg" /></div>

    return (
        <section className="container-fluid mt-4 mt-lg-0">
            <div className="text-center">
                <h1 className="bg-primary text-white py-4 rounded">Featured</h1>
                <hr />
                <section className="row">
                    {featured.map(i =>
                        <div key={i._id} className="col-xl-2 col-lg-4 col-md-6 col mt-4 mt-xl-0">
                            <ItemDisplay
                                name={i.name}
                                description={i.description}
                                id={i._id}
                                likes={i.meta.likes}
                                favorites={i.meta.favorites}
                                owner={i.owner.name}
                            />
                        </div>
                    )}
                </section>
            </div>
        </section>
    );
}