import { Link, useLocation } from "react-router-dom";
import { OrderCardProps } from "./order-card.types";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useMemo } from "react";
import styles from "./order-card.module.css";
import { getStatusColor } from "../utils";

export const OrderCard = (props: OrderCardProps) => {
  const location = useLocation();

  const orderNumber = props.order.number;

  const countPrice = useMemo(
    () =>
      props.order.ingredients.reduce(
        (total, ingredient) => (total += ingredient.price),
        0
      ),
    [props.order.ingredients]
  );

  return (
    <Link
      key={orderNumber}
      to={
        props.isFeed ? `/feed/${orderNumber}` : `/profile/orders/${orderNumber}`
      }
      state={{ background: location }}
    >
      <section
        className={`${styles.body} ml-4 mr-4 mb-4`}
        onClick={props.onClick}
        id={props.order._id}
      >
        <div className={`${styles.header}`}>
          <div
            className={`${styles.text} mt-6 ml-4 text text_type_digits-default`}
          >
            #{props.order.number}
          </div>
          <FormattedDate
            className={`${styles.coloured} text text_type_main-default mr-4`}
            date={new Date(props.order.createdAt)}
          />
        </div>
        <div className={`${styles.name} mt-6 ml-6 text text_type_main-medium`}>
          {props.order.name}
        </div>
        {!props.isFeed && (
          <div
            className={`${styles.name} mt-2 ml-6 text text_type_main-small`}
            style={{ color: getStatusColor(props.order.status) }}
          >
            {props.order.status === "done" ? "Выполнен" : "Готовится"}
          </div>
        )}
        <div className={`${styles.bottom} mt-6 mb-6`}>
          {props.order.ingredients
            .filter((value, index, array) => array.indexOf(value) === index)
            .filter((_, index) => {
              return index <= 5;
            })
            .map((ingredient) => (
              <img
                key={ingredient._id}
                className={`${styles.img}`}
                src={ingredient.image_mobile}
                alt={ingredient.name}
              />
            ))}
          {props.order.ingredients.length > 6 && (
            <>
              <img
                key={props.order.ingredients[6].uuid}
                className={`${styles.img} ${styles.dark}`}
                src={props.order.ingredients[6].image_mobile}
                alt={props.order.ingredients[6].name}
              />
              <div className={`${styles.imgText}`}>
                +{props.order.ingredients.length - 5}
              </div>
            </>
          )}
          <div className={`${styles.price} text text_type_digits-medium`}>
            {countPrice}
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </section>
    </Link>
  );
};
