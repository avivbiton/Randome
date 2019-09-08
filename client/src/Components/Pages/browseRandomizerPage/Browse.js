import React, { useState, useEffect, useCallback, useMemo } from "react";
import Display from "./Display";
import API from "../../../API/api";
import queryString from "query-string";
import useReactRouter from "use-react-router";
import { useInput } from "../../../Hooks/formInput";
import Pagination from "./Pagination";


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
    const [pages, setPages] = useState(1);
    const [inputSearch, bindSearch] = useInput();

    const searchQuery = useMemo(() => {
        const query = queryString.parse(location.search);
        return {
            search: query.search,
            sort: query.sort,
            page: Math.max(1, query.page)
        }
    }, [location.search])

    useEffect(function setDefaultQuery() {
        if (searchQuery.page && searchQuery.sort && searchQuery.search) return;
        history.push({
            search: queryString.stringify({
                search: searchQuery.search || "",
                page: searchQuery.page || 1,
                sort: searchQuery.sort || SORT_TYPES.LATEST
            })
        });
    }, [searchQuery, history]);

    useEffect(() => {
        setItems(null);
        setError(null);
        async function fetchItems(search, page, sort) {
            try {
                const itemsData = await API.randomizers.fetch(search, page, sort);
                setItems(itemsData.docs);
                setPages(itemsData.totalPages);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchItems(searchQuery.search || "", searchQuery.page || 0, searchQuery.sort || SORT_TYPES.LATEST);
    }, [searchQuery]);


    const setSort = useCallback(function (sortType) {
        searchQuery.sort = sortType;
        history.push({ search: queryString.stringify(searchQuery) });
    }, [searchQuery, history]);

    const setSearch = useCallback(function () {
        searchQuery.search = inputSearch;
        history.push({ search: queryString.stringify(searchQuery) });
    }, [history, searchQuery, inputSearch]);


    const setPage = useCallback(function (pageNumber) {
        searchQuery.page = pageNumber;
        history.push({ search: queryString.stringify(searchQuery) });
    }, [history, searchQuery]);

    return (
        <div className="container-fluid min-vh-100 d-flex flex-column">
            <form className="d-inline-flex mt-4 align-items-center flex-wrap flex-lg-nowrap"
                onSubmit={e => {
                    e.preventDefault();
                    setSearch();
                }}>
                <input type="text" className="form-control form-control-lg large-input" placeholder="Search by Name"
                    {...bindSearch} />
                <button type="submit" className="btn btn-outline-primary btn-lg  ml-lg-2 mt-2 mt-lg-0">Search</button>
            </form>
            <p className="lead d-none d-xl-block m-0 pl-2">
                You may navigate using the arrow keys.
            </p>
            <table className="table table-borderless table-responsive mt-4 pb-2 border-bottom">
                <tbody>
                    <tr>
                        <td>
                            <button style={{ width: "12rem" }}
                                className={"btn btn-outline-secondary btn-lg mx-1" + (searchQuery.sort === SORT_TYPES.LATEST ? " active" : "")}
                                onClick={() => setSort(SORT_TYPES.LATEST)}>
                                Latest
                        </button>
                        </td>
                        <td>
                            <button style={{ width: "12rem" }}
                                className={"btn btn-outline-secondary btn-lg mx-1" +
                                    (searchQuery.sort === SORT_TYPES.MOST_LIKES ? " active" : "")}
                                onClick={() => setSort(SORT_TYPES.MOST_LIKES)}>
                                Most Liked
                        </button>
                        </td>
                        <td>
                            <button style={{ width: "12rem" }}
                                className={"btn btn-outline-secondary btn-lg mx-1" +
                                    (searchQuery.sort === SORT_TYPES.MOST_FAVORITES ? " active" : "")}
                                onClick={() => setSort(SORT_TYPES.MOST_FAVORITES)}>
                                Most Favorites
                        </button>
                        </td>
                        <td>
                            <button style={{ width: "12rem" }}
                                className={"btn btn-outline-secondary btn-lg mx-1" +
                                    (searchQuery.sort === SORT_TYPES.RECENTLY_UPDATED ? " active" : "")}
                                onClick={() => setSort(SORT_TYPES.RECENTLY_UPDATED)}>
                                Recently Updated
                        </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Display items={items} error={error} />
            <div className="align-self-center mt-auto">
                <Pagination
                    currentPage={searchQuery.page}
                    totalPages={pages}
                    setPage={setPage}
                />
            </div>
        </div >
    );
}

export default Browse;