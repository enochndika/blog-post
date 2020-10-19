import DefaultLayout from "../../../../components/layout/default";
import dynamic from "next/dynamic";
import { getCookieFromBrowser } from "../../../../auth/cookies";
import { useRouter } from "next/router";
import {
  addPicture,
  fetchCategories,
  fetchPost,
  updatePost,
} from "../../../../utils/actions/postActions";
import { convertFromRaw, EditorState } from "draft-js";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { MDBBtn, MDBCol, MDBInput, MDBRow, MDBView } from "mdbreact";
import { Form, Formik } from "formik";
import { FormError } from "../../../../components/formError";
import { Option } from "../../../../utils/option";
import { loggedUser } from "../../../../auth/useUser";
import { Pills } from "../../../../components/pills";
import { useEffect, useState } from "react";
import api from "../../../../utils/axios";
import { stateToHTML } from "draft-js-export-html";
import cogoToast from "cogo-toast";
import { Emoji } from "../../../../components/emoji";
import { toastSuccess } from "../../../../utils/toast";
import Head from "next/head";
import { Spinner } from "../../../../components/spinner";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
const token = getCookieFromBrowser("blog-jwt-token");

export default function UpdatePost() {
  const router = useRouter();
  const { slug } = router?.query;
  const { post } = fetchPost(slug);
  const { user } = loggedUser();
  const { categories } = fetchCategories();
  const [content, setContent] = useState(EditorState.createEmpty());

  const styles = {
    wrapperStyle: {
      border: "2px solid #2299dd",
    },
  };

  const convertDescriptionFromJSONToHTML = () => {
    try {
      return {
        __html: stateToHTML(content.getCurrentContent()),
      };
    } catch (exp) {
      console.log(exp);
      return { __html: "Error" };
    }
  };
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
    if (slug) {
      const getData = async () => {
        const { data } = await api.get(`/posts/read/${slug}`);
        const contentState = convertFromRaw(data.content);
        const editorState = EditorState.createWithContent(contentState);
        setContent(editorState);
      };
      getData();
    }
  }, [slug]);

  if (!post) {
    return <Spinner />;
  }

  return (
    <>
      <Head>
        <title>Update Post</title>
      </Head>
      {token && content && user.id === post.userId ? (
        <Pills
          preview={
            <div
              dangerouslySetInnerHTML={convertDescriptionFromJSONToHTML()}
              className="mt-5"
            />
          }
        >
          <Formik
            initialValues={{
              id: post.id,
              title: post?.title,
              description: post?.description,
              postsCategoryId: post?.postsCategoryId,
              read_time: post?.read_time,
              picture: post?.image,
            }}
            onSubmit={async (values) => {
              await updatePost(values, user?.id, content);
              toastSuccess("Post updated");
              await router.push(
                "/[username]/posts",
                `/${user?.username}/posts`
              );
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              errors,
              touched,
              /* and other goodies */
            }) => (
              <Form onSubmit={handleSubmit}>
                <MDBRow>
                  <MDBCol md="12" lg="12">
                    <MDBInput
                      value={values.title}
                      name="title"
                      icon="pen"
                      label="Title"
                      iconClass="grey-text"
                      onChange={handleChange}
                    />
                    {errors.title && touched.title && (
                      <FormError message={errors.title} />
                    )}
                  </MDBCol>
                  <MDBCol md="12" lg="12">
                    <MDBInput
                      value={values.description}
                      name="description"
                      icon="text-height"
                      iconClass="grey-text"
                      type="textarea"
                      label="Description "
                      onChange={handleChange}
                    />
                    {errors.description && touched.description && (
                      <FormError message={errors.description} />
                    )}
                  </MDBCol>
                  <MDBCol md="3" lg="3">
                    <MDBInput
                      icon="book-open"
                      type="number"
                      onChange={handleChange}
                      value={values.read_time}
                      name="read_time"
                      iconClass="grey-text"
                      label="Read time estimated (min)"
                    />
                    {errors.read_time && touched.read_time && (
                      <FormError message={errors.read_time} />
                    )}
                  </MDBCol>
                  <MDBCol md="9" lg="9">
                    <div className="form-group mt-4">
                      <select
                        name="postsCategoryId"
                        className="form-control"
                        value={values.postsCategoryId}
                        onChange={handleChange}
                      >
                        <Option data={categories} />
                      </select>
                      {errors.postsCategoryId && touched.postsCategoryId && (
                        <FormError message={errors.postsCategoryId} />
                      )}
                    </div>
                  </MDBCol>
                  <MDBCol md="3" lg="3" className="mt-3 mb-3">
                    <div className="grey-text mb-2">Illustration image</div>
                    <MDBView>
                      <img src={post.image} className="d-block w-100" />
                    </MDBView>
                  </MDBCol>
                  <MDBCol md="12" lg="12">
                    <div className="mt-5">
                      {post && (
                        <Editor
                          editorState={content}
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
                            setContent(editorState)
                          }
                        />
                      )}
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBBtn
                  className="text-capitalize btn-block mt-4"
                  gradient="blue"
                  type="submit"
                  size="md"
                >
                  Publish
                </MDBBtn>
              </Form>
            )}
          </Formik>
        </Pills>
      ) : (
        <Emoji />
      )}
    </>
  );
}

UpdatePost.Layout = DefaultLayout;
