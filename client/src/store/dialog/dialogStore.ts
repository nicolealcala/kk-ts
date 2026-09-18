import type React from "react";
import { create } from "zustand";
import { combine } from "zustand/middleware";

type DialogType = "default" | "success" | "error" | "info" | "warning";
type DialogMode = "alert" | "confirm";
type ConfirmCallback = () => void | Promise<unknown>;
type DialogOptions = Omit<DialogState, "isOpen" | "mode" | "onConfirm">;

type ConfirmationOptions = DialogOptions & {
  onConfirm: ConfirmCallback;
};

type DialogState = {
  isOpen: boolean;
  title?: string;
  message?: React.ReactNode;
  type?: DialogType;
  mode?: DialogMode;
  onConfirm?: ConfirmCallback;
  icon?: "delete" | "warning" | "info";
};

const getInitialDialogState = (): DialogState => ({
  isOpen: false,
  type: "default",
});

export const useDialogStore = create(
  combine(getInitialDialogState(), (set) => ({
    openDialog: (options: DialogOptions) =>
      set({
        isOpen: true,
        mode: "alert",
        ...options,
      }),

    openConfirmation: (options: ConfirmationOptions) =>
      set({
        isOpen: true,
        mode: "confirm",
        ...options,
      }),
    closeDialog: () =>
      set({ isOpen: false, mode: undefined, onConfirm: undefined }),
  })),
);
