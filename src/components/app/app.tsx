import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header.component";
import { BurgerConstructor } from "../burger-constructor/burger-constructor.component";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients.component";
import { compose } from "redux";
import { useAppSelector } from "../../services/hooks";
import {
  selectIngredients,
  selectIngredientsIsError,
  selectIngredientsLoading,
} from "../../services/burger-ingredients.store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ErrorComponent } from "../error/error.component";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

function App() {
  const isLoading = useAppSelector(selectIngredientsLoading);
  const isError = useAppSelector(selectIngredientsIsError);
  const ingredients = useAppSelector(selectIngredients);

  return (
    <>
      <AppHeader />
      {isLoading && "Загрузка"}
      {isError && <ErrorComponent />}
      {!isLoading && !isError && (
        <DndProvider backend={HTML5Backend}>
          <section className={styles.body}>
            <article>
              <BurgerIngredients data={ingredients} />
            </article>
            <article>
              <BurgerConstructor/>
            </article>
          </section>
        </DndProvider>
      )}
    </>
  );
}

export default App;
