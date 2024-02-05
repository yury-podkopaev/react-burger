import { SyntheticEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { setCurrentOrder } from "../../services/order.store";
import styles from "./feed.module.css";
import { OrderCard } from "../../components/orders-list/order-card/order-card.component";
import { getStatusColor } from "../../components/orders-list/utils";
import { selectOrderList } from "../../services/orderList.store";
import { connect, disconnect } from "../../services/actions";

export const Feed = () => {
  const {
    orders: orderList,
    total,
    totalToday,
  } = useAppSelector(selectOrderList);
  const dispatch = useAppDispatch();
  const onOrderClick = (event: SyntheticEvent) => {
    const id = event.currentTarget.id;
    dispatch(setCurrentOrder(orderList.find((o) => o._id === id)));
  };

  useEffect(() => {
    dispatch(connect("wss://norma.nomoreparties.space/orders/all"));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  if (!orderList) {
    return <div>LOADING</div>;
  }

  return (
    <div className={`${styles.body}`}>
      <div className={`${styles.left}`}>
        <span className={`${styles.header} text text_type_main-large mt-10`}>
          Лента заказов
        </span>
        <div className={`${styles.wrapper} mt-10 custom-scroll`}>
          {orderList.map((order) => (
              <OrderCard isFeed={true} order={order} onClick={onOrderClick} key={order._id} />
          ))}
        </div>
      </div>
      <div className={`${styles.right} mt-10`}>
        <div className={`${styles.orderStates}`}>
          <div>
            <div className={`${styles.list} text text_type_main-medium`}>
              Готовы:
            </div>
            {orderList
              .filter((order) => order.status === "done")
              .filter((_, index) => {
                return index <= 10;
              })
              .map((order) => (
                <div
                  key={order._id}
                  className="text text_type_digits-default mt-2"
                  style={{ color: getStatusColor(order.status) }}
                >
                  {order.number}
                </div>
              ))}
          </div>
          <div>
            <div className={`${styles.list} text text_type_main-medium`}>
              В работе:
            </div>
            {orderList
              .filter((order) => order.status === "pending")
              .map((order) => (
                <p
                  key={order._id}
                  className="text text_type_digits-default mt-2"
                  style={{ color: getStatusColor(order.status) }}
                >
                  {order.number}
                </p>
              ))}
          </div>
        </div>
        <div className={`${styles.total}`}>
          <div className="text text_type_main-medium mt-15">
            Выполнено за всё время:
          </div>
          <div className="text text_type_digits-large">{total}</div>
        </div>
        <div className={`${styles.total}`}>
          <div className="text text_type_main-medium mt-15">
            Выполнено за сегодня:
          </div>
          <div className="text text_type_digits-large">{totalToday}</div>
        </div>
      </div>
    </div>
  );
};
