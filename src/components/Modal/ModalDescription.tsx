import { ReactNode } from "react";

interface ModalDescriptionProps {
  children: ReactNode;
}

export function ModalDescription({ children }: ModalDescriptionProps) {
  return <>{children}</>;
}
