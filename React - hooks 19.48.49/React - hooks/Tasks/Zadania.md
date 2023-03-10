# Hooki zadania

## Zadanie 1 (useState, useRef)
Stwórz widok zawierający tabelkę z danymi dzieci, które wchodzą do autobusu oraz formularz do wypełniania przez kierowcę. Stan początkowy przekazywany do hooka useState wygląda następująco
```js
    {
            kids: [{
                name: "Barbara",
                age: 10,
            },
            {
                name: "Katarzyna",
                age: 12,
            },
            ]
        }
```
Formularz powinien posiadać pola name i age oraz pole submit.

## Zadanie 2 (useEffect)
Stwórz komponent Posts który pobierze dane ze strony https://jsonplaceholder.typicode.com/posts pobrane dane załaduj do hooka useState, a następnie wyświetl title i body każdego posta. Pamiętaj żeby dane pobrały sie TYLKO RAZ (w strictMode w trybie deweloperskim od React 18 useEffect wykonuje sie zawsze dwa razy, inne sposoby na pobieranie danych poznasz razem z najczęściej używanymi bibliotekami)

## Zadanie 3 (useState)
Wróć do porzedniego zadania z postami i stwórz możliwość paginacji na danych, czyli dwa przyciski na dole strony przełączające w prawo i lewo wyniki. Przełączaj po 4 posty. Pamiętaj żeby zablokować możliwość przesuwania w tył jeśli jesteśmy na początku i blokowania końca jeśli jesteśmy na ostatniej stronie (button disabled)

### Podpowiedź
Do przechowywania numeru strony użyj useState i "potnij" tablicę danych na mniejsze fragmenty oraz zwróć odpowiednią grupę do funkcji mapującej dane aby je wyświetlić na podstawie numeru strony

## Zadanie 4 (Custom hook)

Bardzo często będziemy używali pobierania danych z API w projektach. Z tego powodu stwórz swojego własnego hooka, który jako argument przyjmie link do api, następnie pobierze dane, doda je do stanu w useState, a następnie zwróci z hooka stan isLoading,isError,data. Użycie hooka powinno wyglądać w następujący sposób:
```js
    const {isLoading,isError,data}=useAPI("https://jsonplaceholder.typicode.com/posts")
```
Możesz teraz wrócić do zadania 2, 3 i je zrefaktorować ;)

## Zadanie 5 UseClickOutside (useRef)
Znajdź w internecie przykład i zapoznaj się do czego może służyć i jak używać hooka useClickOutside. Przygotuj działający przykład

### Komentarz:
Praca programisty czasem polega na tym, żeby przetestować działanie jakiegoś fragmentu kodu lub dostosować go na potrzeby naszego projektu, to zadanie ma to ćwiczyć ;)

## Zadanie 6 (useState)
Do strony na której znajdują się karty z danymi klientów (Cards - zestaw zadań do komponentów) dodaj formularz u góry który umożliwi wyszukiwanie klienta po jego imieniu.

### Podpowiedź
Do realizacji zadania przyda się osobny stan, który przechowa frazę wyszukiwaną i filtr

[Zadania dodatkowe]
## Zadanie 7
Razem z Adrianem z JsMastery zaimplementuj stronę
https://www.youtube.com/watch?v=_oO4Qi5aVZs (2h)

## Zadanie 8 (useState)

Wróć do zadania z menu z poprzedniego zestawu (komponenty) i dodaj przycisk umożliwiający jego zwijanie i rozwijanie, wykorzystaj useState

## Zadanie 9 (useReducer)

Stworz reducer, który pozwoli na następujące akcje:
* dodawanie produktu do koszyka
* usuwanie produktu z koszyka
* zmienianie ilości produktu w koszyku
W zadaniu chodzi o samą logikę, natomiast jeśli chcesz możesz przygotować też widok.