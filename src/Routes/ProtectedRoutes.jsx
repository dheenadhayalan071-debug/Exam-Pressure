import React, { Children, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ Children }) => {
  const user = localStorage.getItem("user");
  const isAuthenticated = JSON.parse(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated?.isLogin) {
      return navigate("/login");
    }
  });

  return Children;
};

export default ProtectedRoutes;
