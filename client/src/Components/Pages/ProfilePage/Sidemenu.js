import React, { useState, useCallback } from "react";

export default function Sidemenu({ items, onActiveChanged }) {

    const [active, setActive] = useState(0);
    const onButtonClicked = useCallback(index => {
        setActive(index);
        if(onActiveChanged !== null && typeof onActiveChanged !== "undefined") {
            onActiveChanged(index);
        }
    }, [setActive]);

    return (
        <div className="card">
            <div className="card-header text-center d-md-block d-none">
                <h4>Your Profile</h4>
            </div>
            <ul className="list-group">
                {items.map((i, index) => {
                    let classNames = "btn menu-item";
                    if (active === index) {
                        classNames += " menu-hover";
                    }
                    return (
                        <button key={index} onClick={() => onButtonClicked(index)} className={classNames}>{i}</button>
                    );
                })}
            </ul>
        </div>
    );
}
