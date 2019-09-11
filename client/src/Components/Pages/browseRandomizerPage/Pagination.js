import React, { useEffect, useMemo } from "react";
import { useWindowMedia } from "../../../Hooks/useWindowMedia";

const LEFT_ARROW = 37;
const RIGH_ARROW = 39;

export default function Pagination({ currentPage, totalPages, setPage }) {
    const mediumScreen = useWindowMedia("md");
    useEffect(() => {
        window.addEventListener("keydown", onKeyDown, false);
        function onKeyDown(e) {
            if (e.keyCode === LEFT_ARROW && currentPage !== 1) {
                setPage(currentPage - 1);
            } else if (e.keyCode === RIGH_ARROW && currentPage !== totalPages) {
                setPage(currentPage + 1);
            }
        }
        return () => {
            window.removeEventListener("keydown", onKeyDown, false);
        }
    }, [currentPage, totalPages, setPage]);


    const pageItems = useMemo(() => {
        const offset = mediumScreen ? 1 : 3;
        const arrayOfItems = [];
        for (let i = Math.max(currentPage - offset, 1); i <= Math.min(totalPages, currentPage + offset); i++) {
            arrayOfItems.push(
                <li key={i} className={"page-item" + (currentPage === i ? " active" : "")}>
                    <button type="button"
                        className="btn btn-sm page-link"
                        onClick={() => setPage(i)}>{i}</button>
                </li>
            );
        }
        return arrayOfItems;
    }, [currentPage, setPage, totalPages, mediumScreen]);


    return (
        <nav>
            <ul className="pagination">
                <li className="page-item"><button type="button"
                    disabled={currentPage === 1} className="btn btn-sm page-link"
                    onClick={() => setPage(currentPage - 1)}>Previous</button></li>
                <li className="page-item">
                    <button type="button" className="btn btn-sm page-link"
                        onClick={() => setPage(1)}>{"<<"}</button>
                </li>
                {pageItems}
                <li className="page-item">
                    <button type="button" className="btn btn-sm page-link"
                        onClick={() => setPage(totalPages)}>{">>"}</button>
                </li>
                <li className="page-item"><button type="button"
                    disabled={currentPage === totalPages}
                    className="btn btn-sm page-link"
                    onClick={() => setPage(currentPage + 1)}>Next</button></li>
            </ul>
        </nav>
    );
}
