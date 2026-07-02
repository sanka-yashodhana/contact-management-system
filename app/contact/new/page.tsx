import ContactForm from '@/app/_components/ContactForm';
import { createContactAction } from '@/app/actions/contact';
import React from 'react'

const NewContactPage = () => {
  return (
    <div>
      <h1> Create New Contact </h1>
      <ContactForm action={createContactAction} />
    </div>
  )
}

export default NewContactPage;