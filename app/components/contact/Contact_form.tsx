'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { buildApiUrl } from '@/lib/config';

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

async function submitContact(data: ContactPayload) {
  const res = await fetch(buildApiUrl('/contacts/'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw err;
  }

  return res.json();
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactPayload>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="rounded-3xl p-8 shadow-sm bg-gray-200">
      <h2 className="text-2xl font-semibold text-[#2772b0] mb-6">
        Send us a Message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 w-full bg-white rounded-lg border border-gray-300 px-4 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full bg-white rounded-lg border border-gray-300 px-4 py-2 focus:outline-none"
            />
          </div>
        </div>

        <div className=' text-gray-700'>
          <label className="text-sm font-medium">Subject</label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="mt-1 w-full bg-white rounded-lg border border-gray-300 px-4 py-2 focus:outline-none"
          />
        </div>

        <div className='text-gray-700'>
          <label className="text-sm font-medium ">Message</label>
          <textarea
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-lg bg-white border border-gray-300 px-4 py-2 resize-none focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-60"
        >
          {mutation.isPending ? 'Sending...' : 'Send Message'}
        </button>

        {mutation.isError && (
          <p className="text-red-600 text-sm">Something went wrong</p>
        )}

        {mutation.isSuccess && (
          <p className="text-green-600 text-sm">Message sent successfully</p>
        )}
      </form>
    </div>
  );
}
