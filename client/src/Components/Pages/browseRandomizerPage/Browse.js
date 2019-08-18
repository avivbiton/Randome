import React, { useState, useEffect, useCallback } from "react";
import Display from "./Display";
import API from "../../../API/api";
import queryString from "query-string";
import useReactRouter from "use-react-router";
import { useInput } from "../../../Hooks/formInput";

export const SORT_TYPES = {
    LATEST: "createdAt",
    MOST_LIKES: "meta.likes",
    MOST_FAVORITES: "meta.favorites",
    RECENTLY_UPDATED: "updatedAt"
};

function Browse() {
    const { history, location } = useReactRouter();

    const [items, setItems] = useState(null);
    const [error, setError] = useState(null);
    const [search, bindSearch] = useInput();

    useEffect(function setDefaultQuery() {
        const currentQuery = queryString.parse(location.search);
        if (currentQuery.page && currentQuery.sort && currentQuery.search) return;
        history.push({
            search: queryString.stringify({
                search: currentQuery.search || "",
                page: currentQuery.page || 0,
                sort: currentQuery.sort || SORT_TYPES.LATEST
            })
        });
        // should execute only once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const fetchItems = useCallback((search, page, sort) => {
        async function fetch() {
            try {
                const itemsData = await API.randomizers.fetch(search, page, sort);
                setItems(itemsData);
            } catch (error) {
                setError(error.message);
            }
        }

        fetch();
    }, []);

    useEffect(() => {
        const query = queryString.parse(location.search);
        setItems(null);
        setError(null);
        fetchItems(query.search || "", query.page || 0, query.sort || SORT_TYPES.LATEST);
    }, [location.search, fetchItems]);



    const setSort = useCallback(function (sortType) {
        const currentQuery = queryString.parse(location.search);
        currentQuery.sort = sortType;
        history.push({ search: queryString.stringify(currentQuery) });
    }, [location.search, history]);

    const setSearch = useCallback(function () {
        const currentQuery = queryString.parse(location.search);
        currentQuery.search = search;
        history.push({ search: queryString.stringify(currentQuery) });
    }, [history, location.search, search]);

    return (
        <div className="container-fluid">
            <form className="d-inline-flex mt-4 align-items-center flex-wrap flex-lg-nowrap"
                onSubmit={e => {
                    e.preventDefault();
                    setSearch();
                }}>
                <input type="text" className="form-control form-control-lg large-input" placeholder="Name or description"
                    {...bindSearch} />
                <button type="submit" className="btn btn-outline-primary btn-lg  ml-lg-2 mt-2 mt-lg-0">Search</button>
            </form>
            <table className="table table-borderless table-responsive mt-4 pb-2 border-bottom">
                <tbody>
                    <tr>
                        <td>
                            <button style={{ width: "12rem" }} className="btn btn-outline-info btn-lg mx-1"
                                onClick={() => setSort(SORT_TYPES.LATEST)}>
                                Latest
                        </button>
                        </td>
                        <td>
                            <button style={{ width: "12rem" }} className="btn btn-outline-info btn-lg mx-1"
                                onClick={() => setSort(SORT_TYPES.MOST_LIKES)}>
                                Most Liked
                        </button>
                        </td>
                        <td>
                            <button style={{ width: "12rem" }} className="btn btn-outline-info btn-lg mx-1"
                                onClick={() => setSort(SORT_TYPES.MOST_FAVORITES)}>
                                Most Favorites
                        </button>
                        </td>
                        <td>
                            <button style={{ width: "12rem" }} className="btn btn-outline-info btn-lg mx-1"
                                onClick={() => setSort(SORT_TYPES.RECENTLY_UPDATED)}>
                                Recently Updated
                        </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <Display filter={""} items={items} error={error} />
        </div >
    );
}


export default Browse;