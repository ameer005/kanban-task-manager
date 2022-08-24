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

export const boardSchema = yup
  .object()
  .shape({
    name: yup.string().required("Board name cannot be empty"),
    columns: yup.array().of(
      yup.object().shape({
        name: yup.string().required("column name cannot be empty"),
      })
    ),
  })
  .required();

export const taskSchema = yup
  .object()
  .shape({
    title: yup.string().required("Board name cannot be empty"),
    description: yup.string(),
    status: yup.string().required(),
    subTasks: yup.array().of(
      yup.object().shape({
        name: yup.string().required("column name cannot be empty"),
        isCompleted: yup.boolean(),
      })
    ),
  })
  .required();
