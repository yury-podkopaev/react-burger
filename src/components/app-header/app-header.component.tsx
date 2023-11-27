import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo';
import styles from './app-header.module.css'

const AppHeader = () => {
  const menuButtons = [
    { text: "Конструктор", icon: <BurgerIcon type="secondary"/> },
    { text: "Лента заказов", icon: <ListIcon type="secondary"/> },
  ];
  return (
    <nav className={styles.header}>
        <div className={styles.menu}>
            {menuButtons.map((btn, index) => {
                return <a href='/' key={index} className={`${styles.button} mt-4`}>{btn.icon} <span className={`text text_type_main-small ml-2`}>{btn.text}</span></a>
            })}
        <div className={styles.logo}><Logo/></div>
        <a href='/' className={`${styles.button} mt-4`}><ProfileIcon type="secondary"/> <span className={`text text_type_main-small ml-2`}>Личный кабинет</span></a>
        </div>
    </nav>
  );
};

export { AppHeader };
