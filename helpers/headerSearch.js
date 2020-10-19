import { useFormik } from "formik";
import { useRouter } from "next/router";
import { MDBFormInline } from "mdbreact";

export const HeaderSearch = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      if (values.title.length > 0) {
        router.push({
          pathname: "/posts/search",
          query: {
            title: values.title,
            page: 1,
          },
        });
      }
    },
  });

  return (
    <MDBFormInline waves onSubmit={formik.handleSubmit}>
      <div className="md-form my-0">
        <input
          className="form-control mr-sm-2"
          type="text"
          name="title"
          value={formik.values.title}
          placeholder="Search"
          aria-label="Search"
          onChange={formik.handleChange}
        />
      </div>
    </MDBFormInline>
  );
};
