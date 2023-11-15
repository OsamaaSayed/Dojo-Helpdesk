import { notFound } from 'next/navigation';

type Ticket = {
  id: string;
  title: string;
  body: string;
  priority: string;
  user_email: string;
};

export const dynamicParams = false; //! 404 page , default is true

export async function generateStaticParams() {
  const res = await fetch('http://localhost:4000/tickets');
  const tickets: Ticket[] = await res.json();

  return tickets.map((ticket) => ({ id: ticket.id }));
}

const getOneTicket = async (id: string) => {
  //! imitate delay as we calling a real api
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: { revalidate: 60 }, //~ ISR
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
};

const TicketDetails = async ({ params }: { params: { id: string } }) => {
  const ticket: Ticket = await getOneTicket(params.id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>

      <div className='card'>
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>

        <p>{ticket.body}</p>

        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
};

export default TicketDetails;
