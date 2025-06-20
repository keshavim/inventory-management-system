import axios from "axios";
import type {Category} from "./types/Category";
import type {Product} from "./types/Product";

// --- CATEGORY API ---

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
    const res = await axios.get<Category[]>("/api/categories");
    return res.data;
};

// Get a single category by ID
export const getCategoryById = async (id: number): Promise<Category> => {
    const res = await axios.get<Category>(`/api/categories/${id}`);
    return res.data;
};

// Create a new category
export const addCategory = async (category: { name: string }): Promise<Category> => {
    const res = await axios.post<Category>("/api/categories", category);
    return res.data;
};

// Update an existing category
export const updateCategory = async (id: number, category: { name: string }): Promise<Category> => {
    const res = await axios.put<Category>(`/api/categories/${id}`, category);
    return res.data;
};

// Delete a category
export const deleteCategory = async (id: number): Promise<void> => {
    await axios.delete(`/api/categories/${id}`);
};


// --- PRODUCT API ---

// Get all products
export const getProducts = async (): Promise<Product[]> => {
    const res = await axios.get<Product[]>("/api/products");
    return res.data;
};

// Get a single product by ID
export const getProductById = async (id: number): Promise<Product> => {
    const res = await axios.get<Product>(`/api/products/${id}`);
    return res.data;
};

// Create a new product
export const addProduct = async (product: Omit<Product, "id" | "category"> & { categoryId: number }): Promise<Product> => {
    const res = await axios.post<Product>("/api/products", {
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category: { id: product.categoryId }
    });
    return res.data;
};

// Update an existing product
export const updateProduct = async (id: number, product: Omit<Product, "id" | "category"> & { categoryId: number }): Promise<Product> => {
    const res = await axios.put<Product>(`/api/products/${id}`, product);
    return res.data;
};

// Delete a product
export const deleteProduct = async (id: number): Promise<void> => {
    await axios.delete(`/api/products/${id}`);
};

// Get stock report
export interface StockReportDTO {
    productId: number;
    productName: string;
    quantity: number;
}

export const getStockReport = async (): Promise<StockReportDTO[]> => {
    const res = await axios.get<StockReportDTO[]>("/api/products/stock-report");
    return res.data;
};
