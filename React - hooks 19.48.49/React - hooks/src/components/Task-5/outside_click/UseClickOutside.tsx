import { RefObject, useEffect } from "react";

type Handler = (event: MouseEvent) => void;

export const useOnClickOutside = <T extends HTMLElement>(ref: RefObject<T>, handler: Handler) => {
    useEffect(() => {
        const listener = (event: Event) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            console.log(event);
            handler(event as MouseEvent);
        };

        document.addEventListener("mousedown", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
        };
    }, [ref, handler]);
};
