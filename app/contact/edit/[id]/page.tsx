import ContactForm from '@/app/_components/ContactForm';
import { updateContactAction } from '@/app/actions/contact';
import { getContactById } from '@/app/api/contact';
import React from 'react'

const EditContactPage = async ({ params }: { params: Promise<{id: string}>}) => {
  const {id} = await params;
  const contact = await getContactById(id);
  return (
    <div>
      <h1> Edit Contact </h1>
      <ContactForm action={updateContactAction} contact={contact}/>
    </div>
  )
}

export default EditContactPage;