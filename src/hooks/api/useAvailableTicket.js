import useAsync from '../useAsync';
import useToken from '../useToken';
import * as ticketApi from '../../services/ticketApi';

export default function useAvailableTicket() {
  const token = useToken();

  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: availableTicket,
  } = useAsync(() => ticketApi.getTicket(token));
  return {
    ticket,
    ticketLoading,
    ticketError,
    availableTicket,
  };
}
