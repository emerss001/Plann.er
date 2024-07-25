import { Link2, Tag } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { ModalRoot } from "../../components/Modal/ModalRoot";
import { ModalTitle } from "../../components/Modal/ModalTitle";
import { ModalClose } from "../../components/Modal/ModalClose";
import { ModalDescription } from "../../components/Modal/ModalDescription";
import { ModalForm } from "../../components/Modal/ModalForm";
import { ModalInput } from "../../components/Modal/ModalInput";

interface CreateLinkModalProps {
  closeCreateLinkModal: () => void;
}

export function CreateLinkModal({
  closeCreateLinkModal,
}: CreateLinkModalProps) {
  const { tripId } = useParams();

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    await api.post(`trips/${tripId}/links`, {
      title,
      url,
    });

    window.document.location.reload();
  }

  return (
    <ModalRoot>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <ModalTitle title="Cadastrar link" />
          <ModalClose closeModal={closeCreateLinkModal} />
        </div>
      </div>

      <ModalDescription>
        <p className="text-sm text-zinc-400">
          Todos os convidados podem visualizar os links.
        </p>
      </ModalDescription>

      <ModalForm onSubmit={createLink}>
        <ModalInput
          icon={Tag}
          name="title"
          placeholder="Qual titulo do link?"
        />

        <ModalInput
          icon={Link2}
          type="url"
          name="url"
          placeholder="Insira aqui o link"
        />

        <Button variant="primary" size="full">
          Salvar link
        </Button>
      </ModalForm>
    </ModalRoot>
  );
}
