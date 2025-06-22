import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminHome from './pages/AdminHome';
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import UserHome from "./pages/UserHome.tsx";
import AccessDenied from "./pages/AccessDenied";

import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './auth/AuthContext';

const App: React.FC = () => (
    <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/access-denied" element={<AccessDenied />} />


                {/* User profile pages: require login */}
                <Route element={<ProtectedRoute requireAuth={true} />}>
                    <Route path="/profile" element={<UserHome />} />
                </Route>
                {/* Admin pages: require login + admin role */}
                <Route element={<ProtectedRoute requireAuth={true} requireAdmin={true} />}>
                    <Route path="/admin" element={<AdminHome />} />
                    <Route path="/admin/add-product" element={<AddProduct />} />
                    <Route path="/admin/edit-product/:id" element={<EditProduct />} />
                </Route>
            </Routes>
        </Router>
    </AuthProvider>
);

export default App;
