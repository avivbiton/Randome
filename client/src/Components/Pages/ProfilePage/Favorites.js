import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../LoadingSpinner";
import API from "../../../API/api";
import toastr from "toastr";
import { toastrDefault } from "../../../config";

export default function Favorites() {

    const [favorites, setFavorites] = useState(null);

    useEffect(() => {
        async function fetchFavorites() {
            try {
                const data = await API.randomizers.fetchByMeta("favorites");
                setFavorites(data);
            } catch (error) {
                toastr.error("Sorry, something went wrong, please try again later.", "Error", toastrDefault);
            }
        }
        fetchFavorites();
    }, []);

    if (favorites === null) return <LoadingSpinner />;
    console.log(favorites);
    return (
        <div className="container-fluid">
            <h1>Favorites</h1>
        </div>
    );
}
