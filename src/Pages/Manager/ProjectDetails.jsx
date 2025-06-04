import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProjectById } from "../../features/projectSlice";
import moment from "moment";
import Loading from "../../Component/Loading";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { projectById, fetchByIdStatus } = useSelector(
    (state) => state.projectState
  );

  useEffect(() => {
    dispatch(fetchProjectById(projectId));
  }, [dispatch, projectId]);

  if (!projectById) return <div className="text-center mt-5">Loading...</div>;

  const {
    name,
    description,
    startDate,
    endDate,
    requiredSkills,
    teamSize,
    status: projectStatus,
  } = projectById;

  if (fetchByIdStatus === "loading") {
    return <Loading />;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0 rounded">
        <div className="card-body">
          <h3 className="card-title text-primary">{name}</h3>
          <p className="card-text text-muted">{description}</p>

          <div className="mb-2">
            <strong>Start Date:</strong>{" "}
            {moment(startDate).format("MMMM D, YYYY")}
          </div>
          <div className="mb-2">
            <strong>End Date:</strong> {moment(endDate).format("MMMM D, YYYY")}
          </div>
          <div className="mb-2">
            <strong>Team Size:</strong> {teamSize}
          </div>
          <div className="mb-3">
            <strong>Status:</strong>{" "}
            <span
              className={`badge ${
                projectStatus === "active" ? "bg-success" : "bg-secondary"
              }`}
            >
              {projectStatus}
            </span>
          </div>

          <div>
            <strong>Required Skills:</strong>
            <div className="mt-2 d-flex flex-wrap gap-2">
              {requiredSkills?.map((skill) => (
                <span key={skill} className="badge bg-info text-dark">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
