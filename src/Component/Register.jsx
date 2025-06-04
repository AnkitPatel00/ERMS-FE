import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../Component/Header";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../features/userSlice";

function Register() {
  const { regsiterStatus } = useSelector((state) => state.userState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (regsiterStatus === "success") {
      navigate("/login");
    }
  }, [regsiterStatus]);

  const formInitialState = {
    name: "",
    email: "",
    password: "",
    role: "engineer",
    skills: "",
    seniority: "junior",
    maxCapacity: 100,
    department: "",
  };

  const [formData, setFormData] = useState(formInitialState);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== ""),
    };
    dispatch(userRegister(formattedData));
  };

  const isEngineer = formData.role === "engineer";

  return (
    <>
      <Header />
      <div className="container vh-100 d-flex justify-content-center align-items-start mt-5">
        <div className="row w-100 justify-content-center">
          <div className="col-md-5">
            <form onSubmit={handleSubmit}>
              <h3 className="mb-4">Register</h3>

              {/* core fields */}
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                value={formData.name}
                name="name"
                type="text"
                className="form-control mb-3"
                placeholder="Name"
                id="name"
                onChange={handleForm}
                required
              />

              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                value={formData.email}
                name="email"
                type="email"
                className="form-control mb-3"
                placeholder="email@domain.com"
                id="email"
                onChange={handleForm}
                required
              />

              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                value={formData.password}
                name="password"
                type="password"
                className="form-control mb-3"
                id="password"
                onChange={handleForm}
                required
              />

              {/* role select */}
              <label className="form-label" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="form-select mb-3"
                value={formData.role}
                onChange={handleForm}
              >
                <option value="engineer">Engineer</option>
                <option value="manager">Manager</option>
              </select>

              {/* engineer-only inputs */}
              {isEngineer && (
                <>
                  <label className="form-label" htmlFor="skills">
                    Skills (comma-separated)
                  </label>
                  <input
                    value={formData.skills}
                    name="skills"
                    type="text"
                    className="form-control mb-3"
                    placeholder="React, Node.js, MongoDB"
                    id="skills"
                    onChange={handleForm}
                  />

                  <label className="form-label" htmlFor="seniority">
                    Seniority
                  </label>
                  <select
                    id="seniority"
                    name="seniority"
                    className="form-select mb-3"
                    value={formData.seniority}
                    onChange={handleForm}
                  >
                    <option value="junior">Junior</option>
                    <option value="mid">Mid</option>
                    <option value="senior">Senior</option>
                  </select>

                  <label className="form-label" htmlFor="maxCapacity">
                    Max Capacity (%)
                  </label>
                  <input
                    value={formData.maxCapacity}
                    name="maxCapacity"
                    type="number"
                    min="0"
                    max="100"
                    className="form-control mb-3"
                    id="maxCapacity"
                    onChange={handleForm}
                  />

                  <label className="form-label" htmlFor="department">
                    Department
                  </label>
                  <input
                    value={formData.department}
                    name="department"
                    type="text"
                    className="form-control mb-3"
                    id="department"
                    onChange={handleForm}
                  />
                </>
              )}
              <button
                disabled={regsiterStatus === "loading"}
                className="btn btn-primary me-3"
              >
                {regsiterStatus === "loading" ? "Please Wait..." : "Register"}
              </button>
              <NavLink className="btn btn-secondary" to="/login">
                Login
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
