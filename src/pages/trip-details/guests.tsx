import {
  CheckCircle2,
  CircleDashed,
  Loader2,
  Trash2,
  UserCog,
  UserX,
} from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
  is_owner: boolean;
}

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipant] = useState<Participant[]>([]);
  const [removingParticipants, setRemovingParticipants] = useState(false);
  const [participantsRemoved, setParticipantsRemoved] = useState<string[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipant(response.data.participants));
  }, [tripId]);

  const participantsRemoveds = (participantId: string) => {
    setParticipantsRemoved([...participantsRemoved, participantId]);
  };

  console.log(participantsRemoved);

  async function removeParticipants() {
    setButtonDisabled(true);
    await api.delete(`/trips/${tripId}/participants/remove`, {
      data: { participantsId: participantsRemoved },
    });

    window.document.location.reload();
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      {removingParticipants ? (
        <>
          <div className="space-y-5">
            {participants.map((participant, index) => {
              return (
                <div
                  key={participant.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <span className="block font-medium text-zinc-100">
                      {participant.name ?? `Convidado ${index}`}
                    </span>
                    <span className="block text-sm text-zinc-400 truncate">
                      {participant.email}
                    </span>
                  </div>

                  {!participant.is_owner && (
                    <button
                      onClick={() => participantsRemoveds(participant.id)}
                    >
                      <Trash2 className="size-5 text-red-600 shrink-0" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <Button
            variant="primary"
            size="full"
            onClick={removeParticipants}
            disabled={buttonDisabled}
          >
            {buttonDisabled ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                <UserX className="size-5" />
                Remover
              </>
            )}
          </Button>
        </>
      ) : (
        <>
          <div className="space-y-5">
            {participants.map((participant, index) => {
              return (
                <div
                  key={participant.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <span className="block font-medium text-zinc-100">
                      {participant.name ?? `Convidado ${index}`}
                    </span>
                    <span className="block text-sm text-zinc-400 truncate">
                      {participant.email}
                    </span>
                  </div>
                  {participant.is_confirmed ? (
                    <CheckCircle2 className="size-5 text-green-400 shrink-0" />
                  ) : (
                    <CircleDashed className="size-5 text-zinc-400 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
          <Button
            variant="secondary"
            size="full"
            onClick={() => setRemovingParticipants(true)}
          >
            <UserCog className="size-5" />
            Gerenciar convidados
          </Button>
        </>
      )}
    </div>
  );
}
