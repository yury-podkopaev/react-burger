import React from "react";
import styles from "./app.module.css";
import { AppHeader } from "./components/app-header/app-header.component";
import { BurgerConstructor } from "./components/burger-constructor/burger-constructor.component";
import { BurgerIngredients } from "./components/burger-ingredients/burger-ingredients.component";

function App() {
  const [state, setState] = React.useState({
    ingredients: [],
    isLoading: true,
    hasError: false,
  });

  React.useEffect(() => {
    const getIngredients = async () => {
      setState({ ...state, isLoading: true });
      await fetch("https://norma.nomoreparties.space/api/ingredients")
        .then((res) => res.json())
        .then((res) =>
          setState({ ...state, ingredients: res.data, isLoading: false })
        )
        .catch((err) => {
          console.error(err);
          setState({ ...state, hasError: true, isLoading: false });
        });
    };
    getIngredients();
  }, []);

  return (
    <>
      <AppHeader />
      {state.isLoading && "Загрузка"}
      {state.hasError && "Ошибка"}
      {!state.isLoading && !state.hasError && (
        <section className={styles.body}>
          <article>
            <BurgerIngredients data={state.ingredients} />
          </article>
          <article>
            <BurgerConstructor data={state.ingredients}/>
          </article>
        </section>
      )}
    </>
  );
}

export default App;
