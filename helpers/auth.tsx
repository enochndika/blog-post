import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import { signin, signup } from '@/actions/userActions';
import { toastSuccess } from '@/utils/toast';
import { userLoginSchema, userRegisterSchema } from '@/validators/user';
import Card from '@/components/ui/card';
import Container from '@/components/ui/container';

import Row from '@/components/ui/row';
import { Input } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import {
  CircleNotchIcon,
  LockIcon,
  MaleIcon,
  UserMdIcon,
} from '@/components/ui/icons';
import { getCookieFromBrowser } from '@/utils/cookies';
import { useEffect } from 'react';

export interface AuthProps {
  login: boolean;
}

export default function Auth({ login }) {
  const { t } = useTranslation();
  const router = useRouter();
  const token = getCookieFromBrowser('blog-jwt-token');

  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(login ? userLoginSchema() : userRegisterSchema()),
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
    <Container>
      <Row className="justify-center my-20">
        <div className="col-12 md:col-4 ">
          <Card>
            <Card.Body className="p-8">
              <form
                className="text-gray-600 dark:text-white"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="text-2xl font-bold text-center mb-16">
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
  );
}
