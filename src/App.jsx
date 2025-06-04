import Header from "./Component/Header";
import Sidebar from "./Component/SideBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import TeamOverview from "./Pages/Manager/TeamOverview";
import MyAssignments from "./Pages/Engineer/MyAssignments";

function App() {
  const location = useLocation();

  const {
    isLogin,
    user: { role },
  } = useSelector((state) => state.userState);

  return (
    <>
      <Header />

      <div className="container-fluid  py-4">
        <div className="row mx-5">
          <div className="col-12 col-lg-2 p-4 border rounded bg-light ">
            <Sidebar />
          </div>
          <div className="col-12 col-lg-10 border rounded p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
