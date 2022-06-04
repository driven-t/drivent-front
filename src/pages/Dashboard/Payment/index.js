import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useEvent from '../../../hooks/api/useEvent';
import { useTicket } from '../../../hooks/useTicket';
import useEnrollment from '../../../hooks/api/useEnrollment';
import TicketSelection from './TicketSelection';
import HostSelection from './HostSelection';
import { PaymentContainer, MessageContainer } from './styles/PaymentContainer';
import { BookTicketButton } from './styles/BookTicketButton';

export default function Payment() {
  const navigate = useNavigate();

  const { event } = useEvent();
  const { enrollment } = useEnrollment();
  const { ticketData, setTicketData } = useTicket();
  const [selectedTicketModality, setSelectedTicketModality] = useState(initialTicketModality());
  const [selectedHostModality, setSelectedHostModality] = useState(initialHostModality());

  function initialTicketModality() {
    if (ticketData.isOnline === true) {
      return 'online';
    }

    if (ticketData.isOnline === false) {
      return 'presential';
    }

    return '';
  }

  function initialHostModality() {
    if (ticketData.withAccommodation === true) {
      return 'with-accommodation';
    }

    if (ticketData.withAccommodation === false) {
      return 'without-accommodation';
    }

    return '';
  }

  function calculatePrice() {
    if (ticketData.isOnline) {
      return event.onlinePrice;
    } else if (ticketData.withAccommodation) {
      return event.presentialPrice + event?.accommodationPrice;
    } else {
      return event.presentialPrice;
    }
  }

  function handleModalityClick(string) {
    setSelectedHostModality('');
    setTicketData({ ...ticketData, withAccommodation: null });
    console.log('Resetou acomodação!');
    console.log(ticketData);
    if (string === selectedTicketModality) {
      setSelectedTicketModality('');
      setTicketData({ ...ticketData, isOnline: null });
    } else {
      setSelectedTicketModality(string);
      if (string === 'presential') {
        setTicketData({ ...ticketData, isOnline: false });
      } else {
        setTicketData({ ...ticketData, isOnline: true });
      }
    }
  }

  function handleAccommodationClick(string) {
    if (string === selectedHostModality) {
      setSelectedHostModality('');
      setTicketData({ ...ticketData, withAccommodation: null });
    } else {
      setSelectedHostModality(string);
      if (string === 'with-accommodation') {
        setTicketData({ ...ticketData, withAccommodation: true });
      } else {
        setTicketData({ ...ticketData, withAccommodation: false });
      }
    }
  }

  if (!event) return <></>;

  if (!enrollment) {
    return (
      <PaymentContainer>
        <h1>Ingresso e pagamento</h1>

        <MessageContainer>
          <p>
            Você precisa completar sua inscrição antes <br /> de prosseguir pra escolha de ingresso
          </p>
        </MessageContainer>
      </PaymentContainer>
    );
  }

  return (
    <PaymentContainer>
      <h1>Ingresso e pagamento</h1>

      <TicketSelection
        selectedTicketModality={selectedTicketModality}
        handleModalityClick={handleModalityClick}
        event={event}
      />

      {selectedTicketModality === 'presential' && (
        <HostSelection
          selectedHostModality={selectedHostModality}
          handleAccommodationClick={handleAccommodationClick}
          event={event}
        />
      )}

      {(selectedTicketModality === 'online' || (selectedTicketModality === 'presential' && selectedHostModality)) && (
        <>
          <p>
            {' '}
            Fechado! O total ficou em <strong> {`R$ ${calculatePrice()}`} </strong> Agora é só confirmar:{' '}
          </p>
          <BookTicketButton onClick={() => navigate('/dashboard/payment/credit-card')}>
            {' '}
            RESERVAR INGRESSO{' '}
          </BookTicketButton>
        </>
      )}
    </PaymentContainer>
  );
}
