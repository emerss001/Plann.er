import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guest-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState([
    "emerson.neves@gmail.com",
    "julianolibras@yahoo.com",
  ]);

  // estado dos inputs
  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [eventStartAndDates, setEventStartAndDates] = useState<
    DateRange | undefined
  >();

  function openGuestInput() {
    setIsGuestInputOpen(true);
  }

  function closeGuestInput() {
    setIsGuestInputOpen(false);
  }

  function openGuestModal() {
    setIsGuestModalOpen(true);
  }

  function closeGuestModal() {
    setIsGuestModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );

    setEmailsToInvite(newEmailList);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setButtonDisabled(true);

    if (!destination) {
      return;
    }

    if (!eventStartAndDates?.from || !eventStartAndDates.to) {
      return;
    }

    if (emailsToInvite.length === 0) {
      return;
    }

    if (!ownerName || !ownerEmail) {
      return;
    }

    const response = await api.post("/trips", {
      destination,
      starts_at: eventStartAndDates.from,
      ends_at: eventStartAndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });

    const { tripId } = response.data;

    navigate(`/trip/${tripId}`);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-1">
          <img src="/logo.svg" alt="logo planner" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            closeGuestInput={closeGuestInput}
            isGuestInputOpen={isGuestInputOpen}
            openGuestInput={openGuestInput}
            setDestination={setDestination}
            eventStartAndDates={eventStartAndDates}
            setEventStartAndDates={setEventStartAndDates}
          />

          {isGuestInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestModal={openGuestModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
          <br />
          com nossos{" "}
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-zinc-300 underline" href="#">
            politicas de privacidade
          </a>
        </p>
      </div>

      {isGuestModalOpen && (
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestModal={closeGuestModal}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          setButtonDisabled={buttonDisabled}
        />
      )}
    </div>
  );
}
