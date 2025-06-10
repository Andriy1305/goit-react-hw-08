import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle/PageTitle";
import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";

import {
  selectIsLoading,
  selectError,
  selectFilteredContacts,
} from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";

export default function ContactsPage() {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <PageTitle>Your contacts</PageTitle>
      <ContactForm />
      {isLoading && <p>Loading contacts...</p>}
      {error && <p>Error: {error}</p>}
      <ContactList contacts={contacts} />
    </>
  );
}
