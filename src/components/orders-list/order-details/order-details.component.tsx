import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { Order } from "../order-card/order-card.types";
import { useMemo } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";
import { getStatusColor } from "../utils";
import { INGREDIENT_TYPE } from "../../../constants";
import { getOrder, selectCurrentOrder } from "../../../services/order.store";
// import { fetchIngredients } from "../../../services/burger-ingredients.store";

export const OrderDetails = () => {
  const location = useLocation();
  let currentOrder: Order = useAppSelector(selectCurrentOrder);
  const dispatch = useAppDispatch();

  if (!currentOrder._id) {
    const url = location.pathname.split("/");
    // dispatch(fetchIngredients);
    dispatch(getOrder(Number(url[url.length - 1])));
  }

  const countPrice = useMemo(
    () =>
      currentOrder.ingredients.reduce(
        (total, ingredient) => (total += ingredient.price),
        0
      ),
    [currentOrder.ingredients]
  );

  return !currentOrder._id ? (
    <div>LOADING</div>
  ) : (
    <div className={`ml-4 mr-4`}>
      <div className={`${styles.title} mt-6 text text_type_digits-default`}>
        #{currentOrder.number}
      </div>
      <div className={`${styles.text} mt-6 text text_type_main-medium`}>
        {currentOrder.name}
      </div>
      <div
        className={`${styles.text} mt-2 text text_type_main-small`}
        style={{ color: getStatusColor(currentOrder.status) }}
      >
        {currentOrder.status === 'done' ? 'Выполнен' : 'Готовится'}
      </div>
      <div className={`${styles.text} mt-15 mb-6 text text_type_main-medium`}>
        Состав:
      </div>
      <div className={`${styles.list} custom-scroll`}>
        {currentOrder.ingredients.map((ingredient) => (
          <div className={`${styles.card}`} key={ingredient.uuid}>
            <img
              className={`${styles.img}`}
              src={ingredient.image_mobile}
              alt={ingredient.name}
            />
            <div className={`${styles.text}`}>{ingredient.name}</div>
            <div className={`${styles.ingPrice} text text_type_digits-medium`}>
              {ingredient.type === INGREDIENT_TYPE.BUN ? 2 : 1} x{" "}
              {ingredient.price}
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>
      <div className={`${styles.bottom} mt-10`}>
        <FormattedDate date={new Date(currentOrder.createdAt)} className={`${styles.createdAt}`} />
        <div className={`${styles.price} text text_type_digits-medium`}>
          {countPrice}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
