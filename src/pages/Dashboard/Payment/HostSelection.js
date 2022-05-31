import styled from 'styled-components';

export default function HostSelection({ selectedHostModality, handleAccommodationClick, event }) {
  return (
    <>
      <p> Ótimo! Agora escolha sua modalidade de hospedagem </p>

      <PaymentBoxesContainer>
        <ModalityBox
          selected={selectedHostModality === 'without-accommodation' ? true : false}
          onClick={() => {
            handleAccommodationClick('without-accommodation');
          }}
        >
          <Modality>Sem Hotel</Modality>

          <Price>+ R$ 0</Price>
        </ModalityBox>

        <ModalityBox
          selected={selectedHostModality === 'with-accommodation' ? true : false}
          onClick={() => {
            handleAccommodationClick('with-accommodation');
          }}
        >
          <Modality>Com Hotel</Modality>

          <Price>+ R$ {event.accommodationPrice}</Price>
        </ModalityBox>
      </PaymentBoxesContainer>
    </>
  );
}

const ModalityBox = styled.button`
  all: unset;
  width: 10vw;
  max-width: 145px;

  height: 10vw;
  max-height: 145px;

  border-radius: 20px;

  border: ${(props) => props.selected || '1px solid #CECECE'};

  background-color: ${(props) => props.selected && '#FFEED2'};

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  :hover {
    cursor: pointer;
  }
`;

const Modality = styled.h2`
  color: #454545;
  font-size: 16px;
  line-height: 25px;
`;

const Price = styled.span`
  color: #898989;
  font-size: 14px;
  line-height: 16px;
`;

const PaymentBoxesContainer = styled.div`
  width: auto;
  height: 145px;

  display: flex;

  gap: 24px;
`;
