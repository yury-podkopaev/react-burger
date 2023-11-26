import React from "react";
import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header.component";
import { BurgerConstructor } from "../burger-constructor/burger-constructor.component";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients.component";
import { BASE_URL } from "../../constants";

function App() {
  const [state, setState] = React.useState({
    ingredients: [],
    isLoading: true,
    hasError: false,
  });

  React.useEffect(() => {
    const getIngredients = async () => {
      setState({ ...state, isLoading: true });
      await fetch(`${BASE_URL}/ingredients`)
        .then((res) =>  res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))
        .then((res) =>
          setState({ ...state, ingredients: res.data, isLoading: false })
        )
        .catch(() => {
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
