import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { ModalRoot } from "../../components/Modal/ModalRoot";
import { ModalTitle } from "../../components/Modal/ModalTitle";
import { ModalClose } from "../../components/Modal/ModalClose";
import { ModalDescription } from "../../components/Modal/ModalDescription";
import { ModalForm } from "../../components/Modal/ModalForm";
import { ModalInput } from "../../components/Modal/ModalInput";

interface InviteGuestsModalProps {
  closeGuestModal: () => void;
  emailsToInvite: string[];
  removeEmailFromInvites: (email: string) => void;
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
}

export function InviteGuestsModal({
  addNewEmailToInvite,
  closeGuestModal,
  emailsToInvite,
  removeEmailFromInvites,
}: InviteGuestsModalProps) {
  return (
    <ModalRoot>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <ModalTitle title="Selecionar convidados" />
          <ModalClose closeModal={closeGuestModal} />
        </div>
      </div>

      <ModalDescription>
        <p className="text-sm text-zinc-400">
          Os convidados irão receber e-mails para confirmar a participação na
          viagem.
        </p>

        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((email) => {
            return (
              <div
                key={email}
                className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
              >
                <span className="text-zinc-300">{email}</span>
                <button
                  type="button"
                  onClick={() => removeEmailFromInvites(email)}
                >
                  <X className="size-4 text-zinc-400" />
                </button>
              </div>
            );
          })}
        </div>
      </ModalDescription>

      <div className="w-full h-px bg-zinc-800" />

      <ModalForm onSubmit={addNewEmailToInvite}>
        <div className="bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2 justify-between pr-4">
          <ModalInput
            icon={AtSign}
            type="email"
            name="email"
            placeholder="Digite o e-mail do convidado"
          />

          <Button type="submit" variant="primary">
            Convidar
            <Plus className="size-5" />
          </Button>
        </div>
      </ModalForm>
    </ModalRoot>
  );
}
