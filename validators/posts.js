import * as Yup from "yup";

export const postCreateSchema = Yup.object({
  title: Yup.string()
    .min(3, "3 characters minimum")
    .required("Title is required"),
  description: Yup.string()
    .required("Description is required")
    .max(150, "150 characters maximum"),
  postsCategoryId: Yup.string().required("Category is required"),
  read_time: Yup.number().required("Read time estimated is required"),
  picture: Yup.array().required("Image is required"),
});
