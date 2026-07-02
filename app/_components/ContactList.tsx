import React from 'react'
import { ContactType } from '../_types/contact';
import Link from 'next/link';
import { FiEdit, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import DeleteButton from './DeleteButton';
import { deleteContactAction } from '../actions/contact';
import Image from 'next/image';

const ContactList = ({contacts}: {contacts: ContactType[]}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
        {contacts.map((contact)=>(
            <div key={contact._id} className="w-full">
                <div className="bg-white rounded-xl shadow-md overflow-hidden my-4 transform hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row">
                    <div className="p-6 flex-grow">
                        <div className="flex items-center space-x-4">
                            {contact.photo ? 
                                <Image src={contact.photo} alt={contact.name || 'contact photo'} width={80} height={80} className="rounded-full object-cover" />
                                : <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-500 flex-shrink-0">{contact.name?.charAt(0) || ''}</div>
                            }
                            <h2 className="text-xl font-bold text-gray-800 truncate"> {contact.name} </h2>
                        </div>

                        <div className="mt-4 space-y-2 text-gray-600">
                            <p className="flex items-center gap-3 truncate"><FiMail className="text-gray-400 flex-shrink-0 h-5 w-5"/> <span>{contact.email}</span></p>
                            {contact.phone && (
                                <p className="flex items-center gap-3"><FiPhone className="text-gray-400 flex-shrink-0 h-5 w-5"/> <span>{contact.phone}</span></p>
                            )}
                            {contact.address && (
                                <p className="flex items-center gap-3"><FiMapPin className="text-gray-400 flex-shrink-0 h-5 w-5"/> <span>{contact.address}</span></p>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {contact.tags && contact.tags.map((tag) => (
                                <span key={tag} className="badge bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-4 flex flex-row sm:flex-col justify-end sm:justify-center items-center gap-4">
                        <Link href={`/contact/edit/${contact._id}`} className="flex items-center gap-2 text-sm text-white bg-shiny-purple hover:bg-shiny-purple-light font-semibold px-4 py-2 rounded-lg transition-colors">
                            <FiEdit className="text-gray-400 flex-shrink-0 h-5 w-5"/> Edit
                        </Link>
                        <DeleteButton action={deleteContactAction} contact={contact} />
                    </div>
                </div>
                <hr className="lg:hidden purple-divider" />
            </div>
        ))}
    </div>
  )
}

export default ContactList