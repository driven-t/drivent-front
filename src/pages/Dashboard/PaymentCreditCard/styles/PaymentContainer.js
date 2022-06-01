import styled from 'styled-components';

const PaymentContainer = styled.div`
  width: 100%;
  min-height: 100%;
  padding-bottom: 0px;

  display: flex;
  flex-direction: column;

  font-family: 'Roboto';
  font-style: normal;
  align-items: flex-start;

  h1 {
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
  }

  p {
    color: #8e8e8e;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;

    margin-top: 20px;
    padding-bottom: 17px;
  }
`;

export { PaymentContainer };
