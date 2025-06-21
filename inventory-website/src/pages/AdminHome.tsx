
/**
 * AdminHome.tsx
 *
 * This is the main admin dashboard page for the inventory management system.
 *
 * Features:
 * - Displays a dropdown menu of all categories at the top, with update and delete actions.
 * - Provides a button to add a new product.
 * - Lists all products in the system, each with options to update or delete.
 * - Update category uses a popup prompt for renaming.
 *
 * Dependencies:
 * - Uses React Router for navigation.
 * - Relies on API functions for categories and products (get, update, delete).
 */


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, updateCategory, deleteCategory, getProducts, deleteProduct } from "../api";
import type { Category } from "../types/Category";
import type { Product } from "../types/Product";



const AdminHome: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);
    const [deletingCategory, setDeletingCategory] = useState(false);
    const [deletingProductId, setDeletingProductId] = useState<number | null>(null);

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const fetchCategories = async () => {
        const data = await getCategories();
        setCategories(Array.isArray(data) ? data : []);
        if (data.length > 0 && !selectedCategoryId) {
            setSelectedCategoryId(data[0].id.toString());
        }
    };

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategoryId(e.target.value);
    };

    const handleUpdateCategory = async () => {
        const category = categories.find(c => c.id.toString() === selectedCategoryId);
        if (!category) return;
        const newName = window.prompt("Enter new category name:", category.name);
        if (newName && newName.trim() && newName !== category.name) {
            try {
                await updateCategory(category.id, { name: newName.trim() });
                await fetchCategories();
                alert("Category updated!");
            } catch {
                alert("Failed to update category.");
            }
        }
    };

    const handleDeleteCategory = async () => {
        if (!selectedCategoryId) return;
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        setDeletingCategory(true);
        try {
            await deleteCategory(Number(selectedCategoryId));
            await fetchCategories();
            alert("Category deleted!");
        } catch {
            alert("Failed to delete category.");
        }
        setDeletingCategory(false);
    };

    const handleDeleteProduct = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        setDeletingProductId(id);
        try {
            await deleteProduct(id);
            setProducts(products.filter(p => p.id !== id));
        } catch {
            alert("Failed to delete product.");
        }
        setDeletingProductId(null);
    };

    return (
        <div style={{ maxWidth: 600, margin: "2em auto" }}>
            {/* Category Dropdown and Actions */}
            <div style={{ marginBottom: "2em", display: "flex", alignItems: "center", gap: "1em" }}>
                <select
                    value={selectedCategoryId}
                    onChange={handleCategoryChange}
                    style={{ padding: "0.5em", fontSize: "1em" }}
                >
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleUpdateCategory}
                    style={{
                        background: "#1976d2",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "0.5em 1em",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Update
                </button>
                <button
                    onClick={handleDeleteCategory}
                    disabled={deletingCategory}
                    style={{
                        background: "#d32f2f",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "0.5em 1em",
                        cursor: deletingCategory ? "not-allowed" : "pointer",
                        fontWeight: "bold"
                    }}
                >
                    {deletingCategory ? "Deleting..." : "Delete"}
                </button>
                <Link to="/admin/add-product" style={{
                    marginLeft: "auto",
                    padding: "0.5em 1em",
                    background: "#388e3c",
                    color: "#fff",
                    borderRadius: "4px",
                    textDecoration: "none",
                    fontWeight: "bold"
                }}>
                    + Add Product
                </Link>
            </div>

            <h2>All Products</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {products.map(product => (
                    <li
                        key={product.id}
                        style={{
                            padding: "0.75em 1em",
                            borderBottom: "1px solid #eee",
                            fontSize: "1.1em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <span>
                            {product.name}
                        </span>
                        <span>
                            <Link
                                to={`/admin/edit-product/${product.id}`}
                                style={{
                                    marginRight: "1em",
                                    color: "#1976d2",
                                    textDecoration: "underline",
                                    fontWeight: "bold"
                                }}
                            >
                                Update
                            </Link>
                            <button
                                onClick={() => handleDeleteProduct(product.id)}
                                disabled={deletingProductId === product.id}
                                style={{
                                    color: "#fff",
                                    background: "#d32f2f",
                                    border: "none",
                                    borderRadius: "4px",
                                    padding: "0.3em 0.8em",
                                    cursor: "pointer",
                                    fontWeight: "bold"
                                }}
                            >
                                {deletingProductId === product.id ? "Deleting..." : "Delete"}
                            </button>
                        </span>
                    </li>
                ))}
                {products.length === 0 && (
                    <li style={{ color: "#888" }}>No products found.</li>
                )}
            </ul>
        </div>
    );
};

export default AdminHome;
