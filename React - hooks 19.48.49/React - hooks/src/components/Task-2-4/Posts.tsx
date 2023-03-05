import { useState, useEffect } from "react";
import { useAPI } from "./fetch_hook/useAPI";
import React from "react";

//!EX.2
// Stwórz komponent Posts który pobierze dane ze strony https://jsonplaceholder.typicode.com/posts pobrane dane załaduj do hooka useState, a następnie wyświetl title i body każdego posta. Pamiętaj żeby dane pobrały sie TYLKO RAZ (w strictMode w trybie deweloperskim od React 18 useEffect wykonuje sie zawsze dwa razy, inne sposoby na pobieranie danych poznasz razem z najczęściej używanymi bibliotekami)
//!EX.3
// Wróć do porzedniego zadania z postami i stwórz możliwość paginacji na danych, czyli dwa przyciski na dole strony przełączające w prawo i lewo wyniki. Przełączaj po 4 posty. Pamiętaj żeby zablokować możliwość przesuwania w tył jeśli jesteśmy na początku i blokowania końca jeśli jesteśmy na ostatniej stronie (button disabled)

/*
1. Dodać stany dla pierwszej strony o ostatniej
2. Stworzyć funkcję pobierającą liczbe elementów z pobranej tablicy
3. Stworzyć funkcje dla przycisków, które przełączają content i strony
4. Wyświetlić posty 


*/

// {
//     "userId": 10,
//     "id": 100,
//     "title": "at nam consequatur ea labore ea harum",
//     "body": "cupiditate quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut"
//     }
interface PostTypes {
    userId: number;
    id: number;
    title: string;
    body: string;
}
export const Posts = () => {
    const { data, isError, isLoading } = useAPI<PostTypes[]>("https://jsonplaceholder.typicode.com/posts");
    const [currPage, setCurrPage] = useState<number>(1);
    const [maxElements] = useState<number>(10);

    // let start = (currPage - 1) * maxElements;
    // let end = currPage * maxElements;
    // const post = posts.slice(start, end);

    const post = data?.filter((_, index) => {
        let start = (currPage - 1) * maxElements;
        let end = currPage * maxElements;

        if (index >= start && index < end) return true;
    });

    const nextPage = () => {
        setCurrPage((prev) => {
            return currPage * maxElements < data.length ? prev + 1 : prev + 0;
        });
    };

    const prevPage = () => {
        setCurrPage((prev) => {
            return prev > 1 ? prev - 1 : prev - 0;
        });
    };

    return (
        <div>
            <section>
                {!isLoading &&
                    !isError &&
                    post.map((el) => {
                        return <p key={el.id}>{el.title}</p>;
                    })}
            </section>
            <button onClick={prevPage}>Prev</button>
            <button onClick={nextPage}>Next</button>
        </div>
    );
};
