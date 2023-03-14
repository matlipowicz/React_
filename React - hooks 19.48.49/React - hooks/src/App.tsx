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
// import { Reducer } from "./components/Task-9/useReducer/Reducer";
import { Cart } from "./components/Task-9/cart/Cart";

function App() {
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
            <Cart />
            {/* //* Libraries */}
            {/* <Form /> */}
        </>
    );
}

export default App;
