import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import styles from "./burger-ingredients.module.css";
import React from "react";
import Ingredient from "./ingredient/ingredient.component";
import { BurgerIngredientsProps } from "./burger-ingredients.types";
import { IngredientDetailsProps } from "./ingredient-details/ingredient-details.types";
import { Modal } from "../modal/modal.component";
import { IngredientDetails } from "./ingredient-details/ingredient-details.component";

const BurgerIngredients = (props: BurgerIngredientsProps) => {
  const [currentTab, setCurrentTab] = React.useState("bun");
  const [currentIngredient, setCurrentIngredient] =
    React.useState<IngredientDetailsProps>();

  const tabs = [
    {
      text: "Булки",
      type: "bun",
      active: currentTab === "bun",
      onClick: () => {
        setCurrentTab("bun");
      },
    },
    {
      text: "Соусы",
      type: "sauce",
      active: currentTab === "sauce",
      onClick: () => {
        setCurrentTab("sauce");
      },
    },
    {
      text: "Начинки",
      type: "main",
      active: currentTab === "main",
      onClick: () => {
        setCurrentTab("main");
      },
    },
  ];

  const onOpen = (entry: any) => {
    const id = entry.currentTarget.id;
    setCurrentIngredient(props.data.find((ingr) => ingr._id === id));
  };

  const onClose = () => {
    setCurrentIngredient(undefined);
  };

  return (
    <>
      <span className={`text text_type_main-large mt-10 mb-5`} style={{display:"flex"}}>
        Соберите бургер
      </span>
      <div style={{ display: "flex" }}>
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
                className={`${styles.header} text text_type_main-medium mt-10 mb-6`}
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
