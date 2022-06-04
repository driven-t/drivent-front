import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useEvent from '../../../hooks/api/useEvent';
import { useTicket } from '../../../hooks/useTicket';
import { PaymentContainer } from './styles/PaymentContainer';
import { SelectedBox, Modality, Price } from './styles/SelectedBox';

import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { CreditCard } from './styles/CreditCard';
import CreditCardForm from './CreditCardForm';
import { ConfirmPaymentButton } from './styles/ConfirmPaymentButton';

function PaymentCreditCard() {
  const navigate = useNavigate();

  const { event } = useEvent();
  const { ticketData } = useTicket();

  const [creditCardData, setCreditCardData] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });
  const [price, setPrice] = useState(0);

  function isTicketDataComplete() {
    const isOnline = ticketData.isOnline;
    const withAccommodation = ticketData.withAccommodation;

    if (isOnline === null || isOnline === undefined) {
      return false;
    }

    // isOnline being true is enough to complete the ticket
    if (isOnline) {
      return true;
    }

    if (withAccommodation === null || withAccommodation === undefined) {
      return false;
    }

    return true;
  }

  if (!isTicketDataComplete()) {
    navigate('/dashboard/payment');
  }

  function calculatePrice() {
    if (ticketData.isOnline) {
      setPrice(event?.onlinePrice);
    } else if (ticketData.withAccommodation) {
      setPrice(event?.presentialPrice + event?.accommodationPrice);
    } else {
      setPrice(event?.presentialPrice);
    }
  }

  useEffect(calculatePrice, [event]);

  console.log(ticketData);

  return (
    <PaymentContainer>
      <h1>Ingresso e pagamento</h1>
      <p> Ingresso escolhido </p>
      <SelectedBox>
        <Modality>
          {ticketData.isOnline ? 'Online' : `Presencial + ${ticketData.withAccommodation ? 'Com Hotel' : 'Sem Hotel'}`}
        </Modality>
        <Price>R$ {price}</Price>
      </SelectedBox>

      <p>Pagamento</p>
      <CreditCard>
        <Cards
          cvc={creditCardData.cvc}
          expiry={creditCardData.expiry}
          focused={creditCardData.focus}
          name={creditCardData.name}
          number={creditCardData.number}
        />

        <CreditCardForm creditCardData={creditCardData} setCreditCardData={setCreditCardData} />
      </CreditCard>

      <ConfirmPaymentButton onClick={() => {}}>FINALIZAR PAGAMENTO</ConfirmPaymentButton>
    </PaymentContainer>
  );
}

export default PaymentCreditCard;
