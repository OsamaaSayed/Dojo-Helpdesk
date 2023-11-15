'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CreateTicketForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [priority, setPriority] = useState('low');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTicket = { title, body, priority, user_email: 'Osama@gmail.com' };

    try {
      setIsLoading(true);

      const res = await fetch('http://localhost:4000/tickets', {
        method: 'POST',
        body: JSON.stringify(newTicket),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status === 201) {
        router.refresh();
        router.push('/tickets');
      }
    } catch (err) {
      console.log(
        '🚀 ~ file: CreateTicketForm.tsx:21 ~ handleSubmit ~ err:',
        err,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-1/2'
    >
      <label>
        <span>Title:</span>
        <input
          required
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>

      <label>
        <span>Title:</span>
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </label>

      <label>
        <span>Priority:</span>
        <select
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
        >
          <option value='low'>Low Priority</option>
          <option value='medium'>Medium Priority</option>
          <option value='high'>High Priority</option>
        </select>
      </label>

      <button
        className='btn-primary'
        disabled={isLoading}
      >
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>
    </form>
  );
};

export default CreateTicketForm;
