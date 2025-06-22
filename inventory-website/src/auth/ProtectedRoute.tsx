import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

/**
 * Props:
 * - requireAuth: If true, user must be logged in.
 * - requireAdmin: If true, user must have ADMIN role.
 */
type ProtectedRouteProps = {
    requireAuth?: boolean;
    requireAdmin?: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requireAuth = false, requireAdmin = false }) => {
    const { currentUser } = useAuth();

    if (requireAuth && !currentUser) {
        // Not logged in
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && currentUser?.role !== "ADMIN") {
        // Logged in but not admin
        return <Navigate to="/access-denied" replace />;
    }

    // Authorized, render child routes
    return <Outlet />;
};

export default ProtectedRoute;
