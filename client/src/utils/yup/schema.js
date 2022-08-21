import * as yup from "yup";

export const schemaSignup = yup
  .object()
  .shape({
    name: yup.string().required("Name cannot be empty"),
    email: yup.string().email().required("Email cannot be empty"),
    password: yup.string().min(8).required("Password cannot be empty"),
  })
  .required();

export const schemaLogin = yup
  .object()
  .shape({
    email: yup.string().email().required("Email cannot be empty"),
    password: yup.string().min(8).required("Password cannot be empty"),
  })
  .required();
