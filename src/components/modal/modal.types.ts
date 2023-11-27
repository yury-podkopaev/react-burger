import { ReactNode } from "react";

export interface ModalProps {
    header?: string,
    onClose: ()=>void,
    children?: ReactNode,
}