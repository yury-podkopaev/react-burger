import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import {
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { BurgerConstructorProps } from "./burger-constructor.types";
import { IngredientDetailsProps } from "../burger-ingredients/ingredient-details/ingredient-details.types";
import { useState } from "react";
import { Modal } from "../modal/modal.component";
import { OrderDetails } from "../order-details/order-details.component";
import { INGREDIENT_TYPE } from "../../constants";

const BurgerConstructor = (props: BurgerConstructorProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const onButtonClick = () => {
    setIsVisible(true);
  };

  const onClose = () => {
    setIsVisible(false);
  };

  const firstBun = props.data.find((entry) => {
    return entry.type === INGREDIENT_TYPE.BUN;
  });

  return (
    <>
      <div key={firstBun?._id} className={`mt-25`}>
        <ConstructorElement
          type="top"
          text={firstBun!.name}
          thumbnail={firstBun!.image_mobile}
          price={firstBun!.price}
          isLocked={true}
        />
      </div>
      <div className={`${styles.body} custom-scroll`}>
        {props.data.map((entry: IngredientDetailsProps) => {
          const isBun = entry.type === INGREDIENT_TYPE.BUN;
          return (
            <>
              {!isBun && (
                <div key={entry._id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={entry.name}
                    thumbnail={entry.image_mobile}
                    price={entry.price}
                  />
                </div>
              )}
            </>
          );
        })}
      </div>

      <ConstructorElement
        type="bottom"
        text={firstBun!.name}
        thumbnail={firstBun!.image_mobile}
        price={firstBun!.price}
        isLocked={true}
      />
      <div className={`${styles.footer} mt-10`}>
        <div className={`${styles.price} mr-10`}>
          <span className="text text_type_digits-medium mr-1">666</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="submit" type="primary" onClick={onButtonClick}>
          Оформить заказ
        </Button>
        {isVisible && (
          <Modal onClose={onClose}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </>
  );
};

export { BurgerConstructor };
