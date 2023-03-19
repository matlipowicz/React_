import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AsideMenu } from "./components/aside_menu/AsideMenu";
import { Clients, Orders, Invoices, Posts, Home } from "./components/pages/CombinedPages";
import ClientCard from "./components/clients_form/card/ClientCard";
import { ClientDetails } from "./components/clients_form/card/ClientDetails";
import { AddUserForm } from "./components/clients_form/form/AddUserForm";
import { OrdersForm } from "./components/clients_form/form/OrdersForm";
import { FakeRegister } from "./components/register/FakeRegister";
import { FakeLogin } from "./components/login/FakeLogin";
import { EditUser } from "./components/clients_form/edit_user/Edit";
import { OrderDetails } from "./components/orders/OrderDetails";

function App() {
    //? Możemy tutaj uzyć useRoutes()? Jeżeli są jakieś chlid-y i jest to generowane z tablicy, to chyba tak?

    return (
        <BrowserRouter>
            <AsideMenu />
            <Routes>
                <Route path="/" element={<FakeLogin />} />
                <Route path="/clients">
                    <Route index element={<Clients />} />
                    <Route path="add" element={<AddUserForm />} />
                    <Route path=":clientId">
                        <Route index element={<ClientDetails />} />
                        <Route path="edit" element={<EditUser />} />
                    </Route>
                </Route>
                <Route path="/orders">
                    <Route index element={<Orders />} />
                    <Route path="add" element={<OrdersForm />} />
                    {/* @ts-ignore */}
                    <Route path=":orderId" element={<OrderDetails />} />
                </Route>
                <Route path="/register" element={<FakeRegister />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="*" element={<div className="page">404 - Not Found</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
