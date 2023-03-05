import React from "react";
import { useRef } from "react";
import { Child } from "../bus-table_list";

type ChildProps = {
    setChild: React.Dispatch<React.SetStateAction<Child[]>>;
};

export const Form = ({ setChild }: ChildProps) => {
    const nameInput = useRef<HTMLInputElement | null>(null);
    const ageInput = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const data = {
            name: nameInput.current?.value || "",
            age: Number(ageInput.current?.value),
        };

        setChild((prev) => {
            console.log([...prev, data]);
            return [...prev, data];
        });
    };
    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <div className="child-table__input-name">
                    <label htmlFor="name">Name</label>
                    <input ref={nameInput} type="text" name="name" placeholder="Child name"></input>
                </div>
                <div className="child-table__input-name">
                    <label htmlFor="age">Age</label>
                    <input ref={ageInput} type="number" name="age" placeholder="Child age"></input>
                </div>

                <button type="submit">Add child</button>
            </form>
        </>
    );
};
