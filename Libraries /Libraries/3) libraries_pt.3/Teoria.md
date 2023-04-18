## Tanstack query

Biblioteka tanstack query powstała w celu zmniejszenia ilości wysyłanych zapytań na serwer. Pozwala na cachowanie, czyli przeglądarka zapamiętuje, że odpytała dany endpoint przez jakiś czas i w przypadku odpytania API ponownie z tymi samymi danymi zwraca odpowiedź z pamięci zamiast odpytywać serwer. React query udostępnia nam oczywiście o wiele więcej ale skupmy się na ten moment na mutacjach i na zapytaniach (queries). Zaczynamy od instalacji:

```
npm i @tanstack/react-query @tanstack/react-query-devtools
```

Na początek trzeba opatulić całą naszą aplikację w dostawcę cache, czyli w App.js

```js
import { QueryClient, QueryClientProvider, QueryCache } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//Tworzymy klienta z konfiguracją
const queryClient = new QueryClient({
    queryCache: new QueryCache(),
    defaultOptions: {
        queries: {
            staleTime: 60_000,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            {process.env.NODE_ENV === "development" && <ReactQueryDevtools position="top-right" initialIsOpen={false} />} // narzędzie developerskie
            dla tanstack-query muszą być pod QueryClientProvider
            <BrowserRouter>(...)</BrowserRouter>
        </QueryClientProvider>
    );
}
```

W komponencie Order używamy hooka useQuery żeby pobrać wszystkie zamówienia

```js
import React from "react";
import { getAllOrders } from "./orderService";
import { useQuery } from "@tanstack/react-query";

export const AllOrders = () => {
    const { data, isLoading, error } = useQuery(["orders"], getAllOrders);

    if (error) {
        return <p>Cannot get orders</p>;
    }
    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            {data.map((el) => {
                return <p key={el.id}>{el.body}</p>;
            })}
        </div>
    );
};
```

Hook useQuery

```js
const { data, isLoading, error } = useQuery(["orders"], getAllOrders);
```

Przyjmuje tablicę kluczy, które służą później do rozpoznawania zapytań i jeśli w którymś zapytaniu będziemy korzystać z tego samego klucza i dane będą aktualne zapytanie nie zostanie wysłane. <br />
Zajmijmy się teraz na mutacjach służących do zmiany danych na serwerze.

```js
import React from "react";
import { addOrder } from "./orderService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const AddOrder = () => {
    // import queryClienta
    const queryClient = useQueryClient();

    const mutation = useMutation(
        async (values) => {
            return await addOrder(values);
        },
        {
            onSuccess: () => {
                // rewalidacja i pobranie ponownie zapytania pod kluczem orders
                queryClient.invalidateQueries(["orders"]);
            },
            onError: () => {
                console.log("Cos poszlo nie tak");
            },
        }
    );

    const handleAdd = () => {
        //wykorzystanie mutacji
        mutation.mutate({ body: "poproszę sprite" }); // mutate przyjmuje dwa argumenty variables i options, zalecam więc przekazywanie variables zawsze jako obiekt
    };
    return <button onClick={handleAdd}>Add order</button>;
};
```

## Inne mechanizmy

Tanstack query udostępnia też inne mechanizmy np.

-   dependent queries,
-   useIsFetching (pozwala na stworzenie globalnego loadera), {/_(useIsFetching)_/}
-   PaginatedQueries (pozwala na stworzenie InfiniteScrool) razem z infiniteQueries,
-   placeholderData
    aby się z nimi zapoznać zachęcam do przeczytania dokumentacji

{/_Make notes from this yt video: https://www.youtube.com/watch?v=r8Dg0KVnfMA_/}

## Inne polecane biblioteki

-   React-joyride - wycieczka z użytkownikiem po aplikacji
-   eslint - biblioteka do statycznej analizy kodu
-   react-table - biblioteka do tabel
-   RTL - react testing library - biblioteka ułatwiająca testowanie aplikacji
-   GSAP - animacje w react
-   React spring - animacje w react
-   React i18next - internacjonalizacja aplikacji
-   date-fns - biblioteka do manipulacji na datach

## Podsumowanie

Przewodnik po bibliotekach, który wpadł teraz w Twoje ręce jest jedynie delikatnym wstępem do tematu, aby zagłębić się bardziej w możliwości podanych wyżej bibliotek zachęcam do współpracy z naszym mentorem i przeczytania dokumentacji

## Dodatek

[Seria artykułów o react query](https://tkdodo.eu/blog/practical-react-query)
[Testowanie react-query](https://www.youtube.com/watch?v=ZfvOHRX-FDM)
