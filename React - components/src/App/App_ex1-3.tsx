import { useState } from "react";
import reactLogo from "./assets/react.svg";
import style from "./App.module.css";
import { cards } from "../mocks/cards";
import { Card } from "../components/Card";
import { Wrapper } from "../components/Wrapper";

function AppOneThree() {
    return (
        <Wrapper>
            {cards.map((item) => (
                <Card key={item.id} data={item} />
            ))}
        </Wrapper>
    );
}

export default AppOneThree;
