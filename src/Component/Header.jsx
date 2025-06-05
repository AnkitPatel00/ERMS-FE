import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/userSlice";

const Header = () => {
  const { isLogin, user } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-body-secondary py-3 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h3 m-0">🛠 ERMS</h1>

        {isLogin && (
          <div className="d-flex align-items-center gap-3">
            <span className="text-dark fw-semibold">
              Welcome, {user.name} ({user.role})
            </span>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
