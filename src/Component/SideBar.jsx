import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiFillProduct } from "react-icons/ai";
import { AiFillFolder } from "react-icons/ai";
import { AiFillFileAdd } from "react-icons/ai";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiFillFile } from "react-icons/ai";
const Sidebar = () => {
  const location = useLocation();

  const {
    isLogin,
    user: { role },
  } = useSelector((state) => state.userState);

  const navigate = useNavigate();

  if (location.pathname === "/") {
    return (
      <>
        {isLogin && role === "manager" && (
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                <AiFillProduct />
                <i className="fa-solid fa-bars-progress"></i> Dashboard{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/projectmanagement">
                <AiFillFolder />
                <i className="fa-solid fa-clipboard-check"></i> Project
                Management
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/team-overview">
                <AiOutlineUsergroupDelete />
                <i className="fa-solid fa-bars-progress"></i> Team Overview{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/createassignment">
                <AiFillFileAdd />
                <i className="fa-solid fa-user-group"></i> Create Assignment
              </NavLink>
            </li>
          </ul>
        )}
        {isLogin && role === "engineer" && (
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                <AiFillProduct />
                <i className="fa-solid fa-bars-progress"></i> Dashboard{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/my-assignment">
                <AiFillFile />
                <i className="fa-solid fa-bars-progress"></i> My Assignments{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                <AiOutlineUser />
                <i className="fa-solid fa-user-group"></i> Profile
              </NavLink>
            </li>
          </ul>
        )}
      </>
    );
  } else {
    return (
      <ul className="navbar-nav ">
        <li className="nav-item">
          <NavLink className="btn  btn-outline-secondary mb-3" to="/">
            <i className="fa-solid fa-bars-progress"></i> Back to Dashboard
          </NavLink>
        </li>

        <li className="nav-item">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-arrow-left"></i> Go Back
          </button>
        </li>
      </ul>
    );
  }
};

export default Sidebar;
