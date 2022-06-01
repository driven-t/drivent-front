import styled from 'styled-components';

const ModalityBox = styled.button`
  all: unset;
  width: 145px;

  height: 145px;

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

export { ModalityBox, Modality, Price };
