# Context API i inne

W niniejszym szkoleniu dowiesz się co contextAPI, co to komponent ErrorBoundary, do czego może się przydać lazy loading i co to compound components

## Context API

Context API pozwala na globalne zarządzanie stanem lub zarządzanie stanem pewną grupy komponentów, twórcy Reacta wprowadzili je w wersji 16.3. Context API rozwiązało problem prop drillingu (przekazywanie wielu propsów przez kilka komponentów w dół). Na początek najlepiej zacząć od stworzenia folderu contexts, a w nim przykładowego kontekstu. My zajmiemy się stworzeniem kontekstu motywu aplikacji. Na początku stan kontekstu jest nieznany, więc używamy nulla
```js
import { createContext, useState } from "react"

type ThemeContextProps={
    theme: boolean,
    toggleTheme: Dispatch<SetStateAction<Theme>>
}

const ThemeContext=createContext<ThemeContextProps|null>(null)
```
Następnie tworzymy komponent, który będzie dostarczał dane wszystkim komponentom, które są jego dziećmi.
```js
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}> //jako value podajemy zmienne i funkcje, których chcemy używać w komponentach będących dziećmi
      {children}
    </ThemeContext.Provider>
  );
};
```
Teraz wystarczy opatulić naszą grupę komponentów albo całą aplikację ThemeProviderem i możemy korzystać z dobrodziejstw contextAPI. <br />
Jednak rodzi to pewne niebezpieczeństwo wywołania kontekstu w komponencie, który nie jest opatulony w Provider. Stwórzmy hooka zabezpieczającego, a jednocześnie ułatwiającego działanie z kontekstem.
```js
export const useThemeContext=()=>{
    const ctx=useContext(ThemeContext)

    if(!ctx){ // poza komponentem zwróci nulla
        throw new Error("Missing themeContext, it's not wrapped in ThemeProvider")
    }
    return ctx
}
```
Dzięki temu możemy użyć teraz tego hooka w komponencie znajdującym się wewnątrz Providera, a jeśli użyjemy go poza Providerem otrzymamy w konsoli błąd który zdefiniowaliśmy. Na przykład tak:
```js
import {useThemeContext} from "./ThemeContext"

function ExapmleComponent{
    const { isDarkTheme,setIsDarkTheme} = useThemeContext();
    // odczytywanie i ustawianie stanu globalnie
}

const Button = ()=>{

  const {setIsDarkTheme}=useThemeContext()

  return <button onClick={setIsDarkTheme}>Change to dark</button>
}
```

Mozna też wynieść helper dla innych kontekstów aby łapać go bezpiecznie
```js
import { useContext } from "react";
import type { Context } from "react";
export const getSafeContext = <T>(
context: Context<T | null>,
name = "context",
) => {
    return ()=>{
        const ctx = useContext(context);
if (!ctx) {
throw new Error(`Missing ${name} data!`);
}
return ctx;
    }
};
```
następnie importujemy go i zmieniamy useThemeContext na
```js
const useThemeContext=getSafeContext(ThemeContext,"ThemeContext")
```

## CompoundComponents

W niektórych bibliotekach komponentów spotkasz się z wzorcem, gdy komponent ma swoje podkomponenty i tylko w tym komponencie można ich użyć. Jeśli zastanawiałeś się "jak to jest zrobione?" to spieszę z wyjaśnieniem. Stworzymy komponent Menu i Menu.Item
```js
import React, { createContext, useContext, useState } from "react";
import {Link} from "react-router-dom"
import {ItemProps} from "./types"

const MenuContext=createContext()

const Item=({index,title,link,desc}:ItemProps)=>{
    const {openIndex,setOpenIndex} = useContext(MenuContext);
 
  return (
    <div onClick={()=>setOpenIndex(index)}>
      <p>{title}</p>
      {openIndex===index && <Link to={link}>{desc}</Link>}
    </div>
  );
}
const Menu=({children}:{children:React.ReactNode})=>{
    return <>{children}</>
}
Menu.Item=Item; //przypisanie podkomponentu
const App=()=>{
    const [openIndex,setOpenIndex]=useState(0)

    return (
        <MenuContext.Provider value={{openIndex,setOpenIndex}}>
            <Menu>
                <Menu.Item index={1} title="One" link="/one" desc="one desc" />
                 <Menu.Item index={2} title="two" link="/two" desc="two desc" />
                  <Menu.Item index={3} title="three" link="/three" desc="three desc" />
            </Menu>
        </MenuContext.Provider>
    )
}
```

## ErrorBoundary
Błąd w kodzie JS'a nie powinien niszczyć całego UI w aplikacji. Aby rozwiązać ten problem React wprowadził komponent ErrorBoundary aby łapać i obsługiwać błędy. ErrorBoundary łapie błędy w swoich dzieciach, można je zalogować do serwisu przechwytującego błędy i wyświetlić zastępczy widok. Error boundary nie obsługuje błędów z:
* event handlers,
* asynchronicznego kodu,
* podczas serwer side renderingu,
* errorów wyrzuconych w error boundary, <br />

Error boundary jest komponentem klasowym zawierający metody cyklu życia getDerivedStateFromError() i componentDidCatch()
```js
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```
ErrorBoundary jest komponentem przyjmującym dzieci, tak więc w ostatnim kroku musimy opatulić naszą aplikację lub punkty krytyczne aplikacji w komponent ErrorBoundary.

## Suspense i lazy loading

Za każdym razem gdy aplikacja jest wyświetlana React pobiera wszystkie komponenty w routingu od razu. W większych aplikacjach użytkownik czasem może wcale nie dotrzeć do wszystkich podstron. Żeby zmniejszyć pierwsze ładowanie JSa możemy skorzystać z React.lazy. To dynamiczny import, który pozwoli na pobranie komponentu dopiero wtedy gdy będzie potrzebny. <br />
UWAGA: komponent importowany jako lazy musi być exportowany defaultowo <br />
Podczas ładowania możemy wyświetlić loader albo zastępcze UI, do tego potrzebny nam będzie wbudowany w React komponent Suspense. Komponent Suspense musi przyjmować komponenty ładowane leniwie jako dzieci.

```js
import { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
          <OtherComponent />
      </Suspense>
    </div>
  );
}
```
Dzięki zastosowaniu lazy loadingu i code-splitingu zmniejszamy parametr "first load JS" co przyspiesza pierwsze ładowanie strony.

## Portale TODO

## Materiały dodatkowe
[Context API best practices](https://medium.com/the-non-traditional-developer/my-react-context-best-practices-2e9288628ae7)<br />
[ContextAPI skomplikowany przykład ze zmianą stanu](https://dmitripavlutin.com/react-context-and-usecontext/)<br />
[jak używać contextu](https://kentcdodds.com/blog/how-to-use-react-context-effectively)<br />
[Portale w React](https://blog.bitsrc.io/discover-the-magic-of-portals-a-beginners-guide-to-react-s-most-powerful-tool-f6f1965ea305)<br />