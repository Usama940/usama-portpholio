import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScroltoTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
        document.dispatchEvent(new Event("prerender-ready"));
    }, [pathname])

    return null;
}
