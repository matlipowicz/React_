# TypeScript w React

## Typowanie komponentów

Powtórzenie najczęściej używanych typów w React:

```ts
type BasicProps = {
  status: 'loading' | 'error' | 'success'; // union types
  sampleAnimal: {
    name: string;
    age: number;
  }; // typowanie kluczy i wartości w obiekcie
  sampleAnimalArr: {
    name: string;
    age: number;
  }[]; //tablice obiektów
  function: () => void; //funkcje nie zwracające nic
  callback: (a: number) => number; //funkcja przyjmująca parametr a będący numerem i zwracająca zmienną typu number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode; // inny komponent
};
```

## Czym różni się type od interface?

Teoretycznie nie różni się to niczym oprócz składni, natomiast jest kilka wskazówek kiedy używać interface, a kiedy type, które chciałbym tutaj przytoczyć.<br />
Zawsze używaj interface dla API publicznych albo bibliotek zewnętrznych, ponieważ to pozwala na rozszerzanie ich innym za pomocą tzw. "declaration merging" np.

```ts
interface Props1 {
  age: number;
}
interface Props1 {
  name: string;
}
```

wygeneruje nam w runtime

```ts
interface Props1 {
  age: number;
  name: string;
}
```

Typów używaj do swoich komponentów reactowych i gdy potrzebujesz tzw. aliasu czyli innej nazwy dla interfejsu lub typu. Pamiętaj, że typu nie można rozszerzać (extends) przez interfejs. Typy możemy również mapować, za pomocą utility types, o których będzie później. <br />

W wielu miejscach możesz spotkać się z typem React.FC, który przed React 18 dodawał do definicji również opcjonalnego childrena. Nie zawsze chcemy, aby nasz komponent przyjmował dzieci, a on to nieświadomie nam umożliwiał, dlatego zalecam unikanie go

### useRef

UseRef zwraca referencję typu read-only albo mutowalną referencję, w zależności czy argument początkowy pokrywa przekazany typ czy nie.

#### ref jako mutowalna wartość

```js
function MutableRef() {
  const intervalRef = (useRef < number) | (null > null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log('test');
    }, 100);
    return () => {
      intervalRef && intervalRef.current && clearInterval(intervalRef.current);
    };
  }, []);

  return <></>;
}
```

### ref do innego komponentu Reactowego

Do przekazania refa do innego komponentu potrzebujemy mechanizmu forwardRef, jest to przekazywanie refa do dziecka danego komponentu. <br />

Zacznijmy od komponentu Button

```js
import { ReactNode } from 'react';

type BtnProps = { children: ReactNode, type: 'submit' | 'button' };

export const Button = ({ type, children }: BtnProps) => {
  return <button type={type}>{children}</button>;
};
```

Dodajmy do komponentu możliwość przekazywania refa za pomoca mechanizmu forwardingRef.

```js
import {ReactNode,forwardRef} from "react"

type BtnProps={children: ReactNode, type: 'submit'|'button'}

export const Button=forwardRef<HTMLButtonElement, BtnProps>((props,ref)=>{
  return <button ref={ref} type={props.type}>{props.children}</button>
})
```

Dodajemy forwardRef aby przekazać ref jako props, a potem przekazać go niżej. ForwardRef jest generykiem zdefiniowanym w typach reacta.

```js
// react.d.ts
function forwardRef<T, P = {}>(
  Component: RefForwardingComponent<T, P>
): ComponentType<P & ClassAttributes<T>>
```

- T - to DOM element,
- P - to propsy,
- typ zwracany zwraca komponent z refem i atrybutami <br/>
  Teraz mozemy użyć tego komponentu i przekazać mu ref.

```js
const App=()=>{
  const ref=createRef<HTMLButtonElement>();
  return <Button ref={ref} type="button" >Click me!</Button>
}
```

## Eslint i prettier

Eslint to narzędzie do statycznej analizy kodu, które pozwala na utrzymywanie w projekcie jednakowej stylistyki i zapobiega powstawaniu częstych błędów. Eslint składa się z pojedynczych reguł, ale też z pluginów czyli paczek reguł do zastosowania.

Prettier to formater kodu który jest kompatybilny z wieloma językami programowania i edytorami kodu.

Instalacja:

```js
npm install --save-dev eslint prettier
npx eslint --init
```

Wybierz odpowiednie opcje:
check syntax and find problems,
JavaScript modules
React
TypeScript Yes
Browser
JSON
Doinstalowanie Yes
npm w naszym przypadku

Powstał plik .eslintrc.json

doinstalujmy pluginy:

```js
npm install --save-dev eslint-plugin-react-hooks eslint-plugin-react eslint-plugin-jsx-a11y eslint-plugin-simple-import-sort @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-unused-imports
```

i dodajmy go do pliku konfiguracyjnego

```
"extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "prettier",
        "plugin:simple-import-sort"
    ],
```

To doda nam między innymi pilnowanie czy nie łamiemy zasad hooków i czy nie zapomnieliśmy dodać czegoś do dependency array w hookach useMemo, useCallback, useEffect

Reguły

"rules": {
"react/react-in-jsx-scope": "off",
"arrow-body-style": ["error", "as-needed"], // wyrzuca niepotrzebne return z arrow functions
"react/self-closing-comp": ["error", { "component": true, "html": true }], // pilnuje żeby zamykać tagi które się da od razu
}

obrona przed błędami w jest
"env": {
"browser": true,
"es2021": true,
"jest": true
}

Finalny plik:

```
{
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "overrides": [
    // override "simple-import-sort" config
    {
      "files": ["*.js", "*.jsx", "*.ts", "*.tsx"],
      "rules": {
        "simple-import-sort/imports": [
          "error",
          {
            "groups": [
              // Packages `react` related packages come first.
              ["^react", "^@?\\w"],
              // Internal packages.
              ["^(@|components)(/.*|$)"],
              // Side effect imports.
              ["^\\u0000"],
              // Parent imports. Put `..` last.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Other relative imports. Put same-folder imports and `.` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              // Style imports.
              ["^.+\\.?(css)$"]
            ]
          }
        ]
      }
    }
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": ["./tsconfig.json"]
  },
  "plugins": ["react", "@typescript-eslint","simple-import-sort","eslint-plugin-unused-imports"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "unused-imports/no-unused-imports": "warn",
    "react/no-array-index-key": "warn",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "arrow-body-style": ["error", "always"],
    "react/self-closing-comp": ["error", { "component": true, "html": true }],
    "react/function-component-definition": [
      2,
      {
        "namedComponents": "arrow-function"
      }
    ],
    "no-console": "error"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

Możemy też dodać plik .eslintignore do wskazania plików których eslint ma nie sprawdzać. Plik tworzymy w folderze głównym. Dopisujemy do niego na przykład:
vite-env.d.ts

do package.json możemy dodać skrypty

"lint": "eslint src/**/\*.{js,jsx,ts,tsx,json}",
"lint:fix": "eslint --fix src/**/_.{js,jsx,ts,tsx,json}",
"format": "prettier --write src/\*\*/_.{js,jsx,ts,tsx,css,md,json,scss} --config ./.prettierrc"

plik .prettierrc dla prettiera

```
{
"semi": true,
"tabWidth": 2,
"printWidth": 100,
"singleQuote": true,
"trailingComma": "all",
"jsxSingleQuote": true,
"bracketSpacing": true
}
```

Husky
npm i --save-dev husky
npx husky install
npx husky add .husky/pre-commit - dodanie hooka pre-commit
npm i --save-dev lint-staged

w package.json dodajemy:

```
"scripts": {
    "lint": "eslint --fix --ext .ts,.tsx ./src"
  },
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": [
      "npm run lint"
    ]
}
```

## Dodatkowe materiały:

[hooki w TSie](https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d)<br />
[generyki, conditional types, mapped types](https://www.youtube.com/watch?v=PJjeHzvi_VQ)<br />
[kurs zaawansowany tsa](https://type-level-typescript.com)<br />
[zaawansowany kurs TSa](https://egghead.io/courses/practical-advanced-typescript)

[Matt Pocock](https://www.youtube.com/watch?v=p6dO9u0M7MQ)<br />

TODO: konfiguracja eslinta
