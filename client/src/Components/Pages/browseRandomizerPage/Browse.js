import React, { useState, useEffect } from "react";
import Display from "./Display";
import API from "../../../API/api";

const SORT_TYPES = {
    LATEST: "createdAt",
    MOST_LIKES: "meta.likes",
    MOST_FAVORITES: "meta.favorites",
    RECENTLY_UPDATED: "updatedAt"
};

export default function Browse() {

    const [items, setItems] = useState(null);
    const [sortType, setSort] = useState(SORT_TYPES.LATEST);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        setItems(null);
        fetchItems();
    }, [sortType]);

    async function fetchItems() {
        setItems(await API.randomizers.fetch(0, sortType));
    }
    return (
        <div className="container-fluid">
            <div className="row mt-4">
                <div className="col">
                    <input type="text" className="form-control form-control-lg large-input" placeholder="filter"
                        onChange={e => setFilter(e.target.value)} />
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <button className="btn btn-outline-info btn-lg mx-1"
                        onClick={() => setSort(SORT_TYPES.LATEST)}>
                        Latest
                    </button>
                    <button className="btn btn-outline-info btn-lg mx-1"
                        onClick={() => setSort(SORT_TYPES.MOST_LIKES)}>
                        Most Likes
                    </button>
                    <button className="btn btn-outline-info btn-lg mx-1"
                        onClick={() => setSort(SORT_TYPES.MOST_FAVORITES)}>
                        Most Favorites
                    </button>
                    <button className="btn btn-outline-info btn-lg mx-1"
                        onClick={() => setSort(SORT_TYPES.RECENTLY_UPDATED)}>
                        Recently Updated
                    </button>
                    <hr />
                </div>
            </div>
            <Display filter={filter} items={items} />
        </div >
    );
}


