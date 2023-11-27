import styles from './modal-overlay.module.css';
import {ModalOverlayProps} from './modal-overlay.types';

export const ModalOverlay = (props: ModalOverlayProps) => {
    return (
        <div className={styles.body} onClick={props.onClick}>
        </div>
    )
};