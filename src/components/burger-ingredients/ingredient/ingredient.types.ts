import { SyntheticEvent } from "react";

export interface IngredientProps {
    id?: string,
    name: string,
    src: string,
    price: number,
    counter?: number,
    onClick?: (arg0: SyntheticEvent) => void,
}