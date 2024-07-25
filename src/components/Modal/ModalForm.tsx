import { FormEvent, ReactNode } from "react";

interface ModalFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export function ModalForm({ onSubmit, children }: ModalFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {children}
    </form>
  );
}
