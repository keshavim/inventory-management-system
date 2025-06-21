/**
 * Home.tsx
 *
 * This is the public home page of the inventory system.
 *
 * Features:
 * - Displays a list of all products (or a subset, if desired).
 * - May provide links to product details or other public features.
 *
 * Dependencies:
 * - Relies on API functions for fetching products.
 */

import React, { useEffect, useState } from "react";
import { getProducts } from "../api";
import type {Product} from "../types/Product";



const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1rem"
        }}>
            {products.map(product => (
                <div key={product.id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "16px" }}>
                    <h3>{product.name}</h3>
                    <p>{product.sku}</p>
                    <p>{product.description}</p>
                    <p>Category: {product.category?.name}</p>
                    <p>Price: ${product.price}</p>
                    <p>In Stock: {product.quantity}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
