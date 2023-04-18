# Najczesciej uzywane biblioteki cz.1

Biblioteki to npmowe paczki zewnętrzne napisane przez innych w celu ujednolicenia i ułatwienia pracy na projektach. Dzięki zastosowaniu bibliotek oszczędzamy czas potrzebny w procesie wytwarzania oprogramowania.

## Biblioteki komponentów

Firmy korzystają z bibliotek komponentów wewnętrznych i zewnętrznych. Dzięki temu są w stanie rozwiązać problem w bibliotece i jednocześnie naprawić go wszędzie gdzie komponent jest używany. Takie biblioteki nazywamy design systemem. Taka biblioteka jest zbiorem wytycznych i komponentów, które ujednolicają wygląd projektu. Korzystanie z własnego design systemu buduje u odbiorców skojarzenie z marką. Dokumentacja bibliotek wewnętrznych jest często oparta na [storybooku](https://storybook.js.org). Wśród najpopularniejszych bibliotek komponentów można wymienić:

-   [antd design](https://ant.design/components/overview/),
-   [chakra UI](https://chakra-ui.com/getting-started),
-   [material UI](https://mui.com/material-ui/getting-started/overview/) <br />
    Dla osób lubiących tailwind również powstała biblioteka otwartoźródłowych komponentów stworzonych za pomocą tailwind css. Można sie z nią zapoznać [tutaj](https://www.hyperui.dev)

## Material UI

Przyjrzyjmy się teraz trochę dokładniej bibliotece komponentów Material UI. Na początek instalujemy paczkę w projekcie

```
npm install @mui/material @emotion/react @emotion/styled
```

MUI wymaga również emotion do stylowania komponentów, a niektóre komponenty korzystają z ikon MUI, więc zainstalujemy je również

```
npm install @mui/icons-material
```

Na stronie MUI możesz się zapoznać z wszystkimi dostępnymi komponentami
![mui main page](./assets/mui.PNG)

Wybierzmy komponent w sekcji Navigation i Menu, a następnie przejdźmy do sekcji Account Menu
![mui avatar](./assets/avatar.PNG)
Wystarczy teraz wybrać czy projekt piszemy w JS czy w TS, a następnie skopiować kod. Elementy z MUI możemy stylować za pomocą propsa sx tak jak za pomocą inline css. Oprócz tego każdy komponent ma swoje API, z różnymi możliwymi właściwościami jako propsy. W tym przypadku Menu ma na przykład propsa open, onClose, onClick. <br />
Po skopiowaniu kodu komponentu i dodaniu go na stronę otrzymamy następujący efekt
![menu](./assets/menu.PNG)

Po więcej zapraszam do dokumentacji [MUI](https://mui.com/material-ui/getting-started/overview/)

## Obsługa formularzy

Kiedyś spotkałem się ze stwierdzeniem, że każda aplikacja jest po prostu CRUDem (Create Read Update Delete - podstawowe operacje wykonywane na bazie danych). Częściowo się z tym zgodzę, bo każda aplikacja zawiera te elementy, ale CRUD to nie wszystko ;) <br />
Do wykonywania tych operacji będziemy potrzebowali umożliwić użytkownikowi wprowadzanie danych. Do tej operacji jak już się pewnie domyślasz będą służyły formularze. Do obsługi formularzy powstało również wiele bibliotek. Te z którymi najczęściej się spotykam to [formik](https://formik.org) oraz [react-hook-form](https://react-hook-form.com)<br />

Przyjrzyjmy się trochę bliżej bibliotece formik. <br />
Na początek tak jak zwykle musimy ją dodać do projektu

```
    npm install formik
```

Według tutoriala na głównej stronie powinniśmy przekazywać do propsów wartości początkowe, walidację i funkcję onSubmit. Niestety jest to zły wzorzec, ponieważ mieszamy komponent z logiką. O wiele lepiej użyć przygotowanego przez twórców formika hooka useFormik, który później może być wyniesiony do custom hooka komponentu.

```js
import { useFormik } from "formik";

type FormValues = {
    name: string,
    email: string,
};

function App() {
    const formik =
        useFormik <
        FormValues >
        {
            initialValues: {
                name: "",
                email: "",
            },
            onSubmit: (values: FormValues) => {
                alert(JSON.stringify(values, null, 2));
            },
        };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
            </div>
            <button type="submit">Send</button>
        </form>
    );
}

export default App;
```

-   Każdy input musi mieć swojego labela.
-   Hook useFormik przyjmuje obiekt konfiguracyjny, który zawiera wartości początkowe (initial values), funkcję onSubmit (wysyłka formularza),
-   do inputów podajemy obecne wartości w propie value za pomocą formik.values.nazwa z initial value np. formik.values.email,
-   do zdarzenia onChange podajemy wygenerowane przez formika zdarzenie formik.handleChange, jego obsługą zajmuje się biblioteka, <br />

Zauważ że w zdarzeniu onSubmit nie trzeba przerywać zdarzenia za pomocą e.preventDefault() robi to za nas biblioteka. Po kliknięciu buttona send i wysłaniu formularza pojawia się alert z sformatowaną treścią

![form](./assets/form.PNG)

## Walidacja

Aby zmniejszyć ilość wysyłanych błędnych zapytań na serwer powinniśmy również walidować (sprawdzić czy dane zostały wprowadzone prawidłowo) zapytanie przed jego wysłaniem. Do tego przyda się nam biblioteka yup (nikt przecież nie chce męczyć się za pomocą regexpów ;). Inna popularna biblioteka to [joi](https://github.com/hapijs/joi). Na frontendzie nie da się zwalidować wszystkiego np. czy podany email jest już w systemie, ale za pomocą podstawowej walidacji, czyli np. czy pola są wypełnione, czy pole email zawiera @, czy konto bankowe ma odpowiednią długość jesteśmy w stanie znacząco odciążyć serwer. <br />

Zainstalujmy [yup](https://github.com/jquense/yup)'a

```
    npm install yup
```

UWAGA: yup ma obecnie wersję pre-release 1.0, która jest poprawnie otypowana i wprowadza kilka nowości związanych z typescriptem, więcej [tutaj](https://github.com/jquense/yup/tree/pre-v1)

Do formularza zdefiniowanego wyżej dodajmy schemat walidacji i nowe pole age.

```js
import { useFormik } from "formik";
import * as yup from "yup";

const yupSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    age: yup.number().min(1).max(115).required(),
});

type FormValues = yup.InferType<typeof yupSchema>;

function App() {
    const formik =
        useFormik <
        FormValues >
        {
            initialValues: {
                name: "",
                email: "",
                age: "",
            },
            onSubmit: (values: FormValues) => {
                alert(JSON.stringify(values, null, 2));
            },
            validationSchema: yupSchema, //wpięcie schematu walidacji
        };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
            </div>
            <div>
                <label htmlFor="age">Age</label>
                <input type="number" id="age" name="age" onChange={formik.handleChange} value={formik.values.age} />
            </div>
            <button type="submit">Send</button>
        </form>
    );
}

export default App;
```

Przyjrzyjmy się bliżej stworzonemu schematowi walidacji

```js
const yupSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    age: yup.number().min(1).max(115).required(),
});
```

Oczekujemy, że otrzymany obiekt będzie obiektem, który ma pola:

-   name, które jest stringiem i jest wymagane,
-   email, które jest stringiem, mailem i jest wymagane,
-   age, które jest liczbą o wartości minimalnej 1 i maksymalnej 115 oraz jest wymagane, <br />
    Wszystkie dostępne funkcje walidujące znajdziesz w dokumentacji [yup](https://github.com/jquense/yup)'a <br />

Gdy wprowadzone dane są nieprawidłowe alert się nie wyświetli. Niestety użytkownik nie wie co się dzieje. Czas to zmienić! Wprowadźmy informacje o błędach. <br />

Do odczytania błędu użyjemy oczywiście biblioteki formik, przechowuje ona informacje o błędach w podobiekcie formika - errors

```js
<p style={{ color: "red" }}>{formik.errors.age}</p>
```

Niestety przy takim zapisie informacja o błędzie pojawia się jeszcze przed dotknięciem pola formularza, a nie chcemy "krzyczeć" na użytkownika skoro jeszcze nic nie zrobił. Musimy zapisać czy użytkownik dotknął już pola. Do tego służy kolejny podobiekt formika - touched. Za jego aktualizację odpowiada funkcja onBlur, którą dopisujemy do pola input. Następnie sprawdzamy czy pole zostało dotknięte i czy ma error, jeśli ma wyświetlamy je

```js
<div>
    <label htmlFor="age">Age</label>
    <input type="number" id="age" name="age" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.age} />
    {formik.touched.age && formik.errors.age ? <p style={{ color: "red" }}>{formik.errors.age}</p> : null}
</div>
```

## Integracja pomiędzy bibliotekami

Zintegrujmy teraz formika oraz yupa z MUI. Potrzebny nam będzie komponent [TextField](https://mui.com/material-ui/react-text-field/)
Podmieniamy powyższy kod wykorzystując api textfield'a na:

```js
<TextField
    error={Boolean(formik.touched[accessor] && formik.errors[accessor])} //oznacza pole na czerwono
    helperText={formik.touched.name && formik.errors.name ? formik.errors.name : null} // wyswietla text pomocniczy pod spodem
    id="name"
    label="Name"
    name="name"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.name}
/>
```

Pole po zwalidowaniu wygląda następująco (możemy je oczywiście ostylować):<br />
![input](./assets/input.PNG)
<br />
Na widoku mamy jeszcze pewien mankament. Mianowicie yup wyświetla domyślny text pomocniczy. Możemy go zmienić przekazując zgodnie z dokumentacją yupa text pomocniczy do funkcji walidujących.

```js
const yupSchema = yup.object({
    name: yup.string().required("Imie jest wymagane"),
    email: yup.string().email("Podana fraza nie jest emailem").required("Email jest wymagany"),
    age: yup.number().min(1, "Wiek musi być większy od 1").max(115, "Jesteś najstarszym człowiekiem świata?").required("Wiek jest wymagany"),
});
```

Idąc za ciosem, ulepszając to co mamy zrobione do tej pory zrefaktorujmy nasz widok wyodrębniając z niego komponent inputu, wiele kodu w jego wnętrzu się powtarza. Finalny kod:

```js
import { useFormik, FormikProps } from 'formik';
import { InferType, string, object, number } from 'yup';
import TextField from '@mui/material/TextField';

const yupSchema = object({
  name: string().required("Imie jest wymagane"),
  email: string().email("Podana fraza nie jest emailem").required("Email jest wymagany"),
  age: number().min(1,"Wiek musi być większy od 1").max(115,"Jesteś najstarszym człowiekiem świata?").required("Wiek jest wymagany"),
});

type FormValues = InferType<typeof yupSchema>;

const FormInput = ({
  formik,
  accessor,
}: {
  formik: FormikProps<FormValues>;
  accessor: keyof FormValues;
}) => {
  return (
    <div>
      <TextField
        error={Boolean(formik.touched[accessor] && formik.errors[accessor])}
        helperText={
          formik.touched[accessor] && formik.errors[accessor]
            ? formik.errors[accessor]
            : null
        }
        id={accessor}
        label={accessor}
        name={accessor}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[accessor]}
      />
    </div>
  );
};

export function Form() {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      email: '',
      age: 0,
    },
    validationSchema: yupSchema,
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormInput formik={formik} accessor='name' />
      <FormInput formik={formik} accessor='email' />
      <FormInput formik={formik} accessor='age' />
      <button type='submit'>Send</button>
    </form>
  );
}

export default Form;
```

i widok z errorami

![final form](./assets/finalform.PNG)

### Przykład dla generycznego FormInputa

```js
export type FormValues = InferType<typeof yupSchema>;

function TextInput<T>({formik,acc}:{formik:FormikProps<T>; acc: keyof T}) {
  return (
<TextField
 error={Boolean(formik.touched[acc]) && Boolean(formik.errors[acc])}
 helperText={
        formik.touched[acc] && formik.errors[acc]
          ? (formik.errors[acc] as string)
          : null
      }
 id={acc}
 name={acc}
 label={acc}
 onChange={formik.handleBlur}
 value={formik.values[acc]}
 />
  );
}

function CreateNewInvoice() {
  const formik = useFormik<FormValues>({
initialValues: {
companyName: "",
street: "",
localNumber: 0,
city: "",
postalCode: "",
email: "",

orderName: "",
brutto: 0
},
validationSchema: yupSchema,
    onSubmit: (values) => {
      console.log(values, null, 2);
}
});

  return (
<div>
<form onSubmit={formik.handleSubmit}>
<TextInput<FormValues> formik={formik} acc={"companyName"} />
<TextInput<FormValues> formik={formik} acc={"street"} />
<TextInput<FormValues>formik={formik} acc={"localNumber"} />
<TextInput<FormValues> formik={formik} acc={"city"} />
<TextInput<FormValues> formik={formik} acc={"postalCode"} />
<button type="submit">Submit</button>
</form>
</div>
  );
}
```

## Podstrony i nawigowanie pomiędzy nimi

Aplikacje reactowe to SPA (Single Page App), cała aplikacja wyświetla się na jednej stronie i musimy unikać przeładowań. Przechodzenie pomiędzy stronami w tradycyjnej formie sprawi, że zgubimy stan. W React strony podmieniamy za pomocą JSa, treść jest podmieniana dynamicznie. Aby stworzyć iluzję przechodzenia zgodnie z linkami pomiędzy stronami dla użytkownika powstała biblioteka [react-router](https://reactrouter.com/en/main). Zainstalujmy ją

```
npm install react-router-dom
```

Na początek trzeba opakować aplikację w BrowserRouter z react-router-dom, a następnie możemy tworzyć ścieżki.

```js
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<div>Page 1</div>} path="" />
                <Route path="/business">
                    <Route index element={<div>Business</div>} />
                    <Route element={<div>Business/clients</div>} path="clients" />
                    <Route path="orders">
                        <Route index element={<div>Business/orders</div>} />
                        <Route path=":orderId" element={<div>Business/order/id</div>} />
                    </Route>
                </Route>
                <Route element={<div>404</div>} path="*" />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
```

W miejsce propsa element możemy oczywiście później włożyć komponent, a w miejsce path wpisujemy ścieżkę pod jaką komponent powinien się wyświetlić. Komponent Route obsługujący ścieżki pozwala na zagnieżdżanie w sobie ścieżek, przy zagnieżdżeniu nie podajemy do rotute element tylko określoną ścieżkę, a następnie w dziecku oznaczamy jeden route jako index. To on wyświetli się jako główny. <br />
React router dom pozwala też na tworzenie dynamicznych ścieżek, wtedy w property path podajemy nazwę ścieżki z znakiem : (dwukropek) na początku. Będzie to później traktowane jako zmienna, którą możemy odczytać i z niej korzystać. <br />
Za pomocą dodatkowego wpisu w ścieżkę, możemy zabezpieczyć naszą aplikację i przechwytywać wszystkie niewymienione wcześniej ścieżki.

```js
<Route element={<div>404</div>} path="*" />
```

Ważne jest to aby wpis ten znalazł się na samym dole, ponieważ react-router-dom sprawdza te ścieżki od góry do dołu. <br />

Ścieżki już mamy ale brakuje nam nawigacji. Nawigacja powinna być elementem wspólnym dla wszystkich tych komponentów. Często spotyka się komponent Layout, który opatula wszystkie ścieżki w sobie, dzięki temu unikamy pisania nadmiarowego kodu lub niepotrzebnych importów. Stwórzmy więc komponent navigation. Pamiętaj, że nie możemy użyć HTMLowego tagu a z hrefem, bo to spowoduje przeładowanie strony. Zamiast tego używamy komponentu Link zaimportowanego z React router Dom

```js
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/business">Business</Link>
                    </li>
                    <li>
                        <Link to="/business/clients">Clients</Link>
                    </li>
                    <li>
                        <Link to="/business/orders">Orders</Link>
                    </li>
                    <li>
                        <Link to="/business/orders/1">Order 1</Link>
                    </li>
                    <li>
                        <Link to="/business/orders/add">Add</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
```

Teraz w komponent App pomiędzy Routes możemy dodać nawigację i będzie ona widoczna na wszystkich ścieżkach.

```js
function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
```

Aby tworzyć dynamiczne linki wykorzystujemy wstrzykiwanie wartości do stringa np.

```js
`/bussiness/orders/${el.id}`;
```

Wspomniałem wcześniej o możliwości odczytu wartości z URLa wewnątrz komponentu, więc zapoznajmy się z tym. Stwórzmy komponent SingleOrder i dodajmy go w miejsce propa element w routingu naszej aplikacji.

```js
<Route path=":orderId" element={<SingleOrder />} />
```

W komponencie SingleOrder wykorzystamy otrzymanego z biblioteki React router dom hooka useParams()

```js
import { useParams } from "react-router-dom";

export const SingleOrder = () => {
    const param = useParams();
    console.log(param); // {orderId: '1'}
    return <div>SingleOrder</div>;
};
```

Zauważ, że nazwa orderId wzięła się z komponentu route, w którym podaliśmy że w tym miejscu będzie dynamiczny parametr o nazwie orderId <br />

Czasem zdarza się, że musimy z poziomu programu przekierować użytkownika na inną stronę, np. wtedy gdy nie jest zalogowany, a próbuje wejść w miejsce dostępne tylko dla zalogowanych użytkowników. Do tego posłuży nam hook useNavigate, który jako parametr przyjmuje ścieżkę na którą ma przekierować.

```js
import { useNavigate } from "react-router-dom";
function useLogoutTimer() {
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserAuthenticated()) {
            navigate("/home");
        }
    }, []);
}
```

## Podsumowanie

Ciąg dalszy w części 2
