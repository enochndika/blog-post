import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { useTranslation } from 'react-i18next';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import {
  addPicture,
  updatePost,
  useFetchCategories,
} from '@/actions/postActions';
import Row from '@/components/ui/row';
import { Input } from '@/components/ui/form';
import Image from '@/components/others/image';
import { Tab, Tabs } from '@/components/ui/tab';
import { Button } from '@/components/ui/button';
import Option from '@/components/others/option';
import Container from '@/components/ui/container';
import PenIcon from '@/components/icons/others/pen';
import { FormError } from '@/components/others/formError';
import { useFetchUserProfile } from '@/actions/userActions';
import BookOpenIcon from '@/components/icons/others/BookOpen';
import TextHeightIcon from '@/components/icons/others/textHeight';

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
      categoryId: post?.categoryId,
    },
  });

  useEffect(() => {
    if (post) {
      setValue('title', post.title);
      setValue('description', post.description);
      setValue('read_time', post.read_time);
      setValue('picture', post.image);
      setValue('categoryId', post.categoryId);

      const contentState = convertFromRaw(post?.content);
      const editorState = EditorState.createWithContent(contentState);
      setContent(editorState);
    }
  }, [post, setValue]);

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
    const data = await updatePost(
      values,
      user?.id,
      content,
      t('Actions.posts.updateMessage'),
      t('Actions.error'),
    );
    if (data) {
      await router.push('/[username]/posts', `/${user?.username}/posts`);
    }
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
                        name="categoryId"
                        className="px-2 py-2.5 w-full dark:text-black text-sm bg-white border focus:border-blue-500 border-gray-300 rounded-md focus:outline-none sm:text-base"
                        ref={register()}
                      >
                        <Option data={categories} />
                      </select>
                      {errors.categoryId && (
                        <FormError message={errors.categoryId.message} />
                      )}
                    </div>
                  </div>
                  <div className="col-12 md:col-3 mb-8 mt-6">
                    <div className="mb-2 text-gray-600 dark:text-white font-medium">
                      {t('Pages.username.posts.update.img')}
                    </div>
                    <Image
                      src={post?.image[0]}
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
                <div className="mt-4 text-center">
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
