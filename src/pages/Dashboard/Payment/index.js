import useEvent from '../../../hooks/api/useEvent';
import { useTicket } from '../../../hooks/useTicket';
import { useEffect, useState } from 'react';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { BookTicketButton } from '../../../components/Dashboard/Payment/BookTicketButton';
import styled from 'styled-components';
import TicketSelection from './TicketSelection';
import HostSelection from './HostSelection';

export default function Payment() {
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
      
      {
        (selectedTicketModality === 'online' || (selectedTicketModality === 'presential' && selectedHostModality)) &&
          <>
            <p> Fechado! O total ficou em <strong> {`R$ ${modalityPrice + accommodationPrice}`} </strong> Agora é só confirmar: </p>
            <BookTicketButton> RESERVAR INGRESSO </BookTicketButton>
          </>
      }

    </PaymentContainer>
  );
}

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  word-wrap: break-word;
  text-align: center;
  align-self: center;
`;

const PaymentContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  font-family: 'Roboto';
  font-style: normal;

  h1 {
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;

    padding-bottom: 37px;
  }

  p {
    color: #8e8e8e;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;

    padding-bottom: 17px;
  }
`;
