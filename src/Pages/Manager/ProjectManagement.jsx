import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject, projectCreate } from "../../features/projectSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../Component/Loading";

const ProjectManagement = () => {
  const {
    user: { role, id, name },
  } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projects, fetchStatus, createStatus, createMessage, createError } =
    useSelector((state) => state.projectState);

  const initialData = {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    requiredSkills: "",
    teamSize: "",
    status: "planning",
    managerId: id,
  };

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = formData.requiredSkills
        .split(",")
        .map((s) => s.trim());
      const dataToSend = { ...formData, requiredSkills: skillsArray };
      dispatch(projectCreate(dataToSend));
    } catch (error) {
      alert("Error creating project.");
    }
  };

  useEffect(() => {
    dispatch(fetchProject());
  }, []);

  useEffect(() => {
    if (createStatus === "success") {
      setFormData(initialData);
    }
  }, [createStatus]);

  if (fetchStatus === "loading") {
    return <Loading />;
  }

  return (
    <div className="container py-4">
      <h2>Projects</h2>

      <div className="row mt-3">
        {projects.map((proj) => (
          <div key={proj._id} className="col-md-4 mb-4">
            <div
              style={{ cursor: "pointer" }}
              className="card shadow-sm h-100"
              onClick={() => navigate(`/project-details/${proj._id}`)}
            >
              <div className="card-body">
                <h5 className="card-title">{proj.name}</h5>
                <p className="card-text">
                  <strong>Status:</strong> {proj.status}
                  <br />
                  <strong>Team Size:</strong> {proj.teamSize}
                  <br />
                  <strong>Description:</strong> {proj.description}
                  <br />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Create Project</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Project Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
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

        <div className="col-md-6">
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="endDate"
            className="form-control"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">
            Required Skills (comma separated)
          </label>
          <input
            type="text"
            name="requiredSkills"
            className="form-control"
            placeholder="e.g., React, Node.js"
            value={formData.requiredSkills}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Team Size</label>
          <input
            type="number"
            name="teamSize"
            className="form-control"
            value={formData.teamSize}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Manager : {<span>{name}</span>}</label>
        </div>

        <div className="col-12">
          <button
            disabled={createStatus === "loading"}
            className="btn btn-primary"
          >
            {createStatus === "loading" ? "Please Wait" : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectManagement;
