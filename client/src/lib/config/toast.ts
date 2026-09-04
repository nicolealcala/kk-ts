import Toast from "@/components/shared/Toast";
import { toast, type ToastOptions } from "react-toastify";

export type ToastData = {
  type: ToastType;
  title?: string;
  content: string;
};

export type ToastType = "success" | "error" | "info" | "warning";

export const showToast = (
  type: ToastType,
  message: string,
  options?: ToastOptions,
) =>
  toast[type](message, {
    autoClose: 3000,
    theme: "colored",
    ...options,
  });