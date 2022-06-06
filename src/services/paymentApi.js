import api from './api';

export async function confirmPayment( body, token ) {
  try{
    const response = await api.post('/tickets/payment', body, { headers: { 
      Authorization: `Bearer ${token}`, 
    },
    },
    );
    return response;
  }
  catch(error) {
    console.error(error);
    return error.response;
  }
}
