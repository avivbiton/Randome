import React from "react";

export default function MyRandomizers() {
    return (
        <div className="container-fluid">
            <h1>My Randomizers</h1>
            <table className="table table-responsive">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Created</th>
                        <th scope="col">Likes</th>
                        <th scope="col">Favorites</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <RandomizerRow
                        name="Game Idea Generator"
                        createDate="5 days ago"
                        likes={400}
                        favorites={210}
                        onView={() => console.log("view")}
                        onEdit={() => console.log("edit")}
                        onDelete={() => console.log("delete")}
                    />
                    <RandomizerRow
                        name="Game Idea Generator"
                        createDate="5 days ago"
                        likes={400}
                        favorites={210}
                        onView={() => console.log("view")}
                        onEdit={() => console.log("edit")}
                        onDelete={() => console.log("delete")}
                    />
                    <RandomizerRow
                        name="Game Idea Generator"
                        createDate="5 days ago"
                        likes={400}
                        favorites={210}
                        onView={() => console.log("view")}
                        onEdit={() => console.log("edit")}
                        onDelete={() => console.log("delete")}
                    />
                    <RandomizerRow
                        name="Game Idea Generator"
                        createDate="5 days ago"
                        likes={400}
                        favorites={210}
                        onView={() => console.log("view")}
                        onEdit={() => console.log("edit")}
                        onDelete={() => console.log("delete")}
                    />
                </tbody>
            </table>
        </div>
    );
}



function RandomizerRow({ name, createDate, likes, favorites, onView, onEdit, onDelete }) {

    return (
        <tr>
            <td>{name}r</td>
            <td>{createDate}</td>
            <td>{likes} Likes</td>
            <td>{favorites} Favorites</td>
            <td className="d-flex">
                <button title="View" className="btn far fa-eye icon-button" onClick={onView} />
                <button title="Edit" className="btn far fa-edit icon-button" onClick={onEdit} />
                <button title="Delete" className="btn far fa-trash-alt icon-button" onClick={onDelete} />
            </td>
        </tr>
    );
}