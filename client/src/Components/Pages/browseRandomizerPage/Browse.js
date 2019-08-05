import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Display from "./Display";
import API from "../../../API/api";
import queryString from "query-string";

const SORT_TYPES = {
    LATEST: "createdAt",
    MOST_LIKES: "meta.likes",
    MOST_FAVORITES: "meta.favorites",
    RECENTLY_UPDATED: "updatedAt"
};

function Browse({ location, history }) {

    const [items, setItems] = useState(null);
    const [filter, setFilter] = useState("");
    const [error, setError] = useState(null);

    useEffect(function setDefaultQuery() {
        const currentQuery = queryString.parse(location.search);
        if (currentQuery.page && currentQuery.sort) return;
        history.push({
            search: queryString.stringify({
                page: currentQuery.page || 0,
                sort: currentQuery.sort || SORT_TYPES.LATEST
            })
        });
    }, []);

    useEffect(() => {
        const query = queryString.parse(location.search);
        if (!query.page || !query.sort) return;
        setItems(null);
        setError(null);
        fetchItems(query.page, query.sort);
    }, [location.search]);


    async function fetchItems(page, sort) {
        const itemsData = await API.randomizers.fetch(page, sort);
        if (itemsData) {
            setItems(itemsData);
        } else {
            setError("Could not retrive items, Please try again later.");
        }
    }


    function setSort(sortType) {
        const currentQuery = queryString.parse(location.search);
        currentQuery.sort = sortType;
        history.push({ search: queryString.stringify(currentQuery) });
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
            <Display filter={filter} items={items} error={error} />
        </div >
    );
}


export default withRouter(Browse);