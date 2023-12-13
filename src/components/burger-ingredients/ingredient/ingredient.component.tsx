import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components/dist';
import styles from './ingredient.module.css';
import { useDrag } from 'react-dnd';
import { IngredientProps } from './ingredient.types';

const Ingredient = (props: IngredientProps) => {

    const [, dragRef] = useDrag({
        type: props.type,
        item: {...props},
    });

    return (
        <section className={`${styles.body} ml-4 mr-4`} onClick={props.onClick} id={props._id} ref={dragRef}>
            <img src={props.image} alt={props.name}/>
            {(props.count !== 0) && props.count && <Counter count={props.count} size="default" extraClass="m-1" />}
            <div className={`text text_type_digits-small`}>{props.price} <CurrencyIcon type='primary'/></div>
            <div className={`text text_type_main-small`}>{props.name}</div>
        </section>
    )
};

export default Ingredient;