import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components/dist';
import styles from './ingredient.module.css';
import {IngredientProps} from './ingredient.types';

const Ingredient = (props: IngredientProps) => {
    return (
        <section className={styles.body} onClick={props.onClick} id={props.id}>
            <img src={props.src} alt={props.name}/>
            {props.counter && <Counter count={props.counter} size="default" extraClass="m-1" />}
            <div className='text text_type_digits-small'>{props.price} <CurrencyIcon type='primary'/></div>
            <div className='text text_type_main-small'>{props.name}</div>
        </section>
    )
};

export default Ingredient;