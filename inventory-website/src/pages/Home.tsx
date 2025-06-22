/**
 * Home.tsx
 *
 * This is the public home page of the inventory system.
 *
 * Features:
 * - Has a welcome screen and a login button
 *
 *
 * Dependencies:
 * - Relies on API functions for fetching products.
 */

import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to Inventory Management</h1>

            <div style={{ marginBottom: "1em" }}>
                <Link to="/login" style={{
                    padding: "0.5em 1em",
                    background: "#1976d2",
                    color: "#fff",
                    borderRadius: "4px",
                    textDecoration: "none",
                    fontWeight: "bold",
                    marginTop: "1em",
                    display: "inline-block"
                }}>
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Home;
