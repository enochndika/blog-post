import { ReactNode } from 'react';
import cogoToast from 'cogo-toast';

const toastError = (message: ReactNode | string) =>
  cogoToast.error(<small>{message}</small>, {
    bar: {
      size: '1',
    },
    hideAfter: 5,
  });

const toastSuccess = (message) =>
  cogoToast.success(<>{message}</>, {
    bar: {
      size: '1',
    },
    hideAfter: 2,
    position: 'top-right',
  });

export { toastError, toastSuccess };
