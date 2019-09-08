import React, { useCallback } from "react";

export default function Sidemenu({ active, items, onActiveChanged }) {

    const onButtonClicked = useCallback(index => {
        if (onActiveChanged !== null && typeof onActiveChanged !== "undefined") {
            onActiveChanged(index);
        }
    }, [onActiveChanged]);

    return (
        <div className="card border border-primary">
            <div className="card-header text-center d-md-block d-none bg-primary text-white">
                <h4>Your Profile</h4>
            </div>
            <ul className="list-group">
                {items.map((i, index) => {
                    let classNames = "btn btn-outline-secondary menu-item";
                    // eslint-disable-next-line
                    if (active == index) {
                        classNames += " active";
                    }
                    return (
                        <button key={index} onClick={() => onButtonClicked(index)} className={classNames}>{i}</button>
                    );
                })}
            </ul>
        </div>
    );
}
