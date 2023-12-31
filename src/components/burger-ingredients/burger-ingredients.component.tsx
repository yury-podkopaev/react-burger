import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import styles from "./burger-ingredients.module.css";
import React, { SyntheticEvent, useCallback, useEffect } from "react";
import Ingredient from "./ingredient/ingredient.component";
import { IngredientDetailsProps } from "./ingredient-details/ingredient-details.types";
import { INGREDIENT_TYPE } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  selectBun,
  selectBurgerConstructor,
} from "../../services/burger-constructor.store";
import {
  setCurrentIngredient,
} from "../../services/current-ingredient.store";
import {
  selectIngredients,
} from "../../services/burger-ingredients.store";

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = React.useState(INGREDIENT_TYPE.BUN);
  const burgerConstructor = useAppSelector(selectBurgerConstructor);
  const dispatch = useAppDispatch();
  const burgerIngredients = useAppSelector(selectIngredients);
  const actualBun = useAppSelector(selectBun);

  const count = useCallback(
    (item: IngredientDetailsProps) => {
      return item._id === actualBun?._id
        ? 2
        : burgerConstructor.filter((ingr) => ingr._id === item._id).length;
    },
    [burgerConstructor, actualBun]
  );

  useEffect(() => {
    document
      .getElementById("scrollable")
      ?.addEventListener("scroll", calculateActiveTab);
    return () => {
      document
        .getElementById("scrollable")
        ?.removeEventListener("scroll", calculateActiveTab);
    };
  });

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
    dispatch(
      setCurrentIngredient(burgerIngredients.find((ingr) => ingr._id === id))
    );
  };

  const calculateActiveTab = () => {
    tabs.every((tab) => {
      const elem = document.getElementById(tab.type);
      const bottom = elem?.getBoundingClientRect().bottom ?? 0;
      if (bottom > 0) {
        setCurrentTab(tab.type);
        return false;
      }
      return true;
    });
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
      <div className={`${styles.list} custom-scroll`} id="scrollable">
        {tabs.map((tab) => {
          return (
            <React.Fragment key={tab.type}>
              <span
                id={tab.type}
                className={`${styles.tabname} text text_type_main-medium mt-10 mb-6`}
              >
                {tab.text}
              </span>
              <div className={styles.ingredient}>
                {burgerIngredients
                  .filter((entry) => entry.type === tab.type)
                  .map((entry) => {
                    return (
                      <Ingredient
                        key={entry._id}
                        {...entry}
                        onClick={onOpen}
                        count={count(entry)}
                      />
                    );
                  })}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export { BurgerIngredients };
