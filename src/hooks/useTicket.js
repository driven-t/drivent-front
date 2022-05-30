import { useContext } from 'react';
import TicketContext from '../contexts/TicketContext';

export function useTicket() {
  return useContext(TicketContext);
}
