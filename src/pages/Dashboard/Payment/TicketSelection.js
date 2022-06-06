import { PaymentBoxesContainer } from './styles/PaymentBoxesContainer';
import { ModalityBox, Modality, Price } from './styles/ModalityBox';

export default function TicketSelection({ selectedTicketModality, handleModalityClick, event }) {
  return (
    <>
      <p> Primeiro, escolha sua modalidade de ingresso </p>

      <PaymentBoxesContainer>
        <ModalityBox
          selected={selectedTicketModality === 'presential'}
          onClick={() => {
            handleModalityClick('presential');
          }}
        >
          <Modality>Presencial</Modality>
          <Price>R$ {event.presentialPrice}</Price>
        </ModalityBox>

        <ModalityBox
          selected={selectedTicketModality === 'online'}
          onClick={() => {
            handleModalityClick('online');
          }}
        >
          <Modality>Online</Modality>
          <Price>R$ {event.onlinePrice}</Price>
        </ModalityBox>
      </PaymentBoxesContainer>
    </>
  );
}
