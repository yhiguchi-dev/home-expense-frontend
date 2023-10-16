import { useCallback, useRef } from "react";

export const useDialog = () => {
  const ref = useRef<HTMLDialogElement>(null);

  const onOpen = useCallback(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, []);

  const onClose = useCallback(() => {
    if (ref.current) {
      ref.current.close();
    }
  }, []);

  return { ref, onOpen, onClose };
};
