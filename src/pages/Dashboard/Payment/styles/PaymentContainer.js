import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  word-wrap: break-word;
  text-align: center;
  align-self: center;
`;

const PaymentContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  font-family: 'Roboto';
  font-style: normal;

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

    margin: 25px 0 15px;
  }
`;

export { PaymentContainer, MessageContainer };
