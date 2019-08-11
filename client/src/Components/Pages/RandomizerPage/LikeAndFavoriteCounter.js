import React, { useState, useCallback, useMemo } from "react";
import API from "../../../API/api";
import { useSelector } from "react-redux";
import "./RandomizerPage.css";
import toastr from "toastr";
import { toastrDefault } from "../../../config";

export default function LikeAndFavoriteCounter({ id, likeCount, favoriteCount }) {


    const [likes, setLikes] = useState(likeCount);
    const [favorites, setFavorites] = useState(favoriteCount);


    const accountMeta = useSelector(state => {
        if (state.auth.account === null) return null;
        return {
            likes: state.auth.account.likes,
            favorites: state.auth.account.favorites
        };
    });

    const hasLiked = useMemo(() => {
        if (accountMeta === null) return false;
        return accountMeta.likes.some(i => i === id);
    }, [id, accountMeta]);

    const hasFavorited = useMemo(() => {
        if (accountMeta === null) return false;
        return accountMeta.favorites.some(i => i === id);
    }, [id, accountMeta]);

    const onLikePressed = useCallback(async function onLikePressed() {
        try {
            if (accountMeta !== null) {
                if (hasLiked) {
                    setLikes(likes - 1);
                    accountMeta.likes = removeFromArray(accountMeta.likes, id);
                } else {
                    setLikes(likes + 1);
                    accountMeta.likes.push(id);
                }
                await API.randomizers.likeRandomizer(id);
            } else {
                toastr.error("Please login in and try again", "Login Required", toastrDefault);
            }
        } catch (error) {
            toastr.error("Opss, something went wrong, try again later.", "Error", toastrDefault);
        }

    }, [hasLiked, accountMeta, likes, id]);

    const onFavoritePressed = useCallback(async function onFavoritePressed() {
        try {
            if (accountMeta !== null) {
                if (hasFavorited) {
                    setFavorites(favorites - 1);
                    accountMeta.favorites = removeFromArray(accountMeta.favorites, id);
                } else {
                    setFavorites(favorites + 1);
                    accountMeta.favorites.push(id);
                }
                await API.randomizers.favoriteRandomizer(id);
            } else {
                toastr.error("Please login in and try again", "Login Required", toastrDefault);
            }
        } catch (error) {
            toastr.error("Opss, something went wrong, try again later.", "Error", toastrDefault);
        }

    }, [hasFavorited, accountMeta, favorites, id]);

    let likeButtonStyles = "btn shadow-sm px-4 btn-outline-info";
    likeButtonStyles += hasLiked ? " btn-like-active" : "";

    let favoriteButtonStyles = "btn shadow-sm px-4 btn-outline-softRed ml-4";
    favoriteButtonStyles += hasFavorited ? " btn-favorite-active" : "";

    return (
        <div className="d-inline-flex align-items-center">
            <button className={likeButtonStyles} onClick={onLikePressed}>
                <i className="far fa-thumbs-up mr-1"></i> {likes}
            </button>
            <button className={favoriteButtonStyles} onClick={onFavoritePressed}>
                <i className="far fa-heart mr-1"></i> {favorites}
            </button>
        </div>
    );
}

function removeFromArray(array, string) {
    return array.splice(array.indexOf(string), 1);
}