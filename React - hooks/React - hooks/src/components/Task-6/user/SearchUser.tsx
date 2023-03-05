import { useState, useEffect, useRef, RefObject } from "react";
import { cards } from "../../../mocks/cards";

//! Do strony na której znajdują się karty z danymi klientów (Cards - zestaw zadań do komponentów) dodaj formularz u góry który umożliwi wyszukiwanie klienta po jego imieniu.

//! Podpowiedź
//* Do realizacji zadania przyda się osobny stan, który przechowa frazę wyszukiwaną i filtr

// {
//     id: 1,
//     imgSrc: "https://images.unsplash.com/photo-1661869535393-872dea2d9f8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
//     name: "Zigniew",
//     surname: "Herbert",
//     street: "TestStreet",
//     postCode: "00-123",
//     town: "Town",
//     subRegion: "Region",
//     phoneNumber: "+48 123 456 789",
// },

export const SearchUser = ({ setSearchInput }: { setSearchInput: React.Dispatch<React.SetStateAction<string>> }) => {
    return (
        <>
            <form>
                <label htmlFor="filter-card">Find User</label>
                <input onChange={(e) => setSearchInput(e.target.value)} type="text" name="filter-card"></input>
            </form>
        </>
    );
};
