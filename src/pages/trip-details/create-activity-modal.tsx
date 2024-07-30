import { Tag, Calendar, Loader2 } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { ModalRoot } from "../../components/Modal/ModalRoot";
import { ModalTitle } from "../../components/Modal/ModalTitle";
import { ModalClose } from "../../components/Modal/ModalClose";
import { ModalDescription } from "../../components/Modal/ModalDescription";
import { ModalForm } from "../../components/Modal/ModalForm";
import { ModalInput } from "../../components/Modal/ModalInput";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { tripId } = useParams();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setButtonDisabled(true);

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();
    const occurs_at = data.get("occurs_at")?.valueOf();

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at,
    });

    window.document.location.reload();
  }

  return (
    <ModalRoot>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <ModalTitle title="Cadastrar atividade" />
          <ModalClose closeModal={closeCreateActivityModal} />
        </div>
        <ModalDescription>
          <p className="text-sm text-zinc-400">
            Todos os convidados podem visualizar as atividades.
          </p>
        </ModalDescription>
      </div>

      <ModalForm onSubmit={createActivity}>
        <ModalInput icon={Tag} name="title" placeholder="Qual a atividade?" />
        <ModalInput
          icon={Calendar}
          type="datetime-local"
          name="occurs_at"
          placeholder="Data e horário da atividade"
        />

        <Button variant="primary" size="full" disabled={buttonDisabled}>
          {buttonDisabled ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>Salvar atividade</>
          )}
        </Button>
      </ModalForm>
    </ModalRoot>
  );
}
