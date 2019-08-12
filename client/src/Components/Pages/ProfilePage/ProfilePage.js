import React, { useState, useCallback } from "react";

import "./Profie.css";
import Sidemenu from "./Sidemenu";
import PageSwitcher from "./PageSwitcher";
import PageSection from "./PageSection";
import MyRandomizers from "./MyRandomizers";
import Favorites from "./Favorites";

export default function ProfilePage() {
    const [currentPage, setPage] = useState(0);

    const onActiveChanged = useCallback(index => {
        setPage(index);
    }, [setPage]);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3 float-left pr-4">
                    <Sidemenu
                        items={["My Randomizers", "Favorites", "Settings", "Account"]}
                        onActiveChanged={onActiveChanged} />
                </div>
                <div className="col-md-8">
                    <PageSwitcher currentPageIndex={currentPage}>
                        <PageSection index={0} component={MyRandomizers} />
                        <PageSection index={1} component={Favorites} />
                    </PageSwitcher>
                </div>
            </div>
        </div>
    );
}
