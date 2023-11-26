import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import styles from "./burger-ingredients.module.css";
import React, { SyntheticEvent } from "react";
import Ingredient from "./ingredient/ingredient.component";
import { BurgerIngredientsProps } from "./burger-ingredients.types";
import { IngredientDetailsProps } from "./ingredient-details/ingredient-details.types";
import { Modal } from "../modal/modal.component";
import { IngredientDetails } from "./ingredient-details/ingredient-details.component";
import { INGREDIENT_TYPE } from "../../constants";

const BurgerIngredients = (props: BurgerIngredientsProps) => {
  const [currentTab, setCurrentTab] = React.useState(INGREDIENT_TYPE.BUN);
  const [currentIngredient, setCurrentIngredient] =
    React.useState<IngredientDetailsProps>();

  const tabs = [
    {
      text: "Булки",
      type: INGREDIENT_TYPE.BUN,
      active: currentTab === INGREDIENT_TYPE.BUN,
      onClick: () => {
        setCurrentTab(INGREDIENT_TYPE.BUN);
      },
    },
    {
      text: "Соусы",
      type: INGREDIENT_TYPE.SAUCE,
      active: currentTab === INGREDIENT_TYPE.SAUCE,
      onClick: () => {
        setCurrentTab(INGREDIENT_TYPE.SAUCE);
      },
    },
    {
      text: "Начинки",
      type: INGREDIENT_TYPE.MAIN,
      active: currentTab === INGREDIENT_TYPE.MAIN,
      onClick: () => {
        setCurrentTab(INGREDIENT_TYPE.MAIN);
      },
    },
  ];

  const onOpen = (entry: SyntheticEvent) => {
    const id = entry.currentTarget.id;
    setCurrentIngredient(props.data.find((ingr) => ingr._id === id));
  };

  const onClose = () => {
    setCurrentIngredient(undefined);
  };

  return (
    <>
      <span className={`${styles.header} text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </span>
      <div className={`${styles.tabheader}`}>
        {tabs.map((tab) => {
          return (
            <Tab
              key={tab.type}
              value={tab.type}
              active={tab.active}
              onClick={tab.onClick}
            >
              {tab.text}
            </Tab>
          );
        })}
      </div>
      <div className={`${styles.list} custom-scroll`}>
        {tabs.map((tab) => {
          return (
            <React.Fragment key={tab.type}>
              <span
                className={`${styles.tabname} text text_type_main-medium mt-10 mb-6`}
              >
                {tab.text}
              </span>
              <div className={styles.ingredient}>
                {props.data
                  .filter(
                    (entry: IngredientDetailsProps) => entry.type === tab.type
                  )
                  .map((entry: IngredientDetailsProps) => {
                    return (
                      <Ingredient
                        id={entry._id}
                        key={entry._id}
                        src={entry.image}
                        name={entry.name}
                        price={entry.price}
                        counter={1 /* TEMP */}
                        onClick={onOpen}
                      />
                    );
                  })}
              </div>
            </React.Fragment>
          );
        })}
        {currentIngredient && (
          <Modal onClose={onClose} header="Детали ингредиента">
            <IngredientDetails {...currentIngredient!} />
          </Modal>
        )}
      </div>
    </>
  );
};

export { BurgerIngredients };
