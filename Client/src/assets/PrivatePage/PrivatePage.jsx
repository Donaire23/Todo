import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const PrivatePage = ()=> {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const token = Cookies.get('token');
    useEffect(() => {
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/login');
      }
    }, [token]);
  
    return isAuthenticated ? <Outlet /> : null;
}

export default PrivatePage