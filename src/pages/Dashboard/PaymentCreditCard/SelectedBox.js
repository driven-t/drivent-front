import styled from 'styled-components';

const SelectedBox = styled.div`
  width: 290px;
  height: 108px;
  border-radius: 20px;
  background-color: #ffeed2;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
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

export { SelectedBox, Modality, Price };
