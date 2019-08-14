import React, { useState, useEffect, useCallback } from "react";
import useReactRouter from "use-react-router";
import queryString from "query-string";

import "./Profie.css";
import Sidemenu from "./Sidemenu";
import PageSwitcher from "./PageSwitcher";
import PageSection from "./PageSection";
import MyRandomizers from "./MyRandomizers";
import Favorites from "./Favorites";
import SettingsPage from "./SettingsPage";

export default function ProfilePage() {
    const { history, location } = useReactRouter();
    const [currentPage, setPage] = useState(() => {
        return queryString.parse(location.search).index || 0;
    });

    useEffect(() => {
        setPage(queryString.parse(location.search).index || 0);
    }, [location.search]);

    const onActiveChanged = useCallback(index => {
        const currentQuery = queryString.parse(location.search);
        currentQuery.index = index;
        history.push({ search: queryString.stringify(currentQuery) });
    }, [history, location.search]);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3 float-left pr-4">
                    <Sidemenu
                        active={currentPage}
                        items={["My Randomizers", "Favorites", "Settings", "Account"]}
                        onActiveChanged={onActiveChanged} />
                </div>
                <div className="col-md-8">
                    <PageSwitcher currentPageIndex={currentPage}>
                        <PageSection index="0" component={MyRandomizers} />
                        <PageSection index="1" component={Favorites} />
                        <PageSection index="2" component={SettingsPage} />
                    </PageSwitcher>
                </div>
            </div>
        </div>
    );
}
