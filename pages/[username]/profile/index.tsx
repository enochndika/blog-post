import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Row from '@/components/ui/row';
import UserLayout from '@/layout/user';
import { Input } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import ProfileShow from '@/components/skeleton/profile';
import UserMdIcon from '@/components/icons/human/userMdIcon';
import UserCircleIcon from '@/components/icons/human/userCircle';
import { updateUser, useFetchUserProfile } from '@/actions/userActions';

export default function Profile() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, mutate } = useFetchUserProfile();

  const { register, formState, handleSubmit, setValue } = useForm({
    defaultValues: {
      fullName: user?.fullName,
    },
  });

  useEffect(() => {
    if (user) {
      setValue('fullName', user.fullName);
    }
  }, [user, setValue]);

  const onSubmit = async (values) => {
    await updateUser(
      values,
      user?.id,
      t('Actions.userActions.userUpdate.success'),
      t('Actions.userActions.userUpdate.error'),
    );
    await mutate();
    await router.push('/');
  };

  if (!user) {
    return <ProfileShow />;
  }

  return (
    <>
      <Head>
        <title>@{user?.username}</title>
      </Head>
      <Container>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-28 h-full text-gray-700 dark:text-white"
        >
          <div className="mb-4 text-center text-2xl">
            {t('Pages.username.profile.index.title')}
          </div>
          <Row className="justify-center">
            <div className="col-12 md:col-7">
              <Input
                className="cursor-not-allowed"
                label={t('Helpers.auth.form.username')}
                disabled={true}
                value={user.username}
                name="username"
              >
                <UserCircleIcon className="h-5" />
              </Input>
            </div>
            <div className="col-12 md:col-7">
              <Input
                name="fullName"
                label={t('Helpers.auth.form.fullName')}
                ref={register()}
              >
                <UserMdIcon className="h-5 dark:text-grayer" />
              </Input>
              <Button
                color="dark"
                type="submit"
                className="w-full"
                disabled={formState.isSubmitting}
                size="md"
              >
                {t('Pages.username.profile.index.submitBtn')}
              </Button>
            </div>
          </Row>
        </form>
      </Container>
    </>
  );
}

Profile.Layout = UserLayout;
