"use client";

import React, { useActionState, useEffect } from 'react'
import { ContactType } from '../_types/contact';
import { useRouter } from 'next/navigation';

type ContactFormProps = {
    action: (prevState: any, formData: FormData) => Promise<any>;
    contact?: ContactType;
}; 

const ContactForm = ({action, contact}: ContactFormProps) => {
   const router = useRouter();
    const [state, formAction] = useActionState(action, null);

    useEffect(()=>{
      if(state?.success) {
        router.push("/contact")
      }
    }, [state, router])

   return (
    <div className="auth-card">
      <div className="auth-card-header">
        <h1>Edit Contact</h1>
      </div>
      <form action={formAction}>
        <input type="hidden" name="id" value={contact?._id || ""} />
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={contact?.name || ""}
            className="form-control"
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            defaultValue={contact?.email || ""}
            className="form-control"
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            defaultValue={contact?.phone || ""}
            className="form-control"
            placeholder="Enter phone number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            defaultValue={contact?.address || ""}
            className="form-control"
            placeholder="Enter address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            defaultValue={contact?.tags?.join(", ") || ""}
            className="form-control"
            placeholder="e.g., Client, Lead, Personal"
          />
        </div>
        {state && !state.success && state.message && (
          <p className="error-message">{state.message}</p>
        )}
        <div className="form-group" style={{ marginTop: '1.5rem' }}>
          <button type="submit" className="btn btn-primary btn-block">
            Save Contact
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm