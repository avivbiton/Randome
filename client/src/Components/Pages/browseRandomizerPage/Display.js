import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner";

export default function Display({ items, filter, error }) {

    const [displayItems, setDisplayItems] = useState(items);
    function onFilterChange() {
        if (!items) return;
        const filterResult = items.filter(i => i.name.toLowerCase().includes(filter.toLowerCase()));
        setDisplayItems(filterResult);
    }

    useEffect(onFilterChange, [items, filter]);

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


    if (!displayItems || !items)
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
                    displayItems.length === 0
                        ?
                        <NoItemsFound />
                        :
                        displayItems.map((item) =>
                            <div key={item._id} className="col-md-2 m-1">
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
        <div className="card shadow-sm h-100" style={{ width: "18rem", minHeight: "300px" }}>
            <h5 className="card-header bg-info text-white">{name}</h5>
            <div className="card-body d-flex flex-column">
                {description}
                <br />
                <Link className="btn btn-primary btn-block btn-lg mt-auto" to={`/randomizer/${id}`}>View</Link>
            </div>
            <div className="card-footer">
                <i className="fas fa-thumbs-up fa-lg mx-2"></i><span className="lead">{likes}</span>
                <i className="fas fa-heart fa-lg mx-2"></i><span className="lead">{favorites}</span>
                <div className="mr-auto">by {owner}</div>
            </div>
        </div>
    );
}