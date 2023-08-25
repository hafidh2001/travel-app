import moment from "moment";
import { useEffect, useState } from "react";
import _configs from "src/utils/config.json";

export const configs = _configs;

export const useScrollWindow = () => {
    const [scrollPosition, setScrollPosition] = useState<number>(window.scrollY);
    useEffect(() => {
        window.onscroll = () => {
            setScrollPosition(window.scrollY);
        };
    }, []);
    return scrollPosition;
};

export const useSizeWindow = () => {
    const [widthWindow, setWidthWindow] = useState<number>(window.innerWidth);
    useEffect(() => {
        window.onresize = () => {
            setWidthWindow(window.innerWidth);
        };
    }, []);
    return widthWindow;
};

export const scrollToTarget = (ref: any) => {
    window.scrollTo({
        top: ref.offsetTop,
        left: 0,
        behavior: "smooth",
    });
};