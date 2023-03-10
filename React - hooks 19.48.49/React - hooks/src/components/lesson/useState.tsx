import React from "react";
import { useState } from "react";

interface Person {
    id: number;
    surname: string;
    age: number;
}

export const Hooks = () => {
    const [persons, setPeoples] = useState<Person[]>([]);
    const [surname, setSurname] = useState("");
    const [age, setAge] = useState(0);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setPeoples((prev) => {
            console.log(prev);
            return [...prev, { id: prev.length, surname, age }];
        });
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="surname">Surname</label>
                <input type="text" name="surname" onChange={(e) => setSurname(e.target.value)} />
                <label htmlFor="surname">Age</label>
                <input type="number" name="age" onChange={(e) => setAge(Number(e.target.value))} />
                <button type="submit">Send form</button>
            </form>
            <div>
                {persons.map((el) => {
                    return (
                        <p key={el.id}>
                            {el.surname}
                            <span>{el.age}</span>
                        </p>
                    );
                })}
            </div>
        </>
    );
};
