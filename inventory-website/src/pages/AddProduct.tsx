import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, addProduct, addCategory } from "../api";
import type { Category } from "../types/Category";

const AddProduct: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        categoryId: "",
    });
    const [newCategoryName, setNewCategoryName] = useState("");
    const [addingCategory, setAddingCategory] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const data = await getCategories();
        setCategories(Array.isArray(data) ? data : []);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addProduct({
                name: form.name,
                description: form.description,
                price: Number(form.price),
                quantity: Number(form.quantity),
                categoryId: Number(form.categoryId),
            });
            navigate("/");
        } catch (err) {
            alert("Failed to add product");
        }
    };

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;
        setAddingCategory(true);
        try {
            await addCategory({ name: newCategoryName });
            setNewCategoryName("");
            await fetchCategories();
            alert("Category added!");
        } catch {
            alert("Failed to add category.");
        }
        setAddingCategory(false);
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                <div style={{ marginBottom: 10 }}>
                    <label>
                        Product Name<br />
                        <input
                            name="name"
                            placeholder="E.g. Wireless Mouse"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        <div style={{ fontSize: 12, color: "#666" }}>
                            The name of the product as it will appear in the store.
                        </div>
                    </label>
                </div>
                <div style={{ marginBottom: 10 }}>
                    <label>
                        Description<br />
                        <input
                            name="description"
                            placeholder="E.g. Ergonomic wireless mouse with USB receiver"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                        <div style={{ fontSize: 12, color: "#666" }}>
                            A short description to help customers understand the product.
                        </div>
                    </label>
                </div>
                <div style={{ marginBottom: 10 }}>
                    <label>
                        Price ($)<br />
                        <input
                            name="price"
                            type="number"
                            placeholder="E.g. 29.99"
                            value={form.price}
                            onChange={handleChange}
                            min={0}
                            step={0.01}
                            required
                        />
                        <div style={{ fontSize: 12, color: "#666" }}>
                            The selling price for this product.
                        </div>
                    </label>
                </div>
                <div style={{ marginBottom: 10 }}>
                    <label>
                        Quantity in Stock<br />
                        <input
                            name="quantity"
                            type="number"
                            placeholder="E.g. 50"
                            value={form.quantity}
                            onChange={handleChange}
                            min={0}
                            required
                        />
                        <div style={{ fontSize: 12, color: "#666" }}>
                            How many units of this product are currently available.
                        </div>
                    </label>
                </div>
                <div style={{ marginBottom: 10 }}>
                    <label>
                        Category<br />
                        <select
                            name="categoryId"
                            value={form.categoryId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <div style={{ fontSize: 12, color: "#666" }}>
                            Select the category this product belongs to, or create a new one below.
                        </div>
                    </label>
                </div>
                <button type="submit">Add Product</button>
            </form>

            <hr style={{ margin: "2em 0" }} />

            <h3>Create New Category</h3>
            <form onSubmit={handleAddCategory} style={{ maxWidth: 400 }}>
                <input
                    value={newCategoryName}
                    onChange={e => setNewCategoryName(e.target.value)}
                    placeholder="New category name"
                    disabled={addingCategory}
                    required
                />
                <button type="submit" disabled={addingCategory}>
                    {addingCategory ? "Adding..." : "Add Category"}
                </button>
                <div style={{ fontSize: 12, color: "#666" }}>
                    Use this form to add a new category to the database.
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
