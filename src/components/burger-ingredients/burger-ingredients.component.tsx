import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import styles from "./burger-ingredients.module.css";
import React, { SyntheticEvent, useCallback, useEffect } from "react";
import Ingredient from "./ingredient/ingredient.component";
import { BurgerIngredientsProps } from "./burger-ingredients.types";
import { IngredientDetailsProps } from "./ingredient-details/ingredient-details.types";
import { Modal } from "../modal/modal.component";
import { IngredientDetails } from "./ingredient-details/ingredient-details.component";
import { INGREDIENT_TYPE } from "../../constants";
import { useAppSelector } from "../../services/hooks";
import { selectBurgerConstructor } from "../../services/burger-constructor.store";
import { useDispatch } from "react-redux";
import { clearCurrentIngredient, selectCurrentIngredient, setCurrentIngredient } from "../../services/current-ingredient.store";

const BurgerIngredients = (props: BurgerIngredientsProps) => {
  const [currentTab, setCurrentTab] = React.useState(INGREDIENT_TYPE.BUN);
  const burgerConstructor = useAppSelector(selectBurgerConstructor);
  const currentIngredient = useAppSelector(selectCurrentIngredient);
  const dispatch = useDispatch();

  const count = useCallback((item: IngredientDetailsProps) => {
    return burgerConstructor.filter((ingr) => ingr._id === item._id).length;
  },[burgerConstructor]);

  useEffect(() => {
    document.getElementById('scrollable')?.addEventListener('scroll', calculateActiveTab);
    return () => {
      document.getElementById('scrollable')?.removeEventListener('scroll', calculateActiveTab);
    };
  })

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
    dispatch(setCurrentIngredient(props.data.find((ingr) => ingr._id === id)));
  };

  const onClose = () => {
    dispatch(clearCurrentIngredient());
  };

  const calculateActiveTab = () => {
    tabs.every(tab => {
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
              <span id={tab.type}
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
        {currentIngredient._id && (
          <Modal onClose={onClose} header="Детали ингредиента">
            <IngredientDetails {...currentIngredient} />
          </Modal>
        )}
      </div>
    </>
  );
};

export { BurgerIngredients };
