import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import style from "./App.module.css";
import { cards } from "../../../mocks/cards";
import { Card } from "./Card";
import { Wrapper } from "./Wrapper";
import { SearchUser } from "../user/SearchUser";

export function RenderCard() {
    const [searchInput, setSearchInput] = useState("");
    const [filterUser, setFilterUser] = useState<typeof cards>([]); // -> filtered card state

    const filterUserCard = () => {
        if (searchInput !== "") {
            const filteredData = cards.filter((item) => {
                return item.name.toUpperCase().includes(searchInput.toUpperCase());
            });
            setFilterUser(filteredData);
        } else {
            setFilterUser(cards);
        }
    };
    useEffect(() => {
        filterUserCard();
    }, [searchInput]);

    return (
        // <Wrapper>
        //     <SearchUser />
        //     {cards.map((item) => (
        //         <Card key={item.id} data={item} />
        //     ))}
        // </Wrapper>
        <>
            <SearchUser setSearchInput={setSearchInput} />
            {filterUser.map((item) => (
                <Card key={item.id} data={item} />
            ))}
        </>
    );
}

export default RenderCard;
