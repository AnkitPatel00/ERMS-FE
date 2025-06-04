import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLogin } = useSelector((state) => state.userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login", { replace: true });
    }
  }, [isLogin]);

  if (!isLogin) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
