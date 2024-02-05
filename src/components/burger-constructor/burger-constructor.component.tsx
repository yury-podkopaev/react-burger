import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import {
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useMemo, useState } from "react";
import { Modal } from "../modal/modal.component";
import { OrderConfirmation } from "../order-confirmation/order-confirmation.component";
import { INGREDIENT_TYPE } from "../../constants";
import { useDrop } from "react-dnd";
import {
  addIngredient,
  clearBurgerConstructor,
  removeIngredient,
  selectBun,
  selectBurgerConstructor,
  setBun,
} from "../../services/burger-constructor.store";
import { IngredientProps } from "../burger-ingredients/ingredient/ingredient.types";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { selectOrderNumber, sendOrder } from "../../services/order.store";
import { store } from "../../services/store";
import { ErrorComponent } from "../error/error.component";
import { DragContainer } from "./drag-container/drag-container.component";
import { selectIsAuthorized } from "../../services/auth.store";
import { useNavigate } from "react-router-dom";

const BurgerConstructor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const orderNumber = useAppSelector(selectOrderNumber);
  const currentBurger = useAppSelector(selectBurgerConstructor);
  const actualBun = useAppSelector(selectBun);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const navigate = useNavigate();

  const [, drop] = useDrop({
    accept: [INGREDIENT_TYPE.MAIN, INGREDIENT_TYPE.SAUCE],
    drop: (item: IngredientProps) => {
      const { onClick, ...details } = item;
      dispatch(addIngredient(details));
    },
  });

  const [, dropBun] = useDrop({
    accept: INGREDIENT_TYPE.BUN,
    drop: (item: IngredientProps) => {
      const { onClick, ...details } = item;
      dispatch(setBun(details));
    },
  });

  const totalPrice = useMemo(
    () =>
      (actualBun ? 2 * actualBun.price : 0) +
      currentBurger.reduce(
        (total, ingredient) => (total += ingredient.price),
        0
      ),
    [currentBurger, actualBun]
  );

  const onCloseButtonClick = (item: IngredientProps) => {
    const { onClick, ...details } = item;
    dispatch(removeIngredient(details));
  };

  const onSubmitButtonClick = async () => {
    if (!isAuthorized) {
      navigate("/login");
    } else {
      await store.dispatch(sendOrder([...currentBurger.map((item) => item._id), actualBun!._id]))
      .then((response) => {
        setIsVisible(true);
        if(response.type === 'sendOrder/fulfilled'){
          dispatch(clearBurgerConstructor());
        }
      });
    }
  };

  const onClose = () => {
    setIsVisible(false);
  };

  return (
    <div className={`mt-25`}>
      <div ref={dropBun}>
        <ConstructorElement
          type="top"
          text={
            actualBun?.name ? `${actualBun?.name} (верх)` : "Выберите булку"
          }
          thumbnail={actualBun?.image_mobile ?? " "}
          price={actualBun?.price ?? 0}
          isLocked={true}
        />
      </div>
      <div className={`${styles.body} custom-scroll`} ref={drop}>
        <ul className={`${styles.list}`}>
          {currentBurger.map((entry, index: number) => {
            return (
              <DragContainer key={entry.uuid} id={entry._id} index={index}>
                <DragIcon type="primary" />
                <ConstructorElement
                  key={entry.uuid}
                  text={entry.name}
                  thumbnail={entry.image_mobile}
                  price={entry.price}
                  handleClose={() => onCloseButtonClick(entry)}
                />
              </DragContainer>
            );
          })}
        </ul>
      </div>
      <ConstructorElement
        type="bottom"
        text={actualBun?.name ? `${actualBun?.name} (низ)` : "Выберите булку"}
        thumbnail={actualBun?.image_mobile ?? " "}
        price={actualBun?.price ?? 0}
        isLocked={true}
      />
      <div className={`${styles.footer} mt-10`}>
        <div className={`${styles.price} mr-10`}>
          <span className="text text_type_digits-medium mr-1">
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="submit"
          type="primary"
          onClick={onSubmitButtonClick}
          disabled={!actualBun}
        >
          Оформить заказ
        </Button>
        {isVisible && (
          <Modal onClose={onClose}>
            {orderNumber ? (
              <OrderConfirmation orderNumber={orderNumber} />
            ) : (
              <ErrorComponent />
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};

export { BurgerConstructor };
