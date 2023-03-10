import React from "react";
import { useRef } from "react";
import { useOnClickOutside } from "../outside_click/UseClickOutside";

export const ExampleEvent = () => {
    const ref = useRef(null);

    const handleClickOutside = () => {
        console.log("clicked outside");
    };

    const handleClickInside = () => {
        console.log("clicked inside");
    };

    useOnClickOutside(ref, handleClickOutside);

    return <button ref={ref} onClick={handleClickInside} style={{ width: 200, height: 200, background: "cyan" }} />;
};
