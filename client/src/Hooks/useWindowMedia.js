import { useState, useEffect } from "react";

const mapSizeToMedia = {
    sm: "(max-width: 576px)",
    md: "(max-width: 768px)",
    lg: "(max-width: 992px)",
    xl: "(max-width: 1200px)",
    xxl: "(max-width: 1800px)"
}

export const useWindowMedia = (size) => {
    const [match, setMatch] = useState(false);

    useEffect(() => {
        const mediaString = mapSizeToMedia[size];
        if (typeof mediaString === "undefined") return console.error(`useWindowMedia received invalid size: ${size}`);
        setMatch(window.matchMedia(mediaString).matches);
        function onResize() {
            console.log("resize");
            setMatch(window.matchMedia(mediaString).matches);
        }
        window.addEventListener("resize", onResize, false);
        return () => window.removeEventListener("resize", onResize, false);
    }, [size]);

    return match;
}