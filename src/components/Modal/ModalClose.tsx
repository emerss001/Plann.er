import { X } from "lucide-react";

interface ModalCloseProps {
  closeModal: () => void;
}

export function ModalClose({ closeModal }: ModalCloseProps) {
  return (
    <button type="button" onClick={closeModal}>
      <X className="size-5 text-zinc-400" />
    </button>
  );
}
