import { useRef } from "react";
import React from "react";

export const Form = () => {
    const surnameInputEl = useRef<HTMLInputElement | null>(null);
    const ageInputEl = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const data = {
            surname: surnameInputEl.current?.value,
            age: ageInputEl.current?.value,
        };
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="surname">Surname</label>
            <input ref={surnameInputEl} type="text" name="surname" />
            <label htmlFor="surname">Age</label>
            <input ref={ageInputEl} type="number" name="age" />
            <button type="submit">Send form</button>
        </form>
    );
};
