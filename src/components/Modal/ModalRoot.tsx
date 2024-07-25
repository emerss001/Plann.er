import { ReactNode } from "react";

interface ModalRootProps {
  children: ReactNode;
}

export function ModalRoot({ children }: ModalRootProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        {/* acima entre title e close e o description <div className="space-y-2"> */}
        {/* entre o title e o close <div className="flex items-center justify-between"> */}
        {children}
      </div>
    </div>
  );
}
