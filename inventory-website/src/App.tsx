import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminHome from './pages/AdminHome';
import AddProduct from "./pages/AddProduct";

const App: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
        </Routes>
    </Router>
);

export default App;
