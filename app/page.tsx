import { getContacts } from "./api/contact";
import ContactCarousel from "./_components/ContactCarousel";
import { getSession } from "./_lib/session";


const HomePage = async () => {

  const user = await getSession();
  const contacts = user ? await getContacts(user.id) : [];

  return (
    <div>
      {contacts && contacts.length > 0 && <ContactCarousel contacts={contacts} />}
    </div>
  );
};

export default HomePage;