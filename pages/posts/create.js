import DefaultLayout from "../../components/layout/default";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getCookieFromBrowser } from "../../auth/cookies";
import { useRouter } from "next/router";
import { Pills } from "../../components/pills";
import { Modal } from "../../components/modal";
import { MDBBtn, MDBCol, MDBInput, MDBRow } from "mdbreact";
import { FormError } from "../../components/formError";
import { Option } from "../../utils/option";
import { UploadFile } from "../../components/uploadForm";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  addPicture,
  addPost,
  fetchCategories,
} from "../../utils/actions/postActions";
import { loggedUser } from "../../auth/useUser";
import { useFormik } from "formik";
import { EditorState } from "draft-js";
import { postCreateSchema } from "../../validators/posts";
import { stateToHTML } from "draft-js-export-html";
import Head from "next/head";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);

export default function CreatePost() {
  const router = useRouter();
  const { user } = loggedUser();
  const { categories } = fetchCategories();
  const [loading, setLoading] = useState(false);
  const token = getCookieFromBrowser("blog-jwt-token");

  const styles = {
    wrapperStyle: {
      border: "2px solid #2299dd",
    },
  };

  useEffect(() => {
    if (!token) {
      router.replace("/");
    }
  }, [token, router]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      postsCategoryId: "",
      read_time: "",
      picture: [],
      content: EditorState.createEmpty(),
    },
    validationSchema: postCreateSchema,
    onSubmit: async (values) => {
      if (user) {
        setLoading(true);
        await addPost(user?.id, values);
        setLoading(false);
        await router.push("/[username]/posts", `/${user.username}/posts`);
      }
    },
  });

  const convertDescriptionFromJSONToHTML = () => {
    try {
      return {
        __html: stateToHTML(formik.values.content.getCurrentContent()),
      };
    } catch (exp) {
      console.log(exp);
      return { __html: "Error" };
    }
  };

  return (
    <>
      {token && (
        <>
          <Head>
            <title>Add a post</title>
          </Head>
          <Pills
            preview={
              <div
                dangerouslySetInnerHTML={convertDescriptionFromJSONToHTML()}
                className="mt-5"
              />
            }
          >
            <Modal isOpen={loading} content="Creating ..." />
            <form onSubmit={formik.handleSubmit}>
              <MDBRow>
                <MDBCol md="12" lg="12">
                  <MDBInput
                    value={formik.values.title}
                    name="title"
                    icon="pen"
                    label="Title"
                    iconClass="grey-text"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.title && formik.touched.title && (
                    <FormError message={formik.errors.title} />
                  )}
                </MDBCol>
                <MDBCol md="12" lg="12">
                  <MDBInput
                    value={formik.values.description}
                    name="description"
                    icon="text-height"
                    iconClass="grey-text"
                    type="textarea"
                    label="Description "
                    onChange={formik.handleChange}
                  />
                  {formik.errors.description && formik.touched.description && (
                    <FormError message={formik.errors.description} />
                  )}
                </MDBCol>
                <MDBCol md="6" lg="3">
                  <MDBInput
                    icon="book-open"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.read_time}
                    name="read_time"
                    iconClass="grey-text"
                    label="Estimated read time (min)"
                  />
                  {formik.errors.read_time && formik.touched.read_time && (
                    <FormError message={formik.errors.read_time} />
                  )}
                </MDBCol>
                <MDBCol md="6" lg="6">
                  <div className="form-group mt-4">
                    <select
                      name="postsCategoryId"
                      className="form-control"
                      value={formik.values.postsCategoryId}
                      onChange={formik.handleChange}
                    >
                      <option value="selected">Sélect a category</option>
                      <Option data={categories} />
                    </select>
                    {formik.errors.postsCategoryId &&
                      formik.touched.postsCategoryId && (
                        <FormError message={formik.errors.postsCategoryId} />
                      )}
                  </div>
                </MDBCol>
                <MDBCol md="12" lg="12">
                  <div className="mt-4 mb-4">
                    <UploadFile
                      title={<small>Add an illustration picture</small>}
                      setFieldValue={formik.setFieldValue}
                    />
                  </div>
                  {formik.errors.picture && formik.touched.picture && (
                    <FormError message={formik.errors.picture} />
                  )}
                </MDBCol>
                <MDBCol md="12" lg="12">
                  <div className="mt-5">
                    <Editor
                      editorState={formik.values.content}
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
                      wrapperStyle={styles.wrapperStyle}
                      editorStyle={{ height: "400px", padding: "10px" }}
                      toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: {
                          uploadCallback: addPicture,
                          alt: { present: true, mandatory: false },
                        },
                      }}
                      onEditorStateChange={(editorState) =>
                        formik.setFieldValue("content", editorState)
                      }
                    />
                  </div>
                </MDBCol>
              </MDBRow>
              <div className="text-center mt-4">
                <MDBBtn
                  className="text-capitalize"
                  gradient="blue"
                  type="submit"
                  size="md"
                >
                  Publish
                </MDBBtn>
              </div>
            </form>
          </Pills>
        </>
      )}
    </>
  );
}

CreatePost.Layout = DefaultLayout;
