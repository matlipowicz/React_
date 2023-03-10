import { useState, useEffect } from "react";

/*
! EX.4
Bardzo często będziemy używali pobierania danych z API w projektach. Z tego powodu stwórz swojego własnego hooka, który jako argument przyjmie link do api, następnie pobierze dane, doda je do stanu w useState, a następnie zwróci z hooka stan isLoading,isError,data. Użycie hooka powinno wyglądać w następujący sposób:
```js
    const {isLoading,isError,data}=useAPI("https://jsonplaceholder.typicode.com/posts")
```
Możesz teraz wrócić do zadania 2, 3 i je zrefaktorować ;)

/*
TODO

1. skopiować i przerobić fetch 
2. zwrócić trzy właściwości isLoading, isError, data
*/

interface PostTypes {
    userId: number;
    id: number;
    title: string;
    body: string;
}
interface customHookTypes {
    isLoading: boolean;
    isError: boolean | any;
    data: PostTypes[];
}

export function useAPI<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    // const [posts, setPosts] = useState<PostTypes[]>([]);
    async function fetchData() {
        try {
            // setState({ isLoading: true, isError: false, data: null });
            setIsLoading(true);
            const response = await fetch(url);

            if (!response.ok) {
                // setState({ isLoading: true, isError: false, data: [] });
                setIsError(true);
                throw new Error("Error in fetching the data");
            }
            const json: T = await response.json();

            // setState({ isLoading: false, isError: false, data: json });
            setData(json);
        } catch (error: unknown) {
            // setState({ isLoading: true, isError: error, data: [] });
            console.log("Error:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [url]);

    return { data, isError, isLoading };
}
