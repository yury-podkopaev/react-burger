import styles from './error.module.css';

export const ErrorComponent = () => {
    return (
        <div className={`${styles.body} text text_type_main-large mt-15`}>Что-то пошло не так!</div>
    );
}