import React from "react";
import { Link } from "react-router-dom";

export default function Display({ sortType, items }) {



    function ItemDisplay({ name, description, likes, favorites, id }) {
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
                </div>
            </div>
        );
    }


    if (!items) return <div>Loading...</div>;
    return (
        <div className="container-fluid">
            <div className="row">
                {items.map((item) =>
                    <div key={item._id} className="col-md-2 m-1">
                        <ItemDisplay
                            id={item._id}
                            name={item.name}
                            description={item.description}
                            likes={item.meta.likes}
                            favorites={item.meta.favorites} />
                    </div>)}
            </div>
        </div>
    );
}
