import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AsideMenu } from "./components/aside_menu/AsideMenu";
import { Clients, Orders, Invoices, Posts, Home } from "./components/pages/CombinedPages";
import ClientCard from "./components/clients_form/card/ClientCard";
import { ClientDetails } from "./components/clients_form/card/ClientDetails";
import { Form } from "./components/clients_form/form/Form";

function App() {
    //? Możemy tutaj uzyć useRoutes()? Jeżeli są jakieś chlid-y i jest to generowane z tablicy, to chyba tak?

    return (
        <BrowserRouter>
            <AsideMenu />
            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/clients">
                    <Route index element={<Clients />} />
                    <Route path="add" element={<Form />} />
                    <Route path=":clientId">
                        <Route index element={<ClientDetails />} />
                        <Route path="edit" element={<div>Edit</div>} />
                    </Route>
                </Route>
                <Route path="/orders" element={<Orders />}>
                    <Route path=":orderId" />
                    <Route path="add" element={<div className="page">Add order</div>} />
                </Route>
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="*" element={<div className="page">404 - Not Found</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
