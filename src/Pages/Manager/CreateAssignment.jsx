import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  assignmentCreate,
  deleteAssignment,
  fetchAssignment,
} from "../../features/assignmentSlice";
import Loading from "../../Component/Loading";

const CreateAssignment = () => {
  const dispatch = useDispatch();

  const { assignments, createStatus, fetchStatus, deleteStatus } = useSelector(
    (state) => state.assignmentState
  );

  const [formData, setFormData] = useState({
    engineerId: "",
    projectId: "",
    allocationPercentage: "",
    startDate: "",
    endDate: "",
    role: "Developer",
  });

  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);

  // Fetch engineers and projects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [engineerRes, projectRes] = await Promise.all([
          axios.get("https://erms-be.vercel.app/api/engineers", {
            headers: { Authorization: token },
          }),
          axios.get("https://erms-be.vercel.app/api/projects", {
            headers: { Authorization: token },
          }),
        ]);
        setEngineers(engineerRes.data);
        setProjects(projectRes.data);
      } catch (err) {
        console.error("Error fetching engineers or projects:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (createStatus === "success") {
      setFormData({
        engineerId: "",
        projectId: "",
        allocationPercentage: "",
        startDate: "",
        endDate: "",
        role: "Developer",
      });
    }
  }, [createStatus]);

  useEffect(() => {
    dispatch(fetchAssignment());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "allocationPercentage" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(assignmentCreate(formData));
    } catch (err) {
      console.error("Error creating assignment:", err);
      alert("Error creating assignment");
    }
  };

  const handleDelete = (assignmentId) => {
    dispatch(deleteAssignment(assignmentId));
  };

  return (
    <div className="container mt-4">
      <h2>Assignment</h2>

      {fetchStatus === "loading" ? (
        <Loading />
      ) : (
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
                  <button
                    disabled={deleteStatus === "loading"}
                    className="btn btn-danger"
                    onClick={() => handleDelete(assignment._id)}
                  >
                    {deleteStatus === "loading" ? "Please Wait..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2>Create Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Engineer</label>
          <select
            name="engineerId"
            className="form-control"
            value={formData.engineerId}
            onChange={handleChange}
            required
          >
            <option value="">Select Engineer</option>
            {engineers.map((eng) => (
              <option key={eng._id} value={eng._id}>
                {eng.name} - ({eng.department})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Project</label>
          <select
            name="projectId"
            className="form-control"
            value={formData.projectId}
            onChange={handleChange}
            required
          >
            <option value="">Select Project</option>
            {projects.map((proj) => (
              <option key={proj._id} value={proj._id}>
                {proj.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Allocation Percentage (%)</label>
          <input
            type="number"
            name="allocationPercentage"
            className="form-control"
            value={formData.allocationPercentage}
            onChange={handleChange}
            required
            min={0}
            max={100}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            className="form-control"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="endDate"
            className="form-control"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <input
            type="text"
            name="role"
            className="form-control"
            value={formData.role}
            onChange={handleChange}
          />
        </div>

        <button
          disabled={createStatus === "loading"}
          className="btn btn-primary"
        >
          {createStatus === "loading" ? "Please Wait..." : "Create Assignment"}
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
