import React from "react";
import cogoToast from "cogo-toast";

export const toastError = (message) =>
  cogoToast.error(<small>{message}</small>, {
    bar: {
      size: 1,
    },
    hideAfter: 5,
  });

export const toastSuccess = (message) =>
  cogoToast.success(<>{message}</>, {
    bar: {
      size: 1,
    },
    hideAfter: 2,
    position: "top-right",
  });
