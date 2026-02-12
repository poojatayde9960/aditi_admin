import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtector = ({ compo }) => {
    const { admin } = useSelector((state) => state.Auth);

    return (
        <div>
            {admin ? (
                <>{compo}</>
            ) : (
                <Navigate to="/login" replace />
            )}
        </div>
    );
};

export default AdminProtector;
