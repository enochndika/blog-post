import * as Yup from 'yup';

export const postCreateSchema = Yup.object({
  title: Yup.string()
    .min(3, '3 caractères minimum')
    .required('Titre ne peut pas etre vide'),
  description: Yup.string()
    .required('Description ne peut pas etre vide')
    .max(200, '200 caractères maximum'),
  postsCategoryId: Yup.string().required('Catégorie est requis'),
  read_time: Yup.number().required('Temps de lecture est requis'),
});
