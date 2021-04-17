import { signin, signup } from '../actions/userActions';
import { FormError } from '../components/formError';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { toastSuccess } from '../utils/toast';
import { useForm } from 'react-hook-form';
import Container from '../components/ui/container';
import Row from '../components/ui/row';
import {
  CircleNotchIcon,
  LockIcon,
  MaleIcon,
  UserMdIcon,
} from '../components/ui/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { userLoginSchema, userRegisterSchema } from '../validators/user';
import { Input } from '../components/ui/form';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export interface AuthProps {
  login: boolean;
}
export const Auth = ({ login }) => {
  const { t } = useTranslation();
  const router = useRouter();

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

  return (
    <Container>
      <Row className="justify-center my-20 ">
        <div className="col-12 md:col-4 ">
          <Card>
            <Card.Body className="p-8">
              <form
                className="text-gray-600 dark:text-white"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="text-3xl font-bold text-center mb-16">
                  {login
                    ? t('Helpers.auth.title.login')
                    : t('Helpers.auth.title.register')}
                </div>
                <Input
                  label={t('Helpers.auth.form.username')}
                  type="text"
                  name="username"
                  ref={register()}
                >
                  <UserMdIcon size={20} className="dark:text-gray-600" />
                </Input>
                {username && <FormError message={username.message} />}
                <Input
                  type="password"
                  label={t('Helpers.auth.form.password')}
                  name="password"
                  ref={register()}
                >
                  <LockIcon size={20} className="dark:text-gray-600" />
                </Input>
                {password && <FormError message={password.message} />}
                {!login && (
                  <>
                    <Input
                      label={t('Helpers.auth.form.fullName')}
                      type="text"
                      name="fullName"
                      ref={register()}
                    >
                      <MaleIcon size={20} className="dark:text-gray-600" />
                    </Input>
                    {fullName && <FormError message={fullName.message} />}
                  </>
                )}
                <div className="flex justify-center mt-4">
                  <Button
                    color="dark"
                    type="submit"
                    className="flex"
                    disabled={formState.isSubmitting}
                    size="sm"
                  >
                    {formState.isSubmitting && (
                      <CircleNotchIcon size={18} className="mr-1" />
                    )}
                    {login
                      ? t('Helpers.auth.form.submit.login')
                      : t('Helpers.auth.form.submit.register')}
                  </Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Container>
  );
};
