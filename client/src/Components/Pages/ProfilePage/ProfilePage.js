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
            <div className="mb-4">
                <Sidemenu
                    active={currentPage}
                    items={["Randomizers", "Favorites", "Settings"]}
                    onActiveChanged={onActiveChanged} />
            </div>
            <PageSwitcher currentPageIndex={currentPage}>
                <PageSection index="0" component={MyRandomizers} />
                <PageSection index="1" component={Favorites} />
                <PageSection index="2" component={SettingsPage} />
            </PageSwitcher>


        </div >
    );
}
