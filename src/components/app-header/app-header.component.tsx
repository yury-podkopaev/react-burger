import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo';
import styles from './app-header.module.css'

const AppHeader = () => {
  const menuButtons = [
    { text: "Конструктор", icon: <BurgerIcon type="primary"/> },
    { text: "Лента заказов", icon: <ListIcon type="primary"/> },
  ];
  return (
    <nav className={styles.header}>
        <div className={styles.menu}>
            {menuButtons.map((btn, index) => {
                return <Button htmlType="button" type="secondary" key={index}>{btn.icon} <span className="text text_type_main-small">{btn.text}</span></Button>
            })}
        <div className={styles.logo}><Logo/></div>
        <Button htmlType="button" type="secondary"><ProfileIcon type="primary"/> Личный кабинет</Button>
        </div>
    </nav>
  );
};

export { AppHeader };
