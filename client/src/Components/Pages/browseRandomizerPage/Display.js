import React from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner";

export default function Display({ items, error }) {

    if (error)
        return (
            <div className="container-fluid">
                <div className="row text-center lead">
                    <div className="col">
                        {error}
                    </div>
                </div>
            </div>
        );


    if (!items)
        return (
            <div className="container">
                <div className="row text-center">
                    <div className="col">
                        <LoadingSpinner animation="grow" size="lg" />
                    </div>
                </div>
            </div>
        );

    return (
        <div className="container-fluid">
            <div className="row">
                {
                    items.length === 0
                        ?
                        <NoItemsFound />
                        :
                        items.map((item) =>
                            <div key={item._id} className="col-lg-2 m-1">
                                <ItemDisplay
                                    id={item._id}
                                    name={item.name}
                                    description={item.description}
                                    likes={item.meta.likes}
                                    favorites={item.meta.favorites}
                                    owner={item.owner.name} />
                            </div>
                        )
                }
            </div>
        </div>
    );
}

function NoItemsFound() {
    return (
        <div className="col text-center lead">
            No items found.
        </div>
    );
}

function ItemDisplay({ name, description, likes, favorites, id, owner }) {
    return (
        <div className="card shadow-sm h-100 border-info" style={{ width: "18rem", minHeight: "300px" }}>
            <div className="card-body d-flex flex-column">
                <h3 className="card-title">{name}</h3>
                <p className="lead">{description}</p>
                <Link className="btn btn-outline-info btn-block btn-lg mt-auto" to={`/randomizer/${id}`}>View</Link>
            </div>
            <div className="card-footer d-inline-flex align-items-center text-white bg-info">
                <i className="fas fa-thumbs-up fa-lg mx-2 like-icon"></i><span className="lead">{likes}</span>
                <i className="fas fa-heart fa-lg mx-2 heart-icon"></i><span className="lead">{favorites}</span>
                <div className="ml-auto">by {owner}</div>
            </div>
        </div>
    );
}