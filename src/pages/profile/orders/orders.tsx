import { SyntheticEvent, useEffect } from "react";
import { OrderCard } from "../../../components/orders-list/order-card/order-card.component";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { setCurrentOrder } from "../../../services/order.store";
import styles from './orders.module.css';
import { selectOrderList } from "../../../services/orderList.store";
import { connect, disconnect } from "../../../services/actions";

export const Orders = () => {
  const { orders: orderList } = useAppSelector(selectOrderList);
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const onOrderClick = (event: SyntheticEvent) => {
    const id = event.currentTarget.id;
    dispatch(setCurrentOrder(orderList.find((o) => o._id === id)));
  };

  useEffect(() => {
    dispatch(connect('wss://norma.nomoreparties.space/orders/all?token=' + token?.substring(7)));
    return () => {
      dispatch(disconnect());
    }
  }, [dispatch, token])

  if (!orderList) {
    return <div>LOADING</div>;
  }

  return (
    <div className={`${styles.wrapper} custom-scroll`}>
      {orderList.map((order) => (
        <div key={order._id}>
          <OrderCard isFeed={false} order={order} onClick={onOrderClick}
/>
        </div>
      ))}
    </div>
  );
};
