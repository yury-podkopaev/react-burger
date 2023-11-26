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

const BurgerConstructor = (props: BurgerConstructorProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const onButtonClick = () => {
    setIsVisible(true);
  };

  const onClose = () => {
    setIsVisible(false);
  };

  const firstBun = props.data.find((entry) => {
    return entry.type === "bun";
  });

  return (
    <>
      <div style={{ marginTop: "8em" }}>
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
          const isBun = entry.type === "bun";
          return (
            <>
              {!isBun && (
                <div>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={entry.name}
                    thumbnail={entry.image_mobile}
                    price={entry.price}
                    isLocked={false}
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
      <div style={{ marginTop: "2em", display: "flex" }}>
        <span className="text text_type_digits-medium">666</span>
        <CurrencyIcon type="primary" />
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
