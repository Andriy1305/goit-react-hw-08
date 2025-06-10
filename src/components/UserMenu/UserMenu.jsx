import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import css from "./UserMenu.module.css";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";

export default function UserMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogOut = async () => {
    await dispatch(logOut());
    navigate("/"); // Перенаправлення на головну сторінку після логауту
  };

  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {user.name}!</p>
      <button type="button" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );
}
