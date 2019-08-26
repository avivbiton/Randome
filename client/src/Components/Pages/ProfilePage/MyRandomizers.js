import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import API from "../../../API/api";
import toastr from "toastr";
import { toastrDefault } from "../../../config";
import LoadingSpinner from "../../LoadingSpinner";
import useReactRouter from "use-react-router";
import Moment from "react-moment";
import DeleteModal from "./DeleteModal";
import useModal from "../../../Hooks/useModal";


export default function MyRandomizers() {

    const [randomizers, setRandomizers] = useState(null);
    const [displayModal, bindModal] = useModal();
    const { history } = useReactRouter();

    useEffect(() => {
        async function fetch() {
            try {
                const data = await API.randomizers.fetchMyRandomizers();
                setRandomizers(data);
            } catch (error) {
                toastr.error("Could not retrive data, please try again later.", "Error", toastrDefault);
            }
        }
        fetch();
    }, []);

    const onViewClicked = useCallback(id => {
        history.push(`/randomizer/${id}`);
    }, [history]);

    const onEditClicked = useCallback(id => {
        history.push(`/randomizer/${id}/edit`);
    }, [history]);

    const onDeleteClicked = useCallback((id, name) => {
        displayModal(true, { id, name });
    }, [displayModal]);


    const onDeleteEvent = useCallback(id => {
        setRandomizers(randomizers.filter(r => r._id !== id));
    }, [randomizers]);

    if (randomizers === null) return <LoadingSpinner className="d-flex mx-auto" size="lg" animation="grow" />;


    if (randomizers.length === 0)
        return (
            <div className="container">
                <div className="text-center lead">
                    You don't have any randomizers yet.
                    <br />
                    You can <Link to="/create">create one</Link> right now.
                </div>
            </div>
        );
    return (
        <div className="container-fluid">
            <h1>My Randomizers</h1>
            <DeleteModal
                {...bindModal}
                onDelete={onDeleteEvent}
            />
            <table className="table table-responsive">
                <thead>
                    <tr className="text-center">
                        <th scope="col">Name</th>
                        <th scope="col">Created</th>
                        <th scope="col">Likes</th>
                        <th scope="col">Favorites</th>
                        <th scope="col">Private</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        randomizers.map((r, index) =>
                            <RandomizerRow key={index}
                                name={r.name}
                                createDate={r.createdAt}
                                likes={r.meta.likes}
                                favorites={r.meta.favorites}
                                isPrivate={r.private}
                                onView={() => onViewClicked(r._id)}
                                onEdit={() => onEditClicked(r._id)}
                                onDelete={() => onDeleteClicked(r._id, r.name)}
                            />
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}



function RandomizerRow({ name, createDate, likes, favorites, isPrivate, onView, onEdit, onDelete }) {

    return (
        <tr className="text-center">
            <td>{name}</td>
            <td><Moment fromNow>{createDate}</Moment></td>
            <td>{likes}</td>
            <td>{favorites}</td>
            <td>{isPrivate === true ?
                <i className="fas fa-check text-success" />
                :
                <i className="fas fa-times text-danger"></i>}
            </td>
            <td className="d-flex">
                <button title="View" className="btn far fa-eye icon-button" onClick={onView} />
                <button title="Edit" className="btn far fa-edit icon-button" onClick={onEdit} />
                <button title="Delete" className="btn far fa-trash-alt icon-button" onClick={onDelete} />
            </td>
        </tr>
    );
}