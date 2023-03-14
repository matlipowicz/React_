import { TextField, Box } from "@mui/material";
import { useFormik } from "formik";
import { object, InferType, string, number } from "yup";
import style from "./Form.module.css";
import { addClient } from "../../../api/clients";

const ClientAddValidationSchema = object().shape({
    name: string().required().min(3),
    surname: string().required().min(3),
    street: string().required().min(5),
    postCode: string()
        .required()
        .matches(/[0-9]{2}-[0-9]{3}/),
    town: string().required().min(3),
    subRegion: string().min(3).optional(),
    imgSrc: string().optional(),
    phoneNumber: string()
        .required()
        .matches(/\+[0-9]{11}/),
});

type FormValues = InferType<typeof ClientAddValidationSchema>;

export const Form = () => {
    const formik = useFormik<FormValues>({
        initialValues: {
            name: "",
            surname: "",
            street: "",
            postCode: "",
            town: "",
            subRegion: "",
            imgSrc: "",
            phoneNumber: "",
        },
        // validationSchema: ClientAddValidationSchema,
        onSubmit: (values) => {
            addClient(values).then((data) => console.log("dodany", data));
        },
    });
    return (
        <form className={style.user__form} onSubmit={formik.handleSubmit}>
            <Box
                sx={{
                    width: "500px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    padding: "10px",
                    borderRadius: "2px",
                }}
            >
                <TextField id="input__name" name="name" label="Name" variant="filled" color="secondary" onChange={formik.handleChange} />
                <TextField id="input__surname" label="Surname" variant="filled" color="secondary" onChange={formik.handleChange} />
                <TextField id="input__surname" label="Street" variant="filled" color="secondary" onChange={formik.handleChange} />
                <TextField id="input__surname" label="Postal Code" variant="filled" color="secondary" onChange={formik.handleChange} />
                <TextField id="input__surname" label="City" variant="filled" color="secondary" onChange={formik.handleChange} />
                <TextField id="input__surname" label="Sub Region" variant="filled" color="secondary" onChange={formik.handleChange} />
                <TextField id="input__surname" label="Photo link" variant="filled" color="secondary" onChange={formik.handleChange} />
                <TextField id="input__surname" label="Phone number" variant="filled" color="secondary" onChange={formik.handleChange} />
            </Box>

            <div className={style["user__btn--container"]}>
                <button type="submit" className="user__btn--udpate">
                    Update
                </button>
                <button className="user__btn--cancel">Cancel</button>
            </div>
        </form>
    );
};
