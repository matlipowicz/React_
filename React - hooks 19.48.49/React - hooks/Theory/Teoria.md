# Hooki

## Zdarzenia w React i ich obsługa

Zamiast przypinania zdarzeń na elementy za pomocą window.addEventListener, zdarzenia w React przypisujemy bezpośrednio do tagu HTML lub komponentu

```js
export const Button = () => {
    const handleButtonClick = () => {
        console.log("Button clicked");
    };
    return <button onClick={handleButtonClick}>Click me!</button>;
};
```

Domyślne zachowanie formularza polega na odświeżeniu strony. W React nie możemy na to pozwolić, bo cały zapisany stan aplikacji zostanie zresetowany do stanu początkowego. Nie po to też używamy Reacta, żeby przerenderowywać całą aplikację przy każdej zmianie. Używamy go po to aby dynamicznie podmieniać tylko te fragmenty DOMu, które ulegają zmianom. Zobaczmy jak pokonać ten problem.
Każde zdarzenie po wywołaniu wysyła event, który możemy przejąć za pomocą funkcji.

```js
export const Form = () => {
    const handleSubmit = (e: React.SyntheticEvent) => {
        //definiujemy funkcję wewnątrz komponentu
        e.preventDefault(); //zatrzymujemy podstawowe zachowanie
        console.log(e); //SyntheticBaseEvent
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="surname">Surname</label>
            <input type="text" name="surname" />
            <button type="submit">Send form</button>
        </form>
    );
};
```

SyntheticEvent jest abstrakcja nałożoną przez React na zdarzenia, aby je ujednolicić [więcej tutaj](https://pl.reactjs.org/docs/events.html)
Do odczytywania wartości z pól input wrócimy później

## Przekazywanie argumentów do zdarzeń

Na pewno zauważyłeś/aś wcześniej, że dzięki zdefiniowaniu funkcji wewnątrz komponentu to da się do niej przekazywać argumenty. W poprzednim przykładzie pokazałem, jak przekazać parametr domyślny jakim jest zdarzenie (event), a co jeśli chcemy przekazać inny argument np. id elementu?
Posłużmy się przykładem buttona. Należy zwrócić uwagę na to w jaki sposób funkcja jest wywołana

```js
export const Button = () => {
    const handleButtonClick = (param1: string) => {
        console.log(param1);
    };
    return <button onClick={() => handleButtonClick("text")}>Click me!</button>;
};
```

Jeżeli chcemy przekazać jeszcze zdarzenie to nadal posługujemy się zapisem (funkcja wywołuje funkcję). Pamiętaj że argumentem pierwszej funkcji jest zawsze zdarzenie (event)

```js
export const Button = () => {
    const handleButtonClick = (event: React.SyntheticEvent, param1: string) => {
        console.log(event, param1);
    };
    return <button onClick={(e) => handleButtonClick(e, "text")}>Click me!</button>;
};
```

Przy przypinaniu zdarzeń do komponentów należy uważać na zapis:

```js
<button onClick={handleButtonClick()}>Click me!</button>
```

wywołujemy funkcję od razu podczas renderu, co może prowadzić do błędu, do handlera zawsze przekazujemy nazwę funkcji lub funkcję wywołującą funkcję

## Stan komponentów i ich cykl życia

Stan jest atrybutem komponentu, jest prywatną zmienną i jest kontrolowany przez dany komponent. Metoda (funkcja) render komponentu zostaje zawsze automatycznie wywoływana przy każdej zmianie stanu komponentu (od React 18 zmiany są batchowane co redukuje liczbę przeładowań, następuje jedna wspólna aktualizacja zamiast kilku po kolei). Zmiana stanu powoduje rerender komponentu i jego dzieci (chyba, że używamy React.memo).

## Garść histori, czyli komponenty klasowe

Komponenty klasowe nie sa już używane w najnowszych projektach oprócz ErrorBoundary (o którym więcej w kolejnych szkoleniach), ale praca developera czasem polega na przepisaniu starego systemu na nowy. Dlatego minimalna wiedza z komponentów klasowych może się jeszcze przydać

```js
class HelloGuy extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "Alojzy" };
    }

    render() {
        return <div>Witaj {this.state.name}</div>;
    }
}
```

Aby zarządzać stanem w komponentach klasowych należy w konstruktorze zdefiniować w nim pole state, które jest obiektem. Komponenty klasowe zawsze muszą przekazywać propsy do konstruktora bazowego klasy React.Component, przekazujemy je za pomocą super(), które znasz już z klas w JS.<br/>
W klasie komponentu możemy definiować metody cyklu życia, które służą do montowania i odmontowywania komponentu.
Montowanie komponentu to moment wyrenderowania komponentu, a odmontowanie to jego usunięcie z drzewa DOM. <br/>
Przyjrzyjmy się metodom cyklu życia

-   componentDidMount() - uruchamiana jest po wyrenderowaniu drzewa DOM
-   componentDidUpdate() - uruchamiana po aktualizacji zmiennych stanu,
-   componentWillUnmount() - uruchamiana jest przed odmontowaniem komponentu, tutaj czyścimy subskrybcje i pamięć.

Każdy komponent stanowi osobną instancję, więc stan różnych komponentów aktualizuje się niezależnie od reszty.

![Render cycle](./assets//renderCycle.PNG)
Źródło: [React lifecycle methods diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

## Hooki

Hooki zostały dodane w wersji React 16.8, pozwalały na używanie stanu i innych możliwości Reacta bez pisania komponentów klasowych. Przy czym aby zachować kompatybilność wsteczną komponenty klasowe nie zostały wycofane.<br/>
Hooki to funkcje zaczynające się od słówka use, są odpowiedzialne za kontrolowanie mechanizmów zarządzania stanem i cyklem zycia komponentów. W React są wbudowane hooki, ale można też budować własne hooki, takie hooki nazywamy customowymi.<br/>
Zasady hooków:

-   hooki mogą być używane tylko w komponentach,
-   nie można używać hooków w pętlach, instrukcjach warunkowych czy funkcjach zagnieżdżonych - można ich używać z najwyższego poziomu kodu komponentów funkcyjnych,

Hook może być użyty w komponencie wielokrotnie

### useState

UseState jest najczęściej używanym hookiem - to hook stanu.
Hook useState importujemy z Reacta. Hook useState zwraca nam aktualną wartość oraz setter do ustawienia nowej wartości. Setter można wywołać z innej funkcji, bezpośrednio lub w innym hooku. Do hooka useState możemy przekazać:

-   stan początkowy (wartość prymitywna, obiekt, tablica),
-   funkcję zwracającą początkowy stan (przydatne przy komponentach generycznych),
    Argument przekazany do useState jest wykorzystywany podczas pierwszego renderowania (rysowania) komponentu.

```js
import { useState } from "react";
export const Button = () => {
    const [counter, setCounter] = useState(0);
    //'counter' zostanie wywnioskowany, czyli zinferowany przez TypeScripta
    //'setCounter' przyjmie tylko liczby
    const handleClick = () => {
        setCounter(counter + 1);
    };
    return (
        <>
            <button onClick={handleClick}>Click me!</button>
            <p>{counter}</p>
        </>
    );
};
```

W komponencie można definiować kilka hooków stanu, czyli rozbijać stan na mniejsze jego wycinki. Jeżeli inicializujemy hook wartością nie musimy podawać oczekiwanego typu. Wiele hooków jest generycznych, czyli możemy przekazać do niego typ, typ też może być unią typów

```js
const [user, setUser] = (useState < User) | (null > null);
```

```js
import { useState } from "react";

export const Form = () => {
    const [surname, setSurname] = useState("");
    const [age, setAge] = useState(0);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(surname, age);
    };
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
```

UseState jest również asynchroniczny i przy większych obiektach należy wykorzystać funkcję do ustawiania nowego stanu, aby stan się zakolejkował przy częstych aktualizacjach. Jednak przechowowywanie skomplikowanego stanu (tablice obiektów) nie jest zalecane. Trzeba też pamiętać o wypakowywaniu za pomocą operatora spread ... poprzedniego stanu, aby go nie zgubić.

```js
setState((prev) => {
    return {
        ...prev,
        newKey: "newValue",
    };
});
```

Przy podawaniu pustej tablicy musimy podać typ generyczny. Bez niego TypeScript wywnioskuje, że stan będzie typu never[], co skutkuje tym, że nie będzie można ustawić nowego stanu.

```js
const [messages,setMessages]=useState<SingleMessage[]>([])
```

```js
import {useState} from "react"

interface Person {
    id: number;
    surname:string;
    age:number;
}

export const Hooks = () => {
  const [persons, setPeoples] = useState<Person[]>([]);
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState(0);

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    setPeoples((prev) => {
      return [...prev, { id: prev.length, surname, age }];
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="surname">Surname</label>
        <input
          type="text"
          name="surname"
          onChange={(e) => setSurname(e.target.value)}
        />
        <label htmlFor="surname">Age</label>
        <input
          type="number"
          name="age"
          onChange={(e) => setAge(Number(e.target.value))}
        />
        <button type="submit">Send form</button>
      </form>
      <div>
        {persons.map((el) => {
          return (
            <p key={el.id}>
              {el.surname}
              <span>{el.age}</span>
            </p>
          );
        })}
      </div>
    </>
  );
};
```

### useEffect

Za pomocą hooka useEffect obsługujemy subskrybcje. Mówimy Reactowi dzięki niemu, że ma wykonać jakiś fragment kodu <b>po wyrenderowaniu</b> lub zmianie zmiennej którą nasłuchuje. Dzięki niemu możemy również posprzątać po komponencie przed jego odmontowaniem. Do hooka useEffect przekazujemy tablicę zależności, na jej podstawie react nasłuchuje na zmienne w niej wskazane i wywołuje efekty.
Komponent może mieć kilka oddzielnych efektów ubocznych.
Składnia jest następująca:

```js
useEffect(()=>{
    //co ma się wydarzyć
    return ()=>{
        //opcjonalna funkcja czyszcząca
    }
},[tablica zależności])
```

Przyjrzyjmy się przykładowi, będziemy aktualizować licznik co sekundę.

```js
import { useEffect, useState } from "react";

export const Effect = () => {
    const [timer, setTimer] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => prev + 1); //inkrementacja licznika
        }, 1000);

        return () => {
            clearInterval(interval); //czyszczenie interwału
        };
    }, []); // pusta tablica zależności kod wykonuje się tylko przy pierwszym wyrenderowaniu

    return <div>App run {timer} seconds</div>;
};
```

Gdybyśmy nie czyścili interwału, po każdej zmianie stanu timer powoduje przerenderowanie komponentu, a to dodawałoby nowy interwał do komponentu przez co odliczanie nie byłoby prawidłowe. Zachęcam do sprawdzenia tego samodzielnie ;)

### useRef

Hook useRef używany jest gdy chcemy mieć bezpośredni dostęp do DOMu. UseRef nie powoduje przeładowania komponentu. UseRef zwraca mutowalny obiekt, a jego właściwość .current jest jego argumentem. Dzięki niemu można np. przechowywać wartości pól formularza lub focusować na dany input. Zmienną zwróconą z hooka useRef przpinamy do tagu HTML za pomocą atrybutu ref. **useRef może też być wykorzystywany do przechowania poprzedniej wartości komponentu bez potrzeby zmiany jego stanu. Wykorzystujemy do tego obiekt właściwośc "current".**

```js
import { useRef } from "react";

export const Form = () => {
    const surnameInputEl = (useRef < HTMLInputElement) | (null > null);
    const ageInputEl = (useRef < HTMLInputElement) | (null > null);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const data = {
            surname: surnameInputEl.current?.value,
            age: ageInputEl.current?.value,
        };
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="surname">Surname</label>
            <input ref={surnameInputEl} type="text" name="surname" />
            <label htmlFor="surname">Age</label>
            <input ref={ageInputEl} type="number" name="age" />
            <button type="submit">Send form</button>
        </form>
    );
};
```

### useMemo

Hooki useMemo i useCallback odpowiadają za optymalizację aplikacji.

Zwraca zapamiętaną wcześniej wartość. Wartość obliczana jest przez niego na nowo jeśli zmieni się coś na co ma ustawioną obserwację w tablicy zależności.

```js
const radiacja = useMemo(() => obliczRadiacje([...params]), [...params]);
```

Przekazywane w formie tablicy zmienne są nasłuchiwane. W momencie ich zmiany skomplikowana funkcja obliczRadiacje wywołuje się na nowo

### useCallback

Hook ten zwraca zapamiętaną funkcję, zmienia się tylko wtedy gdy zostaje zmodyfikowana któraś z zależności.

```js
const memoizedCallback = useCallback(() => {
    doSomething(a, b);
}, [a, b]);
```

WAŻNE<br />
useMemo i useCallback nie robią deepCompare, dlatego tak ważne jest żeby w React nie mutować stanu tylko zawsze zwracać nowy stan do hooka

### useReducer

Jest alternatywą dla hooka useState. Przyjmuje reducer, który jest funkcją przyjmującą (stan,akcja)=>nowy stan, a zwraca aktalny stan i metodę dispatch. <br/>
Sprawdza się tam gdzie występuje skomplikowana logika zarządzania stanem, która ma wiele podwartości (tablice obiektów, złożone obiekty) lub tam gdzie następny stan zależy od poprzedniego.

```js
import { useReducer } from "react";

const initialState = { count: 0 };

// typy funkcji reducera
type ActionType = { type: "increment" } | { type: "decrement" } | { type: "change", payload: number };

function reducer(state: typeof initialState, action: Readonly<ActionType>): typeof initialState {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
        case "change":
            return { count: state.count + action.payload };
        default:
            throw new Error();
    }
}
// Dzięki temu w komponencie otrzymamy później podpowiadanie składni
function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            Licznik: {state.count}
            <button onClick={() => dispatch({ type: "decrement" })}>-</button>
            <button onClick={() => dispatch({ type: "increment" })}>+</button>
            <button onClick={() => dispatch({ type: "change", payload: 2 })}>Change</button>
        </>
    );
}
```

### custom Hook, czyli poprawianie jakości kodu

Zgodnie ze wzorcem separacji zależności, aby poprawić jakość naszego kodu powinniśmy rozbić template (HTML i zdarzenia do niego przypięte), style i kod logiki zamknięty w customHooku w osobnych plikach.
Korzystając z przykładu z formularzem na refach oddzielę logikę komponentu od jego template HTML
Plik useForm.js (logika komponentu)

```js
import { useRef } from "react";

export const useForm = () => {
    const surnameInputEl = (useRef < HTMLInputElement) | (null > null);
    const ageInputEl = (useRef < HTMLInputElement) | (null > null);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const data = {
            surname: surnameInputEl.current?.value,
            age: ageInputEl.current?.value,
        };
        console.log(data);
    };
    return {
        surnameInputEl,
        ageInputEl,
        handleSubmit,
    };
};
```

Plik Form.jsx (template HTML)

```js
import { useForm } from "./useForm";

export const Form = () => {
    const { surnameInputEl, ageInputEl, handleSubmit } = useForm();
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="surname">Surname</label>
            <input ref={surnameInputEl} type="text" name="surname" />
            <label htmlFor="surname">Age</label>
            <input ref={ageInputEl} type="number" name="age" />
            <button type="submit">Send form</button>
        </form>
    );
};
```

Podczas importowania custom hooka do wielu komponentów pamiętaj, że ich stan nie jest wspólny, każde zaimportowanie custom hooka, tworzy osobną instancję tego hooka dla danego komponentu.

### Komunikacja pomiędzy komponentami

Komponenty mogą komunikować się między sobą na kilka sposobów, jeden z nich już poznałeś/aś wcześniej.

-   Z rodzica do dziecka (poprzez przekazywanie propsów)

```js
<First text={text} />
```

-   Parametry z dziecka do rodzica

```js
function App() {
    const [counter, setCounter] = useState(0);
    const handleClick = () => {
        setCounter(counter + 1);
    };
    return <Button handleClick={handleClick} />;
}
export const Button = ({ handleClick }) => {
    return (
        <>
            <button onClick={handleClick}>Click me!</button>
            <p>{counter}</p>
        </>
    );
};
```

Wywołanie w dziecku kliknięcia powoduje zmianę stanu w rodzicu i przerenderowanie komponentów<br/>

    * Globalne zarządzanie stanem

Wraz z rozbudową aplikacji pojawia się potrzeba przekazywania stanu w głąb wielu komponentów. Zarządzanie tym jest bardzo problematyczne, więc stworzono rozwiązania pozwalające na globalne zarządzanie stanem, są to m. in. ContextAPI i Redux o których więcej w kolejnych materiałach

## Materiały dodatkowe

[Hooki od 0 do bohatera](https://dev.to/dev117uday/react-hooks-0-to-hero-4b7o)<br/>
[Hooki używane codziennie](https://medium.com/sonny-sangha/5-react-hooks-that-you-will-use-in-your-everyday-life-as-a-developer-7c1e99780190)<br/>
[UseEffect](https://codeburst.io/advanced-react-hooks-deep-dive-into-useeffect-hook-18470266047d)<br/>
[UseRef przewodnik](https://dmitripavlutin.com/react-useref-guide/)<br/>
[Czego unikać przy hookach](https://dmitripavlutin.com/react-hooks-mistakes-to-avoid/)<br/>
[Błędy związane z useState](https://javascript.plainenglish.io/commons-mistakes-with-react-usestate-hook-and-how-to-prevent-them-43c811ca7451)<br/>
[Refaktoryzacja w stronę hooków](https://www.youtube.com/watch?v=-9M9CGSd69I)<br/>
[hook useFetch](https://medium.com/geekculture/react-custom-hook-usefetch-87ea1d41d1ce)<br/>
[dokumentacja hooków](https://pl.reactjs.org/docs/hooks-reference.html)<br/>
[dobre nawyki](https://www.developerway.com/posts/how-to-write-performant-react-code)<br />
[cykl zycia komponentu w hookach](https://julesblom.com/writing/react-hook-component-timeline)<br />
