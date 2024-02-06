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
import { getOrder, selectCurrentOrder } from "../../../services/order.store";
import { selectIngredients } from "../../../services/burger-ingredients.store";

export const OrderDetails = () => {
  const location = useLocation();
  let tempOrder: Omit<Order, "ingredients"> & { ingredients: string[] } | Order =
    useAppSelector(selectCurrentOrder);
  const ingredients = useAppSelector(selectIngredients);
  const dispatch = useAppDispatch();

  const url = location.pathname.split("/");
  if(!tempOrder._id){
    dispatch(getOrder(Number(url[url.length - 1])));
  }
  const currentOrder: Order = typeof tempOrder.ingredients[0] === 'string' ? {
    ...tempOrder,
    ingredients: tempOrder.ingredients.map((item) => {
      return ingredients.find((ingredient) => ingredient._id === item)!;
    }),
  } : tempOrder as Order;

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
    <div className={`${styles.body} ml-4 mr-4`}>
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
        {currentOrder.status === "done" ? "Выполнен" : "Готовится"}
      </div>
      <div className={`${styles.text} mt-15 mb-6 text text_type_main-medium`}>
        Состав:
      </div>
      <div className={`${styles.list} custom-scroll`}>
        {currentOrder.ingredients
          .filter((value, index, array) => array.indexOf(value) === index)
          .map((ingredient) => (
            <div className={`${styles.card}`} key={ingredient._id}>
              <img
                className={`${styles.img}`}
                src={ingredient.image_mobile}
                alt={ingredient.name}
              />
              <div className={`${styles.text}`}>{ingredient.name}</div>
              <div
                className={`${styles.ingPrice} text text_type_digits-medium`}
              >
                {
                  currentOrder.ingredients.filter(
                    (i) => i._id === ingredient._id
                  ).length
                }{" "}
                x {ingredient.price}
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
      </div>
      <div className={`${styles.bottom} mt-10`}>
        <FormattedDate
          date={new Date(currentOrder.createdAt)}
          className={`${styles.createdAt}`}
        />
        <div className={`${styles.price} text text_type_digits-medium`}>
          {countPrice}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
