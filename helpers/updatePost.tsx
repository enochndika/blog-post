import { useState } from 'react';
import { useRouter } from 'next/router';
import { convertFromRaw, EditorState } from 'draft-js';
import { useEffect } from 'react';
import { stateToHTML } from 'draft-js-export-html';
import { useTranslation } from 'react-i18next';
import { Editor } from 'react-draft-wysiwyg';
import { useForm } from 'react-hook-form';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Tab, Tabs } from '@/components/ui/tab';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/others/formError';
import Option from '@/components/others/option';
import Row from '@/components/ui/row';
import { Input } from '@/components/ui/form';
import Container from '@/components/ui/container';
import { BookOpenIcon, PenIcon, TextHeightIcon } from '@/components/ui/icons';
import Image from '@/components/others/image';

import {
  addPicture,
  updatePost,
  useFetchCategories,
} from '@/actions/postActions';
import { useFetchUserProfile } from '@/actions/userActions';

export interface UpdatePostProps {
  post: any;
}

export default function UpdatePost({ post }: UpdatePostProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useFetchUserProfile();
  const { categories } = useFetchCategories();
  const [content, setContent] = useState(EditorState.createEmpty());

  const { register, formState, errors, setValue, handleSubmit } = useForm({
    defaultValues: {
      id: post?.id,
      title: post?.title,
      description: post?.description,
      read_time: post?.read_time,
      picture: post?.image,
      postsCategoryId: post?.postsCategoryId,
    },
  });

  useEffect(() => {
    if (post) {
      setValue('title', post.title);
      setValue('description', post.description);
      setValue('read_time', post.read_time);
      setValue('picture', post.image);
      setValue('postsCategoryId', post.postsCategoryId);
      const contentState = convertFromRaw(post?.content);
      const editorState = EditorState.createWithContent(contentState);
      setContent(editorState);
    }
  }, [post]);

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
    await updatePost(
      values,
      user?.id,
      content,
      t('Actions.posts.updateMessage'),
      t('Actions.error'),
    );
    await router.push('/[username]/posts', `/${user?.username}/posts`);
  };

  return (
    <>
      <Container>
        <div className="mt-16">
          <Tabs>
            <Tab title={t('Pages.username.posts.update.createPill')}>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
                <Row>
                  <div className="col-12">
                    <input type="hidden" ref={register()} name="id" />
                    <Input
                      name="title"
                      label={t('Pages.post.create.form.title')}
                      ref={register()}
                    >
                      <PenIcon className="h-4 text-gray-700" />
                    </Input>
                    {errors.title && (
                      <FormError message={errors.title.message} />
                    )}
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
                        <option defaultValue="selected">
                          {t('Pages.post.create.form.selectOption')}
                        </option>
                        <Option data={categories} />
                      </select>
                      {errors.postsCategoryId && (
                        <FormError message={errors.postsCategoryId.message} />
                      )}
                    </div>
                  </div>
                  <div className="col-12 md:col-3  mt-6 mb-8">
                    <div className="text-gray-600 font-medium dark:text-white mb-2">
                      {t('Pages.username.posts.update.img')}
                    </div>
                    <Image
                      src={post?.image}
                      alt={post?.title}
                      className="w-full"
                      height={900}
                      width={1500}
                    />
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
                    {t('Pages.username.posts.update.form.submitBtn')}
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
    </>
  );
}
