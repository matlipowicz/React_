import React from "react";
import { useState, useRef } from "react";
import { Table } from "./child_table/Table";
import { Form } from "./form/Form";

// ## Zadanie 1 (useState, useRef)
// Stwórz widok zawierający tabelkę z danymi dzieci, które wchodzą do autobusu oraz formularz do wypełniania przez kierowcę. Stan początkowy przekazywany do hooka useState wygląda następująco
// ```js
//     {
//             kids: [{
//                 name: "Barbara",
//                 age: 10,
//             },
//             {
//                 name: "Katarzyna",
//                 age: 12,
//             },
//             ]
//         }
// ```
// Formularz powinien posiadać pola name i age oraz pole submit.

export interface Child {
    name: string;
    age: number;
}
export type Children = {
    kids: Child[];
};

const initialState = {
    kids: [
        {
            name: "Barbara",
            age: 10,
        },
        {
            name: "Katarzyna",
            age: 12,
        },
    ],
};

export const BusTable = () => {
    const [child, setChild] = useState<Child[]>(initialState.kids);
    return (
        <>
            <Table kids={child} />
            <Form setChild={setChild} />
        </>
    );
};
