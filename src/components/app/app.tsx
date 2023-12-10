import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header.component";
import { BurgerConstructor } from "../burger-constructor/burger-constructor.component";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients.component";
import { useAppSelector } from "../../services/hooks";
import {
  selectIngredientsIsError,
  selectIngredientsLoading,
} from "../../services/burger-ingredients.store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ErrorComponent } from "../error/error.component";

function App() {
  const isLoading = useAppSelector(selectIngredientsLoading);
  const isError = useAppSelector(selectIngredientsIsError);

  return (
    <>
      <AppHeader />
      {isLoading && "Загрузка"}
      {isError && <ErrorComponent />}
      {!isLoading && !isError && (
        <DndProvider backend={HTML5Backend}>
          <main className={styles.body}>
            <article>
              <BurgerIngredients/>
            </article>
            <article>
              <BurgerConstructor/>
            </article>
          </main>
        </DndProvider>
      )}
    </>
  );
}

export default App;
