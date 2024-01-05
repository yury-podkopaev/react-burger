import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components/dist';
import styles from './ingredient.module.css';
import { useDrag } from 'react-dnd';
import { IngredientProps } from './ingredient.types';
import { Link, useLocation } from 'react-router-dom';

const Ingredient = (props: IngredientProps) => {
    const location = useLocation();

    const [, dragRef] = useDrag({
        type: props.type,
        item: {...props},
    });

    const ingredientId = props['_id'];

    return (
        <Link
        key={ingredientId}
        // Тут мы формируем динамический путь для нашего ингредиента
        to={`/ingredients/${ingredientId}`}
        // а также сохраняем в свойство background роут,
        // на котором была открыта наша модалка
        state={{ background: location }}
        className={styles.link}
        ref={dragRef}
      >
        <section className={`${styles.body} ml-4 mr-4`} onClick={props.onClick} id={props._id} >
            <img src={props.image} alt={props.name}/>
            {(props.count !== 0) && props.count && <Counter count={props.count} size="default" extraClass="m-1" />}
            <div className={`text text_type_digits-small`}>{props.price} <CurrencyIcon type='primary'/></div>
            <div className={`text text_type_main-small`}>{props.name}</div>
        </section>
        </Link>
    )
};

export default Ingredient;
