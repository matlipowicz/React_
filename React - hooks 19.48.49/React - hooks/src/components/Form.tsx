import { useFormik } from "formik";
import * as yup from "yup";

const yupSchema = yup.object({
    name: yup.string().required("Imie jest wymagane"),
    email: yup.string().email("Podana fraza nie jest emailem").required("Email jest wymagany"),
    age: yup.number().min(1, "Wiek musi być większy od 1").max(115, "Jesteś najstarszym człowiekiem świata?").required("Wiek jest wymagany"),
});

type FormValues = yup.InferType<typeof yupSchema>;

export function Form() {
    const formik = useFormik<FormValues>({
        initialValues: {
            name: "",
            email: "",
            age: 0,
        },
        validationSchema: yupSchema, //wpięcie schematu walidacji
        onSubmit: (values: FormValues) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

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
                {formik.touched.age && formik.errors.age ? <p style={{ color: "red" }}>{formik.errors.age}</p> : null}
            </div>
            <button type="submit">Send</button>
        </form>
    );
}

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
                        <Route path=":orderId" element={<div>Business/orders/id</div>} />
                    </Route>
                </Route>
                <Route element={<div>404</div>} path="*" />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

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
