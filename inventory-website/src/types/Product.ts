import type {Category} from "./Category";

export interface Product {
    id: number;
    name: string;
    sku: string;
    description: string;
    price: number;
    quantity: number;
    category: Category;
}