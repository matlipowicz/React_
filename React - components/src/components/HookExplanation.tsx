import { useState } from "react";

type Pepole = {
    surname: string;
    age: number;
};
export const HookExplanation = () => {
    //! useState --> explanation by Adam
    const [people, setPeople] = useState<Pepole[]>([]);
    const [surname, setSurname] = useState("");
    const [age, setAge] = useState(0);
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setPeople((prev) => [...prev, { surname, age }]);
    };
    console.log(people);
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="surname">Surname</label>
            <input type="text" name="surname" onChange={(e) => setSurname(e.target.value)} />
            <label htmlFor="surname">Age</label>
            <input type="number" name="age" onChange={(e) => setAge(Number(e.target.value))} />
            <button type="submit">Send form</button>
        </form>
    );
};
