import styles from './ingredient-details.module.css';
import { useAppSelector } from "../../../services/hooks";
import { selectCurrentIngredient } from '../../../services/current-ingredient.store';

export const IngredientDetails = () => {
  const currentIngredient = useAppSelector(selectCurrentIngredient);
  return (
    <>
      <img className={`${styles.image} ml-20`} src={currentIngredient.image_large} alt={currentIngredient.name} />
      <p className={`${styles.name} text text_type_main-medium mt-4 mb-8`}>{currentIngredient.name}</p>
      <div className={`${styles.body} text text_type_main-small mb-15`}>
        <span>Калории, ккал</span>
        <p className={`text text_type_digits-medium`}>{currentIngredient.calories}</p>
        <span>Белки, г</span>
        <p className={`text text_type_digits-medium`}>{currentIngredient.proteins}</p>
        <span>Жиры, г</span>
        <p className={`text text_type_digits-medium`}>{currentIngredient.fat}</p>
        <span>Углеводы, г</span>
        <p className={`text text_type_digits-medium`}>{currentIngredient.carbohydrates}</p>
      </div>
    </>
  );
};
