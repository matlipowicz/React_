import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Hooks } from "./components/lesson/useState";
import { Effect } from "./components/lesson/useEffect";
// import { Form } from "./components/lesson/useRef";

import { BusTable } from "./components/Task-1/bus-table_list";
import { Posts } from "./components/Task-2-4/Posts";
import { ExampleEvent } from "./components/Task-5/handle_event/ExampleEvent";
import { RenderCard } from "./components/Task-6/card/RenderCard";
// import { Form } from "./components/Form";
import { AsideMenu } from "./components/Task-8/menu/AsideMenu";

import cartReducer, { ACTIONS, initialState, InitialData } from "./components/Task-9/useReducer/Reducer";
import Reducer from "./components/Task-9/useReducer/Reducer";
import { Cart } from "./components/Task-9/cart/Cart";
import { useReducer } from "react";

function App() {
    const reducer = cartReducer;
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            {/* <Hooks /> */}
            {/* <Effect /> */}
            {/* <Form /> */}
            {/*//! EX.1 */}
            {/* <BusTable /> */}
            {/* //!Ex.2 - 4 */}
            {/* <Posts /> */}
            {/* //! Ex.5 */}
            {/* <ExampleEvent /> */}
            {/* //! Ex.6 */}
            {/* <RenderCard /> */}
            {/* //! Ex.8 */}
            {/* <AsideMenu /> */}
            {/* //! Ex.9 */}
            {/* <Reducer /> */}

            <Cart state={state} dispatch={dispatch} />
            {/* //* Libraries */}
            {/* <Form /> */}
        </>
    );
}

export default App;
