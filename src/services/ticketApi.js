import api from './api';

export async function getTicket(token) {
  try {
    const response = await api.get('/tickets', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    );
    return response.data;
  }
  catch (error) {
    console.error(error);
    return error.response;
  }
}
