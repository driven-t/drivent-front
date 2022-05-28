import { createContext, useState } from 'react';

const TicketContext = createContext();

export function TicketProvider({ children }) {
  const [ticketData, setTicketData] = useState({ eventId: 0, enrollmentId: 0 });

  return(
    <TicketContext.Provider value={{ ticketData, setTicketData }}>
      {children}
    </TicketContext.Provider>
  );
}

export default TicketContext;
