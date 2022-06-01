import { useEffect, useState } from 'react';

import useEvent from '../../../hooks/api/useEvent';
import { useTicket } from '../../../hooks/useTicket';
import { PaymentContainer } from './PaymentContainer';
import { SelectedBox, Modality, Price } from './SelectedBox';

function PaymentCreditCard() {
  const { event } = useEvent();
  const { ticketData } = useTicket();

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
    </PaymentContainer>
  );
}

export default PaymentCreditCard;
