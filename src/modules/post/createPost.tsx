import { useState } from 'react';
import { EditorState } from 'draft-js';
import { useRouter } from 'next/router';
import { Editor } from 'react-draft-wysiwyg';
import { useTranslation } from 'react-i18next';
import { stateToHTML } from 'draft-js-export-html';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Row from '@/components/ui/row';
import Modal from '@/components/ui/modal';
import { Tab, Tabs } from '@/components/ui/tab';
import { Button } from '@/components/ui/button';
import Option from '@/components/others/option';
import Container from '@/components/ui/container';
import PenIcon from '@/components/icons/others/pen';
import { postCreateSchema } from '@/validators/posts';
import { Input, Textarea } from '@/components/ui/form';
import UploadFile from '@/components/others/uploadForm';
import { FormError } from '@/components/others/formError';
import { useFetchUserProfile } from '@/actions/userActions';
import SpinnerIcon from '@/components/icons/others/spinner';
import BookOpenIcon from '@/components/icons/others/BookOpen';
import TextHeightIcon from '@/components/icons/others/textHeight';
import { addPicture, addPost, useFetchCategories } from '@/actions/postActions';

const CreatePost = () => {
  const [content, setContent] = useState(EditorState.createEmpty());
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useFetchUserProfile();
  const { categories } = useFetchCategories();
  const { register, formState, errors, control, handleSubmit } = useForm({
    resolver: yupResolver(postCreateSchema),
  });

  const convertDescriptionFromJSONToHTML = () => {
    try {
      return {
        __html: stateToHTML(content.getCurrentContent()),
      };
    } catch (exp) {
      return { __html: 'Error' };
    }
  };
  const onSubmit = async (values) => {
    const data = await addPost(user?.id, values, content);
    if (data) {
      await router.push('/[username]/posts', `/${user?.username}/posts`);
    }
  };

  return (
    <Container>
      <div className="mt-20">
        <Modal isOpen={formState.isSubmitting} backdrop={false} padding="pt-56">
          <Modal.Body className="dark:text-gray-900 text-white bg-darker dark:bg-white">
            <div className="flex justify-center">
              <SpinnerIcon className="mr-1 h-5" />
              {t('Pages.post.create.modalContent')}
            </div>
          </Modal.Body>
        </Modal>
        <Tabs>
          <Tab title={t('Pages.post.create.createPill')}>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-12">
              <Row>
                <div className="col-12">
                  <Input
                    name="title"
                    label={t('Pages.post.create.form.title')}
                    ref={register()}
                  >
                    <PenIcon className="h-4 text-gray-700" />
                  </Input>
                  {errors.title && <FormError message={errors.title.message} />}
                </div>
                <div className="col-12">
                  <Textarea
                    rows={6}
                    name="description"
                    type="textarea"
                    label={t('Pages.post.create.form.description')}
                    ref={register()}
                  >
                    <TextHeightIcon className="h-4 text-gray-700" />
                  </Textarea>
                  {errors.description && (
                    <FormError message={errors.description.message} />
                  )}
                </div>
                <div className="col-12 md:col-6">
                  <Input
                    type="number"
                    name="read_time"
                    defaultValue={0}
                    label={t('Pages.post.create.form.readTime')}
                    ref={register()}
                  >
                    <BookOpenIcon className="h-4 text-gray-700" />
                  </Input>
                  {errors.read_time && (
                    <FormError message={errors.read_time.message} />
                  )}
                </div>
                <div className="col-12 md:col-6">
                  <div>
                    <select
                      name="categoryId"
                      className="px-2 py-2.5 w-full dark:text-black text-sm bg-white border focus:border-blue-500 border-gray-300 rounded-md focus:outline-none sm:text-base"
                      ref={register()}
                    >
                      <option value="selected">
                        {t('Pages.post.create.form.selectOption')}
                      </option>
                      <Option data={categories} />
                    </select>
                    {errors.categoryId && (
                      <FormError message={errors.categoryId.message} />
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-4 mt-4">
                    <Controller
                      name="picture"
                      control={control}
                      defaultValue={[]}
                      render={({ onChange }) => (
                        <UploadFile onChange={(e) => onChange(e.target.files)}>
                          <small>
                            {t('Pages.post.create.form.uploadFileTitle')}
                          </small>
                        </UploadFile>
                      )}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mt-5">
                    <Editor
                      editorState={content}
                      wrapperClassName="border-2 border-blue-400"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
                      editorStyle={{ height: '400px', padding: '10px' }}
                      toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: {
                          uploadCallback: addPicture,
                          alt: {
                            present: true,
                            mandatory: false,
                            defaultSize: '100%',
                          },
                        },
                      }}
                      onEditorStateChange={(editorState) =>
                        setContent(editorState)
                      }
                    />
                  </div>
                </div>
              </Row>
              <div className="mt-4 text-center">
                <Button
                  type="submit"
                  size="md"
                  color="dark"
                  disabled={formState.isSubmitting}
                >
                  {t('Pages.post.create.form.submitBtn')}
                </Button>
              </div>
            </form>
          </Tab>
          <Tab title={t('Pages.post.create.previewPill')}>
            <div
              dangerouslySetInnerHTML={convertDescriptionFromJSONToHTML()}
              className="mt-5"
            />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};

export default CreatePost;
