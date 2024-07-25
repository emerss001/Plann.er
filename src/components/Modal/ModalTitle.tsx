interface ModalTitleProps {
  title: string;
}

export function ModalTitle({ title }: ModalTitleProps) {
  return <h2 className="text-lg font-semibold">{title}</h2>;
}
