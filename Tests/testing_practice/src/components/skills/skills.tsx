import { SkillsProps } from "./skills.types";
import { useState, useEffect } from "react";

export const Skills = ({ skills }: SkillsProps) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setLoggedIn(true);
        }, 1200);
    }, []);

    return (
        <>
            <ul>
                {skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                ))}
            </ul>
            {loggedIn ? <button>Learn with us</button> : <button onClick={() => setLoggedIn(true)}>Login</button>}
        </>
    );
};
