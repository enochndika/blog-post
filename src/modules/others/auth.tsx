import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import Row from '@/components/ui/row';
import Card from '@/components/ui/card';
import { Input } from '@/components/ui/form';
import { toastSuccess } from '@/utils/toast';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import MaleIcon from '@/components/icons/human/male';
import LockIcon from '@/components/icons/others/lock';
import { signin, signup } from '@/actions/userActions';
import { getCookieFromBrowser } from '@/config/cookies';
import UserMdIcon from '@/components/icons/human/userMdIcon';
import CircleNotchIcon from '@/components/icons/others/circleNotch';
import { userLoginSchema, userRegisterSchema } from '@/validators/user';

export interface AuthProps {
  login: boolean;
}

export default function Auth({ login }) {
  const { t } = useTranslation();
  const router = useRouter();
  const token = getCookieFromBrowser('blog-jwt-token');

  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(login ? userLoginSchema : userRegisterSchema),
  });
  const { username, password, fullName } = errors;

  const onSubmit = async (values) => {
    if (login) {
      const data = await signin(values, t('Actions.userActions.signin.error'));
      if (data) {
        toastSuccess(t('Actions.userActions.signin.success'));
        await router.push('/');
      }
    } else {
      const data = await signup(values, t('Actions.userActions.signup.error'));
      if (data) {
        toastSuccess(t('Actions.userActions.signup.success'));
        await router.push('/');
      }
    }
  };

  useEffect(() => {
    if (token) {
      router.push('/');
    }
  }, [token, router]);

  return (
    <div className="flex items-center justify-center lg:h-screen">
      <Container>
        <Row className="justify-center">
          <div className="col-12 md:col-8 lg:col-6 xl:col-4 mb-24 mt-16 lg:mb-0 lg:mt-0">
            <Card>
              <Card.Body className="p-8">
                <form
                  className="text-gray-600 dark:text-white"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="mb-16 text-center text-2xl font-bold">
                    {login
                      ? t('Helpers.auth.title.login')
                      : t('Helpers.auth.title.register')}
                  </div>
                  <Input
                    label={t('Helpers.auth.form.username')}
                    type="text"
                    name="username"
                    ref={register()}
                    errorMessage={username?.message}
                  >
                    <UserMdIcon size={20} className="dark:text-gray-600" />
                  </Input>
                  <Input
                    type="password"
                    label={t('Helpers.auth.form.password')}
                    name="password"
                    ref={register()}
                    errorMessage={password?.message}
                  >
                    <LockIcon size={20} className="dark:text-gray-600" />
                  </Input>
                  {!login && (
                    <>
                      <Input
                        label={t('Helpers.auth.form.fullName')}
                        type="text"
                        name="fullName"
                        ref={register()}
                        errorMessage={fullName?.message}
                      >
                        <MaleIcon size={20} className="dark:text-gray-600" />
                      </Input>
                    </>
                  )}
                  <div className="flex justify-center mt-4">
                    <Button
                      color="dark"
                      type="submit"
                      disabled={formState.isSubmitting}
                      size="sm"
                    >
                      <span className="flex">
                        {formState.isSubmitting && (
                          <CircleNotchIcon size={18} className="mr-1" />
                        )}
                        {login
                          ? t('Helpers.auth.form.submit.login')
                          : t('Helpers.auth.form.submit.register')}
                      </span>
                    </Button>
                  </div>
                </form>
              </Card.Body>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
}
