import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo';
import styles from './app-header.module.css'
import { NavLink, useLocation } from "react-router-dom";

const AppHeader = () => {
  const location = useLocation();
  
  const menuButtons = [
    { text: "Конструктор", icon: <BurgerIcon type="secondary"/>, link: '/' },
    { text: "Лента заказов", icon: <ListIcon type="secondary"/>, link: '/orders' },
  ];

  const isActive = (link: string): boolean => location.pathname === link;

  return (
    <header className={styles.header}>
        <div className={styles.menu}>
            {menuButtons.map((btn, index) => {
                return <a href={btn.link} key={index} className={`${styles.button} mt-4 ${isActive(btn.link) && styles.active}`}>{btn.icon} <span className={`text text_type_main-small ml-2`}>{btn.text}</span></a>
            })}
        <a href='/' className={styles.logo}><Logo/></a>
        <NavLink to='/profile' className={`${styles.button} mt-4 ${isActive('/profile') && styles.active}`}><ProfileIcon type="secondary"/> <span className={`text text_type_main-small ml-2`}>Личный кабинет</span></NavLink>
        </div>
    </header >
  );
};

export { AppHeader };
