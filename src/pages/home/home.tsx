import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor.component";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients.component";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  // fetchIngredients,
  selectIngredientsIsError,
  selectIngredientsLoading,
} from "../../services/burger-ingredients.store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ErrorComponent } from "../../components/error/error.component";
import styles from "./home.module.css";
// import { useEffect } from "react";

export const HomePage = () => {
    const isLoading = useAppSelector(selectIngredientsLoading);
    const isError = useAppSelector(selectIngredientsIsError);
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //   dispatch(fetchIngredients());
    // }, []);
  
  return (
    <>
      {isLoading && "Загрузка"}
      {isError && <ErrorComponent />}
      {!isLoading && !isError && (
        <DndProvider backend={HTML5Backend}>
          <main className={styles.body}>
            <article>
              <BurgerIngredients />
            </article>
            <article>
              <BurgerConstructor />
            </article>
          </main>
        </DndProvider>
      )}
    </>
  );
};
