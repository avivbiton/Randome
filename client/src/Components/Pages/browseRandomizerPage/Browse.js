import React, { useState, useEffect } from "react";
import Display from "./Display";
import API from "../../../API/api";

export default function Browse() {

    const [latestItems, setItems] = useState(null);
    const [sortType, setSort] = useState("latest");

    useEffect(() => {
        fetchLatest();
    }, [sortType]);

    async function fetchLatest() {
        setItems(await API.randomizers.fetchLatest());
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h4>Sort By</h4>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button className="btn btn-outline-info btn-lg mx-1">Latest</button>
                    <button className="btn btn-outline-info btn-lg mx-1">Most Likes</button>
                    <button className="btn btn-outline-info btn-lg mx-1">Most Favorites</button>
                    <button className="btn btn-outline-info btn-lg mx-1">Recently Updated</button>
                    <hr />
                </div>
            </div>
            <Display sortType={sortType} items={latestItems} />
        </div>
    );
}


