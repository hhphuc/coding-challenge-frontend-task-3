import { useToast as useToastCharka } from "@chakra-ui/react";

const TOAST_DURATION = 3000;
export enum ToastStatus {
  INFO = "info",
  WARNING = "warning",
  SUCCESS = "success",
  ERROR = "error",
  LOADING = "loading",
}

const useToast = () => {
  const toastCharka = useToastCharka();

  const toast = (status: ToastStatus, title: string, description: string) => {
    toastCharka({
      title,
      description,
      status: status,
      duration: TOAST_DURATION,
      isClosable: true,
    });
  };

  return { toast };
};

export default useToast;
