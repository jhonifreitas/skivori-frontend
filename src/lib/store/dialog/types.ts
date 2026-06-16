export type TDialogStore = {
  isOpen: Record<string, boolean>;
  setIsOpen: (name: string, open: boolean) => void;
};
