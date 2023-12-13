import { SyntheticEvent } from "react";
import { IngredientDetailsProps } from "../ingredient-details/ingredient-details.types";

export interface IngredientProps extends IngredientDetailsProps {
    onClick?: (arg0: SyntheticEvent) => void,
    count?: number,
}