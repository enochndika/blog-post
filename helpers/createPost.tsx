import { useState } from 'react';
import { useRouter } from 'next/router';
import { stateToHTML } from 'draft-js-export-html';
import { useTranslation } from 'react-i18next';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { addPicture, addPost, useFetchCategories } from '@/actions/postActions';
import { postCreateSchema } from '@/validators/posts';
import Modal from '@/components/ui/modal';
import { Tab, Tabs } from '@/components/ui/tab';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/others/formError';
import Option from '@/components/others/option';
import Row from '@/components/ui/row';
import UploadFile from '@/components/others/uploadForm';
import { Input } from '@/components/ui/form';
import Container from '@/components/ui/container';

import {
  BookOpenIcon,
  PenIcon,
  SpinnerIcon,
  TextHeightIcon,
} from '@/components/ui/icons';
import { useFetchUserProfile } from '@/actions/userActions';

export default function CreatePost() {
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
    await addPost(user?.id, values, content);
    await router.push('/[username]/posts', `/${user?.username}/posts`);
  };

  return (
    <Container>
      <div className="mt-20">
        <Modal isOpen={formState.isSubmitting} backdrop={false} padding="pt-56">
          <Modal.Body className="bg-darker text-white dark:bg-white dark:text-gray-900">
            <div className="flex justify-center">
              <SpinnerIcon className="h-5 mr-1" />
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
                  <Input
                    name="description"
                    type="textarea"
                    label={t('Pages.post.create.form.description')}
                    ref={register()}
                  >
                    <TextHeightIcon className="h-4 text-gray-700" />
                  </Input>
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
                      name="postsCategoryId"
                      className="text-sm sm:text-base bg-white border-gray-300 dark:text-black w-full border rounded-md  focus:border-blue-500 focus:outline-none py-2.5 px-2"
                      ref={register()}
                    >
                      <option value="selected">
                        {t('Pages.post.create.form.selectOption')}
                      </option>
                      <Option data={categories} />
                    </select>
                    {errors.postsCategoryId && (
                      <FormError message={errors.postsCategoryId.message} />
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="mt-4 mb-4">
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
              <div className="text-center mt-4">
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
}
