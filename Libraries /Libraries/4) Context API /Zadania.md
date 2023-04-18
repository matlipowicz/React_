# Zadanie 1

- [ ] Wykorzystaj FakeRegisterComponent z route /register. Tworzone konto zapisz do UserContextu. UserContext powinien przechowywać tablicę użytkowników i metodę do ich dodawania
- [ ] Wykorzystaj FakeLoginComponent. UserContext ma przechowywać dane o tym czy użytkownik jest zalogowany (na ten moment dodaj metodę logIn i logOut), w metodzie logIn sprawdzaj wpisane w formularzu dane i zmień stan na zalogowany jeśli wprowadzone dane są prawidłowe, czyli czy taki uzytkownik juz sie zarejestrowal.

# Zadanie 2

Korzystając z hooka do używania UserContextu i MUI zaimplementuj Avatar i dane użytkownika (username), które pokażą się tylko gdy użytkownik jest zalogowany, dane weź z kontekstu.

# Zadanie 3

Stwórz komponent ProtectedWrapper, który będzie przyjmował dzieci i sprawdzał z kontekstu czy użytkownik jest zalogowany czy nie. Jeśli jest zalogowany to wpuść go dalej, jeżeli nie to przekieruj na stronę do logowania. Opatul tym komponentem route invoices

# Zadanie 4

Opatul aplikację w ErrorBoundary i zrefactoruj obecny routing na lazy loading.

//TODO:

    1. Dowiedzieć się jak działa ErrorBoundary, lazy loading (code splitting) + suspense [+],
    2. Jak dodać lazy loading do react router [+].

# Zadanie 5

Stwórz context NotificationContext z NotificationProviderem, a w środku diva z position absolute w którym wyświetlane będą komunikaty z aplikacji. Komunikaty pozytywne powinny mieć zielone tło, a negatywne tło czerwone. Dodaj do niego hooka umożliwiającego korzystanie z NotificationContextu w całej aplikacji. W mutacjach obsługujących dodawanie klientów i zamówień użyj NotificationContextu.

//TODO:

    1. Stworzyć context dla error i success [+],
    2. Stworzyć UI dla notification jako hook z divem i w nim info(error - czerwony, success - zielony bg) [+],
    3. Dodać context do tego hooka, który jest dostępny dla całej appki [+],
    4. Dodaj context do mutacji dodającej klientów do json-servera [+]
    5. Wrzucić state do contextu [+]

[Podpowiedź](https://dev.to/doylecodes/making-alerts-for-a-web-app-41d6) - kod w tutorialu nie jest napisany najlepiej ale powinna to być fajna wskazówka
https://jujuontheweb.medium.com/react-usecontext-hook-to-make-an-alert-notification-system-for-your-entire-application-721b4c6b7d0f

# Zadanie 6

W clients i orders znajduje się przycisk umożliwiający usuwanie klientów i zamówień, po kliknięciu na przycisk wyświetl modal z MUI pytający czy użytkownik na pewno chce usunąć wiersz z tabeli.

//TODO:

    1. Znaleźć modal w MUI [+],
    2. Modyfikacja, aby dodać przyciski --> cancel i delete w nim [+],
    3. Jak zrobić by przycisk główny delete wyświetlił ten modal? [+],
    4. Dodać metode "eraseUser" na przycisk w modalu --> "Delete" [+],
    5. Zamknięcie modala na przycisk --> "Cancel" [+]

# Zadanie 7

Na podstawie artykułu zaimplementuj dark mode do aplikacji https://www.freecodecamp.org/news/themes-using-css-variables-and-react-context/
Dodatek: [Dark mode dobre praktyki](https://atmos.style/blog/dark-mode-ui-best-practices)

//TODO:

    1. Stworzyć context z metodami, które prześle provider do consumera,
    2. Stworzenie metody przełączającej motyw dark <-> light na kliknięcie przycisku (toggle MUI),
    3. Stworzenie obiektu klas CSS (light i dark),
    4. Podpięcie i ustawianie zmiennych CSS
