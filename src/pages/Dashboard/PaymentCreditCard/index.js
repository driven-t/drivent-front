import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useEvent from '../../../hooks/api/useEvent';
import { useTicket } from '../../../hooks/useTicket';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { PaymentContainer } from './styles/PaymentContainer';
import { SelectedBox, Modality, Price } from './styles/SelectedBox';

import { toast } from 'react-toastify';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { CreditCard } from './styles/CreditCard';
import CreditCardForm from './CreditCardForm';
import { ConfirmPaymentButton } from './styles/ConfirmPaymentButton';
import usePayment from '../../../hooks/api/usePayment';
import { ConfirmationContainer } from '../../../components/Dashboard/Payment/ConfirmationContainer';
import CheckIcon from '../../../components/Icons/CheckIcon';

function PaymentCreditCard() {
  const navigate = useNavigate();

  const { event } = useEvent();
  const { ticketData } = useTicket();
  const { pay } = usePayment();
  const [paymentCompletion, setPaymentCompletion] = useState(false);

  const { enrollment } = useEnrollment();

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

  async function confirmPayment() {
    let [month, year] = creditCardData.expiry.split('/');
    year = '20'+year;

    const paymentObject = {
      card: {
        number: creditCardData.number,
        exp_month: parseInt(month),
        exp_year: parseInt(year),
        cvc: creditCardData.cvc,
      },
      ticket: {

        enrollmentId: enrollment.id,
        eventId: event.id,
        isOnline: ticketData.isOnline,
        withAccommodation: ticketData.withAccommodation,
      }

    }; 

    const result = await pay(paymentObject);
    if(result.status !== 201) {
      toast.error(result.data.message);
    }
    else{
      setPaymentCompletion(true);
    }
  }

  useEffect(calculatePrice, [event]);

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
      {paymentCompletion ? 
        <ConfirmationContainer>
          <CheckIcon radius={'50px'} color={'#36B853'}/>
          <h3>
            <h4 style={{ fontWeight: '500' }}>Pagamento confirmado!</h4>
            <h4  >Prossiga para escolha de hospedagem e atividades</h4>
          </h3>
        </ConfirmationContainer>
        : 
        <>
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

          <ConfirmPaymentButton onClick={() => confirmPayment()}> FINALIZAR PAGAMENTO </ConfirmPaymentButton>`
        </>
      }
    </PaymentContainer>
  );
}

export default PaymentCreditCard;
