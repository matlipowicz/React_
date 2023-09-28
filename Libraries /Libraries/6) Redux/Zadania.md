# Zadanie 1

Skonfiguruj reduxa i stwórz w nim slice:

- moneySlice z initialValue: 0,
- podłącz slice obok avataru i spraw, aby wartość z money Slice była widoczna na każdym widoku,

<!-- ? Dodałem avatar w aside, który jest na każdej stronie. Jak inaczej to dodać? Jedyne co znalazłem to <Router path="somewhere" element={<><One/> <Two/></>}>  -->

# Zadanie 2

Do moneySlice dodaj akcje:

- withdraw do wypłaty pieniędzy
- deposit wpłata pieniędzy
  po kliknięciu obok avataru w kwotę przenieś użytkownika do nowego route /money i stwórz formularz do dodawania i wyciągania pieniędzy wraz z walidacją

# Zadanie 3

- Dodaj orderSlice, który pozwoli na przechowywanie ID i tytułu wybranych zamówień.
- Zmodyfikuj strukturę order w JSON-serwer, która będzie przechowywała czy zamówienie jest opłacone czy nie.
- Na podstronie /orders dodaj checkbox, który umożliwia zbieranie zamówień do redux store (na zasadzie wrzucania do koszyka)
<!-- ? Czy nie lepiej tutaj przechować w stanie lokalnym tablice i potem na przycisk, zdispachować akcje do store? -->
- Na podstronie invoice wyświetl na liście tytuł zamówienia, który jest linkiem (po id) do jego detali (podobne do widoku koszyka)
- Na dole strony /invoice dodaj formularz z polem typu number i przycisk opłacone. Po kliknięciu na przycisk kwota z formularza dodaje się do moneySlice, a orderSlice się resetuje
- Pamiętaj żeby zaznaczyć w bazie danych, że zamówienia o danych ID zostały opłacone

# Zadanie 4

Zapoznaj sie z ReduxToolkitQuery dzięki stworzeniu strony z jej wykorzystaniem:
[Podpinanie Redux do API](https://www.youtube.com/watch?v=9DDX3US3kss)
