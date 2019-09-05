import React from "react";
import { Link } from "react-router-dom";

export default function ItemDisplay({ name, description, likes, favorites, id, owner }) {
    return (
        <div className="card shadow-sm h-100 border-info">
            <div className="card-body d-flex flex-column">
                <h3 className="card-title">{name}</h3>
                <p className="lead">{description.substr(0, 100)}</p>
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