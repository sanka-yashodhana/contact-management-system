import dbConnect from "../_lib/dbConnect";
import Contact from "../_models/Contact";
import { ContactType } from "../_types/contact";

export const getContacts = async (userId: string, searchTerm?: string, sort?: string) => {
  await dbConnect();
  let query: any = { userId: userId };
  if(searchTerm){
    const regex = new RegExp(searchTerm, "i");
    query.$or = [{name: regex}, {email: regex}, {tags: regex}];
  }

  let sortOption: any = {};
  if (sort === "name_asc") {
    sortOption.name = 1;
  } else if (sort === "name_desc") {
    sortOption.name = -1;
  }

  const contacts = await Contact.find(query).sort(sortOption);
  return JSON.parse(JSON.stringify(contacts));
};

export const getContactById = async (id: string) => {
  await dbConnect();
  const contact = await Contact.findById(id);
  return JSON.parse(JSON.stringify(contact));
};

export const createContact = async (contact: ContactType) => {
  await dbConnect();
  const newContact = await Contact.create(contact);
  return newContact;
};

export const updateContact = async (id: string, contact: ContactType) => {
  await dbConnect();
  const updatedContact = await Contact.findByIdAndUpdate(id, contact);
  return updatedContact;
};

export const deleteContact = async (id: string) => {
  await dbConnect();
  await Contact.findByIdAndDelete(id);
};