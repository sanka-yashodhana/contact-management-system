import React from "react";
import { getSession } from "../_lib/session";
import { getContacts } from "../api/contact";
import styles from "./contact.module.css"; // Import the CSS module
import ContactList from "../_components/ContactList";

const Contact = async ({searchParams: searchParamsPromise}: {searchParams: Promise<Record<string, string | string[] | undefined>>}) => {
  const resolvedSearchParams = await searchParamsPromise;
  const user = await getSession();
  if (!user) {
    return (
      <div className={styles.container}>
        <p className={styles.message}>
          Please{" "}
          <a href="/login">
            login
          </a>{" "}
          to view contacts
        </p>
      </div>
    );
  }

  const searchTerm = resolvedSearchParams.searchTerm as string | undefined;
  const sort = resolvedSearchParams.sort as string | undefined;

  const contacts = await getContacts(user.id, searchTerm, sort);
  console.log(contacts);
  console.log(user);
  if (!contacts || contacts.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.message}>
          Please{" "}
          <a href="contact/new">
            Add a Contact
          </a>
          {" "}
          to Your Contact List
        </p>
      </div>
    );
  }
  return (<div className={styles.container}>
    <div className={styles.header}>
      <h1>Your Contacts</h1>
      <a href="/contact/new" className={`${styles.addContactLink} btn btn-primary`}>
        Add Contact
      </a>
    </div>
    <form className={styles.filterForm}>
      <input type="text" name="searchTerm" placeholder="Search by name, email, or tag" defaultValue={searchTerm || ""} />
      <select name="sort" defaultValue={sort || ""}>
        <option value="">Sort by</option>
        <option value="name_asc">Name (A-Z)</option>
        <option value="name_desc">Name (Z-A)</option>
      </select>
      <button type="submit">Filter</button>
    </form>
    <ContactList contacts={contacts}/>
  </div>);
};

export default Contact;
