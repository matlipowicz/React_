import { useState } from "react";
import reactLogo from "./assets/react.svg";
import style from "./App.module.css";
import { cards } from "./mocks/cards";
import { Card } from "./components/Card";
import { Wrapper } from "./components/Wrapper";
import { AsideMenu } from "./components/AsideMenu";
import { Footer } from "./components/Footer";

// type Pepole = {
//     surname: string;
//     age: number;
// };

function App() {
    //! useState --> explanation by Adam
    // const [people, setPeople] = useState<Pepole[]>([]);
    // const [surname, setSurname] = useState("");
    // const [age, setAge] = useState(0);

    // const handleSubmit = (e: React.SyntheticEvent) => {
    //     e.preventDefault();
    //     setPeople((prev) => [...prev, { surname, age }]);
    // };
    // console.log(people);
    // return <Card {...singleData} />;

    // return (
    //     <Wrapper>
    //         {cards.map((item) => (
    //             <Card key={item.id} data={item} />
    //         ))}
    //     </Wrapper>
    // );

    return <AsideMenu />;

    // return (
    //     <form onSubmit={handleSubmit}>
    //         <label htmlFor="surname">Surname</label>
    //         <input type="text" name="surname" onChange={(e) => setSurname(e.target.value)} />
    //         <label htmlFor="surname">Age</label>
    //         <input type="number" name="age" onChange={(e) => setAge(Number(e.target.value))} />
    //         <button type="submit">Send form</button>
    //     </form>
    // );
}

export default App;
