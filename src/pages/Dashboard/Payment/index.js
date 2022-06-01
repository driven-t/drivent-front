import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useEvent from '../../../hooks/api/useEvent';
import { useTicket } from '../../../hooks/useTicket';
import useEnrollment from '../../../hooks/api/useEnrollment';
import TicketSelection from './TicketSelection';
import HostSelection from './HostSelection';
import { PaymentContainer, MessageContainer } from './PaymentContainer';
import { BookTicketButton } from './BookTicketButton';

export default function Payment() {
  const navigate = useNavigate();

  const { event } = useEvent();
  const { enrollment } = useEnrollment();
  const { ticketData, setTicketData } = useTicket();
  const [selectedTicketModality, setSelectedTicketModality] = useState('');
  const [selectedHostModality, setSelectedHostModality] = useState('');
  const [modalityPrice, setModalityPrice] = useState(0);
  const [accommodationPrice, setAccommodationPrice] = useState(0);

  function handleModalityClick(string) {
    if (string === selectedTicketModality) {
      setAccommodationPrice(0);
      setSelectedTicketModality('');
      setSelectedHostModality('');
      setTicketData({ ...ticketData, isOnline: null });
    } else {
      setSelectedTicketModality(string);
      if (string === 'presential') {
        setTicketData({ ...ticketData, isOnline: false });
        setModalityPrice(event.presentialPrice);
      } else {
        setSelectedHostModality('');
        setAccommodationPrice(0);
        setTicketData({ ...ticketData, isOnline: true });
        setModalityPrice(event.onlinePrice);
      }
    }
  }

  function handleAccommodationClick(string) {
    if (string === selectedHostModality) {
      setSelectedHostModality('');
      setTicketData({ ...ticketData, withAccommodation: null });
      setAccommodationPrice(0);
    } else {
      setSelectedHostModality(string);
      if (string === 'with-accommodation') {
        setTicketData({ ...ticketData, withAccommodation: true });
        setAccommodationPrice(event.accommodationPrice);
      } else {
        setTicketData({ ...ticketData, withAccommodation: false });
        setAccommodationPrice(0);
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
            Fechado! O total ficou em <strong> {`R$ ${modalityPrice + accommodationPrice}`} </strong> Agora é só
            confirmar:{' '}
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
