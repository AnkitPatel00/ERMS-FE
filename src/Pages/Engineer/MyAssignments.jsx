import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignmentWithEngineer } from "../../features/engineerAssignmentSlice";
import EngineerDashboard from "./EngineerDashboard";
import Loading from "../../Component/Loading";

const MyAssignments = () => {
  const dispatch = useDispatch();
  const {
    user: { id },
  } = useSelector((state) => state.userState);
  const { assignments, fetchStatus } = useSelector(
    (state) => state.engineerAssignmentState
  );

  useEffect(() => {
    dispatch(fetchAssignmentWithEngineer(id));
  }, []);

  if (fetchStatus === "loading") {
    return <Loading />;
  }
  return (
    <>
      <div className="container py-4">
        <h2>My Assignments</h2>
        <div className="row mt-3">
          {assignments.map((assignment) => (
            <div key={assignment._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{assignment.engineerId.name}</h5>
                  <p className="card-text">
                    <strong>Project:</strong> {assignment.projectId.name}
                    <br />
                    <strong>Role:</strong> {assignment.role}
                    <br />
                    <strong>Percentage:</strong>{" "}
                    {assignment.allocationPercentage} %
                    <br />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyAssignments;
