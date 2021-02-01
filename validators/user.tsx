import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export const userLoginSchema = () => {
  const { t } = useTranslation();
  return Yup.object({
    username: Yup.string().required(t("Validators.user.userLogin.username")),
    password: Yup.string().required(t("Validators.user.userLogin.password")),
  });
};

export const userRegisterSchema = () => {
  const { t } = useTranslation();
  return Yup.object({
    username: Yup.string().required(t("Validators.user.userRegister.username")),
    password: Yup.string().required(t("Validators.user.userRegister.password")),
    fullName: Yup.string().required(t("Validators.user.userRegister.fullName")),
  });
};

export const sendingMailSchema = (email, emailReq, name, message) => {
  return Yup.object({
    email: Yup.string().required(emailReq).email(email),
    name: Yup.string().required(name),
    message: Yup.string().required(message),
  });
};
