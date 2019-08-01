import React, { useState, useEffect } from "react";
import Display from "./Display";
import API from "../../../API/api";

const SORT_TYPES = {
    LATEST: "latest",
    MOST_LIKES: "mostLikes",
    MOST_FAVORITES: "mostFavorites",
    RECENTLY_UPDATED: "recentlyUpdated"
};

export default function Browse() {

    const [latestItems, setItems] = useState(null);
    const [sortType, setSort] = useState(SORT_TYPES.LATEST);

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
                    <button className="btn btn-outline-info btn-lg mx-1" onClick={() => setSort(SORT_TYPES.LATEST)}>
                        Latest
                    </button>
                    <button className="btn btn-outline-info btn-lg mx-1" onClick={() => setSort(SORT_TYPES.MOST_LIKES)}>
                        Most Likes
                    </button>
                    <button className="btn btn-outline-info btn-lg mx-1"
                        onClick={() => setSort(SORT_TYPES.MOST_FAVORITES)}>
                        Most Favorites
                    </button>
                    <button className="btn btn-outline-info btn-lg mx-1" onClick={() => setSort(SORT_TYPES.RECENTLY_UPDATED)}>
                        Recently Updated
                    </button>
                    <hr />
                </div>
            </div>
            <Display items={latestItems} />
        </div >
    );
}


