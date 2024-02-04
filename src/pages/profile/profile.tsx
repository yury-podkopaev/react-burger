import { Link, Outlet } from "react-router-dom";
import styles from './profile.module.css';
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { logout, selectRefreshToken } from "../../services/auth.store";

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const refreshToken = useAppSelector(selectRefreshToken);

  return (
    <div className={`${styles.wrapper} mt-30`}>
      <nav className={`${styles.body} text text_type_main-medium mr-15`}>
        <Link to="/profile" className={`${styles.point}`}>
          Профиль
        </Link>
        <Link to="/profile/orders" className={`${styles.point}`}>
          История заказов
        </Link>
        <Link to="/login" className={`${styles.point}`} onClick={() => dispatch(logout(refreshToken))}>
          Выход
        </Link>
        <p className={`${styles.text} text text_type_main-small mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
      </nav>

      <Outlet/>
    </div>
  );
};
