import { Plus, Trash2 } from "lucide-react";
import { Button } from "../../components/button";
import { CreateLinkModal } from "./create-link-modal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Link {
  id: string;
  title: string;
  url: string;
  trip_id: string;
}

export function ImportantLinks() {
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);
  const [links, setLinks] = useState<Link[]>([]);
  const { tripId } = useParams();

  useEffect(() => {
    api
      .get(`/trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links));
  }, [tripId]);

  async function deleteLink(linkId: string) {
    await api.delete(`/trips/${tripId}/links/${linkId}`);
  }

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true);
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false);
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        {links.map((link) => {
          return (
            <div
              key={link.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {link.title}
                </span>
                <a
                  href={link.url}
                  className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.url}
                </a>
              </div>
              <button onClick={() => deleteLink(link.id)}>
                <Trash2 className="size-5 text-zinc-400 shrink-0" />
              </button>
            </div>
          );
        })}
      </div>

      <Button variant="secondary" size="full" onClick={openCreateLinkModal}>
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      {isCreateLinkModalOpen && (
        <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
      )}
    </div>
  );
}
