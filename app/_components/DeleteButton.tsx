"use client";                                                     

import React, { useActionState } from 'react';
import {ContactType} from '../_types/contact'
import { FiTrash2 } from 'react-icons/fi';

type DeleteButtonProps = {
    action: (prevState: any, formData: FormData) => Promise<any>;
    contact?: ContactType;
};    

const DeleteButton = ({action, contact}: DeleteButtonProps) => {
    const [state, formAction] = useActionState(action, null);
  return (
    <form action={formAction}>
        <input type="hidden" name="id" value={contact?._id}/>
        <button type="submit"
        onClick={(e) => {
            if(!confirm("Are you sure you want to delete this contact ?")){
                e.preventDefault();
            }
        }}>
            <FiTrash2 className="text-red-500 text-lg"/> Delete
        </button>
    </form>
  )
}

export default DeleteButton