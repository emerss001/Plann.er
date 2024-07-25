import { Mail, User } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { ModalRoot } from "../../components/Modal/ModalRoot";
import { ModalTitle } from "../../components/Modal/ModalTitle";
import { ModalClose } from "../../components/Modal/ModalClose";
import { ModalDescription } from "../../components/Modal/ModalDescription";
import { ModalForm } from "../../components/Modal/ModalForm";
import { ModalInput } from "../../components/Modal/ModalInput";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerEmail,
  setOwnerName,
}: ConfirmTripModalProps) {
  return (
    <ModalRoot>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <ModalTitle title="Confirmar criação de viagem" />
          <ModalClose closeModal={closeConfirmTripModal} />
        </div>
        <ModalDescription>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <span className="font-semibold text-zinc-100">
              Porto Seguro, Brasil
            </span>{" "}
            nas datas{" "}
            <span className="font-semibold text-zinc-100">
              16 a 22 de Agosto
            </span>{" "}
            preencha seus dados abaixo:
          </p>
        </ModalDescription>
      </div>

      <ModalForm onSubmit={createTrip}>
        <ModalInput
          icon={User}
          name="name"
          placeholder="Seu nome completo"
          onChange={(event) => setOwnerName(event.target.value)}
        />

        <ModalInput
          icon={Mail}
          type="email"
          name="email"
          placeholder="Seu e-mail pessoal"
          onChange={(event) => setOwnerEmail(event.target.value)}
        />

        <Button type="submit" variant="primary" size="full">
          Confirmar criação da viagem
        </Button>
      </ModalForm>
    </ModalRoot>
  );
}
