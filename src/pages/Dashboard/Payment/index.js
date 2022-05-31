import useEvent from '../../../hooks/api/useEvent';
import { useTicket } from '../../../hooks/useTicket';
import { useEffect, useState } from 'react';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import useEnrollment from '../../../hooks/api/useEnrollment';
import styled from 'styled-components';
import TicketSelection from './TicketSelection';
import HostSelection from './HostSelection';

export default function Payment() {
  const { event } = useEvent();
  const { ticketData, setTicketData } = useTicket();
  const [selectedTicketModality, setSelectedTicketModality] = useState('');
  const [selectedHostModality, setSelectedHostModality] = useState('');
  let { enrollment } = useEnrollment();

  function handleModalityClick(string) {
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
