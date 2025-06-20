// src/pages/AdminHome.tsx
import { Link } from "react-router-dom";

const AdminHome: React.FC = () => (
    <div>
        <h1>Admin Home</h1>
        <Link to="/admin/add-product">Add New Product</Link>
    </div>
);

export default AdminHome;
