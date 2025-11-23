import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please Enter your name"),
  email: Yup.string().email().required("Please Enter your email"),
  password: Yup.string().min(6).required("Please Enter your password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const loginSchema = Yup.object({
  loginEmail: Yup.string().email("Invalid email").required("Email is required"),
  loginPassword: Yup.string().required("Password is required"),
});

export const createEditProdcutSchema = Yup.object({
  name: Yup.string().min(2).max(100).required("Product name is required"),
  title: Yup.string().required("Product category is required"),
  description: Yup.string().required("Product description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Product price is required"),
  sale: Yup.boolean().default(false),
  sale_price: Yup.number().when("sale", {
    is: true,
    then: (schema) =>
      schema
        .typeError("Sale price must be a number")
        .positive("Sale price must be positive")
        .required("Sale price is required when product is on sale"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
