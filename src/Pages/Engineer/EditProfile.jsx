import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { updateUser } from "../../features/userSlice"; // Uncomment when update thunk is ready
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../features/userSlice";

const EditProfile = () => {
  const { user, updateStatus } = useSelector((state) => state.userState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    department: user.department || "",
    seniority: user.seniority || "",
    maxCapacity: user.maxCapacity || "",
    skills: user.skills?.join(", ") || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      id: user._id,
    };
    dispatch(updateUser(updatedData));
  };

  useEffect(() => {
    if (updateStatus === "success") {
      navigate("/profile");
    }
  }, [updateStatus]);

  return (
    <div className="container py-5">
      <div className="card p-4 shadow">
        <h2 className="mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Department</label>
            <input
              type="text"
              name="department"
              className="form-control"
              value={formData.department}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Seniority</label>
            <select
              name="seniority"
              className="form-select"
              value={formData.seniority}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Max Capacity (%)</label>
            <input
              type="number"
              name="maxCapacity"
              className="form-control"
              value={formData.maxCapacity}
              onChange={handleChange}
              min="0"
              max="100"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              className="form-control"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <button
            disabled={updateStatus === "loading"}
            className="btn btn-primary"
            type="submit"
          >
            {updateStatus === "loading" ? "Please Wait" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
