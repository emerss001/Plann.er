import { ElementType, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ElementType;
}

export function ModalInput({ icon: Icon, ...rest }: InputProps) {
  return (
    <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
      <Icon className="size-5 text-zinc-400" />
      <input
        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
        {...rest}
      />
    </div>
  );
}
