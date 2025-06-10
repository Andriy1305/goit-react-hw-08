import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";

import { selectFilteredContacts } from "../../redux/contacts/selectors";

import styles from "./ContactList.module.css";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={styles.list}>
      {filteredContacts.map(({ id, name, number }) => (
        <Contact key={id} id={id} name={name} number={number} />
      ))}
    </ul>
  );
};

export default ContactList;
