import React from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

export default function CreditCardForm({ creditCardData, setCreditCardData }) {
  function handleChangeForm({ target }) {
    setCreditCardData({ ...creditCardData, [target.name]: target.value });
  }

  function handleInputFocus({ target }) {
    setCreditCardData({ ...creditCardData, focus: target.name });
  }

  return (
    <Container>
      <form>
        <MainInput
          mask="9999999999999999"
          maskChar=""
          name="number"
          value={creditCardData.number}
          placeholder={'Card Number'}
          onChange={handleChangeForm}
          onFocus={handleInputFocus}
        />

        <p>E.g.: 49..., 51,..., 36..., 37</p>

        <MainInput
          maxLength={30}
          name="name"
          value={creditCardData.name}
          placeholder={'Name'}
          onChange={handleChangeForm}
          onFocus={handleInputFocus}
        />

        <div>
          <ValidThruInput
            mask="99/99"
            name="expiry"
            value={creditCardData.expiry}
            placeholder={'Valid Thru'}
            onChange={handleChangeForm}
            onFocus={handleInputFocus}
          />

          <CVCInput
            mask="9999"
            maskChar=""
            name="cvc"
            value={creditCardData.cvc}
            placeholder={'CVC'}
            onChange={handleChangeForm}
            onFocus={handleInputFocus}
          />
        </div>
      </form>
    </Container>
  );
}

export const Container = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  p {
    padding: 0;
    margin: 0;
    font-size: 14px;
  }
`;

export const MainInput = styled(InputMask)`
  all: unset;
  box-sizing: border-box;
  border: solid 2px #ddd;
  border-radius: 7px;
  height: 40px;
  width: 350px;
  padding: 0 10px;
`;

export const ValidThruInput = styled(InputMask)`
  all: unset;
  box-sizing: border-box;
  border: solid 2px #ddd;
  border-radius: 7px;
  height: 40px;
  padding: 0 10px;
  width: 210px;
`;

export const CVCInput = styled(InputMask)`
  all: unset;
  box-sizing: border-box;
  border: solid 2px #ddd;
  border-radius: 7px;
  margin-left: 30px;
  height: 40px;
  padding: 0 10px;
  width: 110px;
`;
