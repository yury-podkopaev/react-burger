import { SyntheticEvent } from "react";
import { IngredientDetailsProps } from "../../burger-ingredients/ingredient-details/ingredient-details.types";

export interface OrderCardProps {
  onClick?: (arg0: SyntheticEvent) => void,
  isFeed: boolean;
  order: Order;
}

export interface Order {
  ingredients: IngredientDetailsProps[];
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};
