import cogoToast from 'cogo-toast';
import { ReactNode } from 'react';

export const toastError = (message: ReactNode | string) =>
  cogoToast.error(<small>{message}</small>, {
    bar: {
      size: '1',
    },
    hideAfter: 5,
  });

export const toastSuccess = (message) =>
  cogoToast.success(<>{message}</>, {
    bar: {
      size: '1',
    },
    hideAfter: 2,
    position: 'top-right',
  });
