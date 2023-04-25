# Zadania

## Zadanie 1

Na podstronie invoices/add stwórz formularz wielokrokowy:

- w kroku 1: wybierz klienta i po wybraniu wyświetl jego dane,
- w kroku 2: wyświetl wszystkie zamówienia tego klienta i pozwól użytkownikowi wybrać zamówienia,
- w kroku 3: wyświetl dane klienta, zamówienia za jakie ma zapłacić i pole do wpisania: - ceny - data od, - data do, (okres za jaki wystawiana jest faktura)
  Zaproponuj walidacje i schemat w bazie danych do przechowywania wystawionych faktur.

Podpowiedź:
Przyda się też modyfikacja bazy aby zapisywać które zamówienia są opłacone a które nie

//PROBLEMS_TO_SOLVE

1. Jak dodać klientów do danego inputa, aby go wybrać i jak wyświetlić dane wybranego klienta?
2. Jak wyświetlić zamówienia klienta w kroku drugim? Jak przenieść te dane?
3. W kroku trzecim z wyświetlonymi danymi klienta i jego zakupami. Trzeba dodać input na cene i zakres dat spłaty faktury
   - jak stworzyć walidację dla faktury i schemat w bazie danych?
4. Jak stworzyć kilka "stron", etapów formularza i wymianę danych między nimi
5. Czy warto wykorzystać useReducera do manipulacji stanem, czy wystarczy prosty useState?

//TODO:

1. Stworzenie stanu dla danego kroku + funkcje do przełączania się miedzy krokami (back i next),
2. Stworzenie trzech komponentów, które będą wyświetlane w zależności od stanu kroku (utworzyć odpowiednie inputy i walidację),
3. Stworzyć metodę zapisującą fakturę dla danego klienta w bazie danych o zadanym schemacie.
4. Stworzyć też możliwość modyfikacji danych w bazie, z określeniem, która faktura jest opłacona
