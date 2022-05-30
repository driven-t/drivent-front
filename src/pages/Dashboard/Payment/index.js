import useEvent from '../../../hooks/api/useEvent';
import { useTicket } from '../../../hooks/useTicket';
import { useEffect, useState } from 'react';
import { Modality, ModalityBox, Price } from '../../../components/Dashboard/Payment/ModalityBox';
import { PaymentBoxesContainer } from '../../../components/Dashboard/Payment/PaymentBoxesContainer';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import useEnrollment from '../../../hooks/api/useEnrollment';
import styled from 'styled-components';

export default function Payment() {
  const { event } = useEvent();
  const { ticketData, setTicketData } = useTicket();
  const [selectedTicketModality, setSelectedTicketModality] = useState('');
  const { enrollment } = useEnrollment();

  if (!event) {
    return <></>;
  }

  function clickHandler(string) {
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

  return (
    <PaymentContainer>
      <h1>Ingresso e pagamento</h1>

      {enrollment ? (
        <>
          <p> Primeiro, escolha sua modalidade de ingresso </p>

          <PaymentBoxesContainer>
            <ModalityBox
              selected={selectedTicketModality === 'presential' ? true : false}
              onClick={() => {
                clickHandler('presential');
              }}
            >
              <Modality>Presencial</Modality>
              <Price>R$ {event.presentialPrice}</Price>
            </ModalityBox>

            <ModalityBox
              selected={selectedTicketModality === 'online' ? true : false}
              onClick={() => {
                clickHandler('online');
              }}
            >
              <Modality>Online</Modality>
              <Price>R$ {event.onlinePrice}</Price>
            </ModalityBox>
          </PaymentBoxesContainer>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '80%',
            wordWrap: 'break-word',
            padding: '0 25%',
          }}
        >
          <p>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</p>
        </div>
      )}
    </PaymentContainer>
  );
}

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
