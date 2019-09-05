import React from "react";
import LoadingSpinner from "../../LoadingSpinner";
import ItemDisplay from "../../ItemDisplay";
import { useSpring, animated } from "react-spring";


export default function Display({ items, error }) {

    const fadeProps = useSpring({
        from: { opacity: 0 },
        opacity: !items ? 0 : 1,
        config: {
            duration: 250
        }
    });

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
        <animated.div style={fadeProps} className="container-fluid">
            <div className="row">
                {
                    items.length === 0
                        ?
                        <NoItemsFound />
                        :
                        items.map((item) =>
                            <div key={item._id} className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-12 mb-2">
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
        </animated.div>
    );
}

function NoItemsFound() {
    return (
        <div className="col text-center lead">
            No items found.
        </div>
    );
}
