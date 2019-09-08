import React, { useCallback } from "react";

export default function Sidemenu({ active, items, onActiveChanged }) {

    const onButtonClicked = useCallback(index => {
        if (onActiveChanged !== null && typeof onActiveChanged !== "undefined") {
            onActiveChanged(index);
        }
    }, [onActiveChanged]);

    return (
        <ul className="nav nav-tabs">
            {items.map((i, index) => {
                let classNames = "btn nav-link";
                // eslint-disable-next-line
                if (active == index) {
                    classNames += " active";
                }
                return (
                    <li key={index} className="nav-item">
                        <button onClick={() => onButtonClicked(index)} className={classNames}>{i}</button>
                    </li>
                );
            })}
        </ul>
    );
}
