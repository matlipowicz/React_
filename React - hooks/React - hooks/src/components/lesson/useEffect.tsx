import { useEffect, useState } from "react";
import React from "react";
export const Effect = () => {
    const [timer, setTimer] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(function (prev) {
                return prev + 1;
            }); //inkrementacja licznika
        }, 1000);

        return () => {
            clearInterval(interval); //czyszczenie interwału
        };
    }, []); // pusta tablica zależności kod wykonuje się tylko przy pierwszym wyrenderowaniu

    return <div>App run {timer} seconds</div>;
};
