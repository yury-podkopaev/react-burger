import styles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderDetails = () => {
  return (
    <>
      <div className="text text_type_digits-large">013669</div>
      <div className="text text_type_main-medium">Идентификатор заказа</div>
      <CheckMarkIcon type="primary" />
      <div className="text text_type_main-small">Ваш заказ начали готовить</div>
      <div className="text text_type_main-small">
        Дождитесь готовности на орбитальной станции
      </div>
    </>
  );
};
