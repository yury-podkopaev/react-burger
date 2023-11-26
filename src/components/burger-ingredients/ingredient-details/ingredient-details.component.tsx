import { IngredientDetailsProps } from "./ingredient-details.types";
import styles from './ingredient-details.module.css';

export const IngredientDetails = (props: IngredientDetailsProps) => {
  return (
    <>
      <img className={`${styles.image} ml-20`} src={props.image_large} alt={props.name} />
      <p className={`${styles.name} text text_type_main-medium mt-4 mb-8`}>{props.name}</p>
      <div className={`${styles.body} text text_type_main-small mb-15`}>
        <span>Калории, ккал</span>
        <p className={`text text_type_digits-medium`}>{props.calories}</p>
        <span>Белки, г</span>
        <p className={`text text_type_digits-medium`}>{props.proteins}</p>
        <span>Жиры, г</span>
        <p className={`text text_type_digits-medium`}>{props.fat}</p>
        <span>Углеводы, г</span>
        <p className={`text text_type_digits-medium`}>{props.carbohydrates}</p>
      </div>
    </>
  );
};
