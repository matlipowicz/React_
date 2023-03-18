## Zadanie 1

- [ ] Przygotuj tabelę clients w json-serwer przechowująca te same pola, które są wylistowane na formularzu do dodawania klienta w poprzednim zestawie zadań.
- [ ] na podstronie: /clients pobierz wszystkich klientów i wyświetl: imie, nazwisko, miasto, numer telefonu i zdjęcie,
- [ ] po kliknięciu na kartę klienta przenieś użytkownika na nową podstronę, która wyświetla jego wszystkie dane, dane pobierz z json-serwera,
- [ ] w detalach klienta po kliknięciu w przycisk edit pobierz dane klienta po id i dodaj je do formularza, przycisk update (aktualizuje dane),
- [ ] w detalach klienta dodaj funkcjonalność do usuwania klienta pod przyciskiem usuń,

## Zadanie 2

- [ ] Podstrona na dodawanie zamówień, klientów do selecta pobierz z json-serwera.
- [ ] Przygotuj strukturę na dodawanie zamówień zawierającą pola jak w formularzu, w json-serwerze,
- [ ] na podstronie orders wyświetl numer telefonu zamawiającego, tytuł i ilość, dodaj przycisk details przenoszący na podstronę orders/:id, dane pobierz po id zamówienia z json-serwera,
- [ ] na podstronie orders/:id, wyświetl dane zamawiającego (imię, nazwisko) i przycisk do przejścia do jego detali oraz dane zamówienia, czyli tytuł, treść i ilość, dane pobierz z json-serwer po id zamówienia <br />
Podpowiedź:<br/>
Na podstronie orders/:id będą dwa zapytania, jedno po id zamówienia, a drugie to filtr żeby otrzymać użytkownika. Dane z json serwera można filtrować wysyłając odpowiednie zapytanie np. /posts?title=json-server zwróci posty w których tytuł to json-serwer