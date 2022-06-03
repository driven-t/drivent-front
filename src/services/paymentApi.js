import api from './api';

export async function confirmPayment( body, token ) {
  console.log(token);

  try{
    const response = await api.post('/tickets/payment', body, { headers: { 
      Authorization: `Bearer ${token}`, 
    },
    },
    );
    console.log(response);
    return response;
  }
  catch(error) {
    console.error(error);
    return error.response;
  }
}
