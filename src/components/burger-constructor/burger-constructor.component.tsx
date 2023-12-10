import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import {
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useMemo, useState } from "react";
import { Modal } from "../modal/modal.component";
import { OrderDetails } from "../order-details/order-details.component";
import { INGREDIENT_TYPE } from "../../constants";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  selectBurgerConstructor,
} from "../../services/burger-constructor.store";
import { IngredientProps } from "../burger-ingredients/ingredient/ingredient.types";
import { useAppSelector } from "../../services/hooks";
import { selectOrderNumber, sendOrder } from "../../services/order.store";
import { store } from "../../services/store";
import { ErrorComponent } from "../error/error.component";
import { DragContainer } from "./drag-container/drag-container.component";

const BurgerConstructor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const orderNumber = useAppSelector(selectOrderNumber);
  const currentBurger = useAppSelector(selectBurgerConstructor);

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
      dispatch(addIngredient(details));
    },
  });

  const totalPrice = useMemo(
    () =>
      currentBurger.reduce((total, ingredient) => total + ingredient.price, 0),
    [currentBurger]
  );

  const onCloseButtonClick = (item: IngredientProps) => {
    const { onClick, ...details } = item;
    dispatch(removeIngredient(details));
  };

  const onSubmitButtonClick = async () => {
    await store.dispatch(sendOrder(currentBurger.map((item) => item._id)));
    setIsVisible(true);
  };

  const onClose = () => {
    setIsVisible(false);
  };

  const actualBun =
    currentBurger.find((entry) => {
      return entry.type === INGREDIENT_TYPE.BUN;
    }) || null;

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
          key={actualBun?.uuid}
        />
      </div>
      <div className={`${styles.body} custom-scroll`} ref={drop}>
        {currentBurger.map((entry, index: number) => {
          return entry.type !== INGREDIENT_TYPE.BUN ? (
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
          ) : (
            <></>
          );
        })}
      </div>
      <ConstructorElement
        type="bottom"
        text={actualBun?.name ? `${actualBun?.name} (низ)` : "Выберите булку"}
        thumbnail={actualBun?.image_mobile ?? " "}
        price={actualBun?.price ?? 0}
        isLocked={true}
        key={actualBun?._id}
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
          disabled={!totalPrice}
        >
          Оформить заказ
        </Button>
        {isVisible && (
          <Modal onClose={onClose}>
            {orderNumber ? (
              <OrderDetails orderNumber={orderNumber} />
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
