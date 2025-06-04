import { useDispatch, useSelector } from "react-redux";
import EngineerDashboard from "./Engineer/EngineerDashboard";
import ManagerDashboard from "./Manager/ManagerDashBoard";
import { fetchAssignment } from "../features/assignmentSlice";
import { useEffect } from "react";
import { fetchEngineer } from "../features/engineerSlice";
import { fetchAssignmentWithEngineer } from "../features/engineerAssignmentSlice";
import Loading from "../Component/Loading";

const Dashboard = () => {
  const {
    isLogin,
    user: { role, id },
  } = useSelector((state) => state.userState);

  const dispatch = useDispatch();

  const { engineers, fetchEngineerStatus, error } = useSelector(
    (state) => state.engineerState
  );

  const { assignments, fetchStatus } = useSelector(
    (state) => state.assignmentState
  );

  const { assignments: assignmentswithId, fetchStatus: fetchStatusWithId } =
    useSelector((state) => state.engineerAssignmentState);

  useEffect(() => {
    if (role === "manager") {
      dispatch(fetchEngineer());
      dispatch(fetchAssignment());
    }
  }, []);

  useEffect(() => {
    if (role === "engineer") {
      dispatch(fetchAssignmentWithEngineer(id));
      console.log("this dipatch");
    }
  }, []);

  if (
    fetchEngineerStatus === "loading" ||
    fetchStatus === "loading" ||
    fetchStatusWithId === "loading"
  ) {
    return <Loading />;
  }
  return (
    <>
      {isLogin && role === "manager" && (
        <ManagerDashboard engineers={engineers} assignments={assignments} />
      )}
      {isLogin && role === "engineer" && (
        <EngineerDashboard assignments={assignmentswithId} />
      )}
    </>
  );
};

export default Dashboard;
