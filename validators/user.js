import * as Yup from "yup";

export const userLoginSchema = (username, password) => {
  return Yup.object({
    username: Yup.string().required(username),
    password: Yup.string().required(password),
  });
};

export const userRegisterSchema = (username, password, fullName) => {
  return Yup.object({
    username: Yup.string().required(username),
    password: Yup.string().required(password),
    fullName: Yup.string().required(fullName),
  });
};

export const sendingMailSchema = (email, emailReq, name, message) => {
  return Yup.object({
    email: Yup.string().required(emailReq).email(email),
    name: Yup.string().required(name),
    message: Yup.string().required(message),
  });
};
