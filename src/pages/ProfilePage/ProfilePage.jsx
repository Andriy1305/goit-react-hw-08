import { useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle/PageTitle";
import { selectUser } from "../../redux/auth/selectors";
import css from "./Profile.module.css";

export default function Profile() {
  const user = useSelector(selectUser);

  return (
    <div className={css.d}>
      <PageTitle>Welcome to your profile {user.name}</PageTitle>
    </div>
  );
}
