import React, { useEffect, useState } from "react";
import { getProducts } from "../api";
import type { Product } from "../types/Product";

/**
 * Items.tsx
 *
 * Lists all products in a user-friendly, Amazon-style list.
 */
const Items: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(Array.isArray(data) ? data : []);
            } catch {
                setProducts([]);
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    if (loading) return <div>Loading items...</div>;

    return (
        <div style={{ maxWidth: 900, margin: "2em auto" }}>
            <h2>All Items</h2>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.5em"
            }}>
                {products.map(product => (
                    <div
                        key={product.id}
                        style={{
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            padding: "1em",
                            width: "260px",
                            background: "#fafafa",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}
                    >
                        <h3 style={{ margin: "0 0 0.5em 0", color: "#1976d2" }}>{product.name}</h3>
                        <div style={{ marginBottom: "0.5em", color: "#555" }}>
                            <strong>SKU:</strong> {product.sku}
                        </div>
                        <div style={{ marginBottom: "0.5em", color: "#333" }}>
                            {product.description}
                        </div>
                        <div style={{ marginBottom: "0.5em" }}>
                            <strong>Category:</strong> {product.category?.name}
                        </div>
                        <div style={{ marginBottom: "0.5em", fontWeight: "bold", color: "#388e3c" }}>
                            ${product.price.toFixed(2)}
                        </div>
                        <div style={{ color: product.quantity > 0 ? "#388e3c" : "#d32f2f" }}>
                            {product.quantity > 0 ? `In Stock: ${product.quantity}` : "Out of Stock"}
                        </div>
                    </div>
                ))}
                {products.length === 0 && (
                    <div style={{ color: "#888" }}>No items found.</div>
                )}
            </div>
        </div>
    );
};

export default Items;
