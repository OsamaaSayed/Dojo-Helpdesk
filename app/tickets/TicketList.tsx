import Link from 'next/link';

type Ticket = {
  id: string;
  title: string;
  body: string;
  priority: string;
  user_email: string;
};

const getTickets = async () => {
  const res = await fetch('http://localhost:4000/tickets', {
    cache: 'no-cache', //~ SSR
  });
  return res.json();
};

const TicketList = async () => {
  const tickets: Ticket[] = await getTickets();

  return (
    <>
      {tickets?.length === 0 && <p>There are no open tickets!.</p>}

      {tickets?.map((ticket) => (
        <div
          key={ticket.id}
          className='card my-5'
        >
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              <span>{ticket.priority} priority</span>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default TicketList;
