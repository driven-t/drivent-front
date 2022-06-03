import { useEffect, useState } from 'react';

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

function PaymentCreditCard() {
  const { event } = useEvent();
  const { ticketData } = useTicket();
  const { pay } = usePayment();
  const [paymentCompletion, setPaymentCompletion] = useState(false);

  const { enrollment } = useEnrollment();
  console.log(enrollment);
  console.log(event);
  console.log(ticketData);

  const [creditCardData, setCreditCardData] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });
  const [price, setPrice] = useState(0);

  async function calculatePrice() {
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
      console.log(result.data.message);
      toast.error(result.data.message);
    }
    else{
      console.log(result.data);
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

      {paymentCompletion ? 
        '' 
        : 
        <>
  `       <p>Pagamento</p>
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
