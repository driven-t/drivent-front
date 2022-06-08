
import useAvailableTicket from '../../../hooks/api/useAvailableTicket';
import { PaymentContainer, MessageContainer } from '../Payment/styles/PaymentContainer';

export default function Hotel() {
  const { ticket } = useAvailableTicket();

  return(
    <>
      <PaymentContainer>
        <h1>Escolha de hotel e quarto</h1>
        <NoHotelCases ticket={ticket}/>
      </PaymentContainer>
    </>
  );
}

function NoHotelCases({ ticket }) {
  if(!ticket || ticket.isOnline) {
    return(        
      <MessageContainer>
        <>
          {!ticket ? 
            'Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem' :
            ticket.isOnline ?
              'Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades' :
              ''}
        </>
      </MessageContainer>
    );
  };
}
