import styles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderDetails = () => {
  return (
    <div className={`${styles.body}`}>
      <div className={`text text_type_digits-large mt-15`}>013669</div>
      <div className={`${styles.body} text text_type_main-medium mt-8 mb-15`}>Идентификатор заказа</div>
      <div className={`${styles.body}`}><CheckMarkIcon type="primary" /></div>
      <div className={`${styles.body} text text_type_main-small mt-15`}>Ваш заказ начали готовить</div>
      <div className={`${styles.await} text text_type_main-small mt-2 mb-30`}>
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
};
