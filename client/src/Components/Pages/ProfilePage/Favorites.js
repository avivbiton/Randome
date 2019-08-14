import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useReactRouter from "use-react-router";
import LoadingSpinner from "../../LoadingSpinner";
import API from "../../../API/api";
import toastr from "toastr";
import { toastrDefault } from "../../../config";

export default function Favorites() {

    const [favorites, setFavorites] = useState(null);
    const { history } = useReactRouter();

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


    const onViewPressed = useCallback(id => {
        history.push(`/randomizer/${id}`);
    }, [history]);

    if (favorites === null) return <div className="d-flex justify-content-center"><LoadingSpinner /></div>;

    if (favorites.length === 0)
        return (
            <div className="container-fluid d-flex justify-content-center">
                <p className="lead">You don't have any favorites yet.
                <br />
                    Browse our <Link to="/browse">Collection</Link> to find some.
                </p>
            </div>
        );

    return (
        <div className="container-fluid">
            <h1>Favorites</h1>
            <hr />
            {
                favorites.map((f, index) =>
                    <FavoriteItem
                        key={index}
                        name={f.name}
                        description={f.description}
                        owner={f.owner.name}
                        likes={f.meta.likes}
                        favorites={f.meta.favorites}
                        onView={() => onViewPressed(f._id)}
                    />
                )
            }
        </div>
    );
}


function FavoriteItem({ name, description, likes, favorites, owner, onView }) {
    return (
        <div className="card shadow-sm mt-2">
            <div className="card-body d-flex flex-column">
                <h3 className="card-title">{name}</h3>
                <p className="lead">{description}</p>
                <button className="btn btn-lg btn-outline-info ml-auto" onClick={onView}>View</button>
            </div>
            <div className="card-footer d-inline-flex align-items-center text-white bg-info">
                <i className="fas fa-thumbs-up fa-lg mx-2 like-icon"></i><span className="lead">{likes}</span>
                <i className="fas fa-heart fa-lg mx-2 heart-icon"></i><span className="lead">{favorites}</span>
                <div className="ml-auto">by {owner}</div>
            </div>
        </div>
    );
}