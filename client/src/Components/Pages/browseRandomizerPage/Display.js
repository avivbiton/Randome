import React from "react";
import LoadingSpinner from "../../LoadingSpinner";
import ItemDisplay from "../../ItemDisplay";


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
                            <div key={item._id} className="col-xl-2 col-lg-4 col-md-6 col mb-2 flex-grow-0 mx-auto mx-md-0">
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
