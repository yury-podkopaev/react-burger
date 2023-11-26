import { IngredientDetailsProps } from "./ingredient-details.types";
import styles from './ingredient-details.module.css';

export const IngredientDetails = (props: IngredientDetailsProps) => {
  return (
    <>
      <img className={`${styles.image} pl-10`} src={props.image_large} alt={props.name} />
      <p className={`text text_type_main-medium`}>{props.name}</p>
      <div className={`${styles.body} text text_type_main-small`}>
        <span>Калории, ккал</span>
        <p>{props.calories}</p>
        <span>Белки, г</span>
        <p>{props.proteins}</p>
        <span>Жиры, г</span>
        <p>{props.fat}</p>
        <span>Углеводы, г</span>
        <p>{props.carbohydrates}</p>
      </div>
    </>
  );
};
