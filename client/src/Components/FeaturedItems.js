import React, { useState, useEffect } from "react";
import ItemDisplay from "./ItemDisplay";
import API from "../API/api";
import toastr from "toastr";
import { toastrDefault } from "../config";
import DragScroll from "./DragScroll";
import { useSpring, animated } from "react-spring";

import { SORT_TYPES } from "./Pages/browseRandomizerPage/Browse";

export default function FeaturedItems() {

    const [featured, setFeatured] = useState(null);
    const fadeProps = useSpring({
        from: { opacity: 0 },
        opacity: featured === null ? 0 : 1
    });

    useEffect(() => {
        async function fetchFeatured() {
            try {
                const data = await API.randomizers.fetch("", 0, SORT_TYPES.MOST_LIKES);
                setFeatured(data.docs);
            } catch (error) {
                toastr.error("There was an error receiving data from our servers. Some services may be unavailable.",
                    "Error", toastrDefault);
            }
        }
        fetchFeatured();
    }, []);

    if (featured === null) return <div></div>

    return (
        <animated.section style={fadeProps} className="container-fluid mt-4 mt-lg-0 dragscroll">
            <div className="text-center">
                <h1 className="border border-primary rounded py-4">Featured</h1>
                <hr />
                <DragScroll className="d-flex flex-row overflow-auto scrollbar dragscroll">
                    {featured.map(i =>
                        <div key={i._id} className="m-1">
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

                </DragScroll>
            </div>
        </animated.section>
    );
}