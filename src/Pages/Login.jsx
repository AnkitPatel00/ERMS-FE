import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../Component/Header";
import { useDispatch, useSelector } from "react-redux";
import { resetRegisterState, userLogin } from "../features/userSlice";

function Login() {
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.userState);

  const formIntialState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(formIntialState);

  function handleForm(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userLogin(formData));
  }

  useEffect(() => {
    dispatch(resetRegisterState());
  }, []);

  useEffect(() => {
    if (status === "success") {
      setFormData(formIntialState);
    }
  }, [status]);

  return (
    <>
      <Header />
      <div className="container vh-100 d-flex justify-content-center align-items-start mt-5">
        <div className="row w-100 justify-content-center">
          <div className="col-md-5">
            <form onSubmit={handleSubmit}>
              <h3>Login</h3>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                name="email"
                value={formData.email}
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
                name="password"
                value={formData.password}
                type="password"
                className="form-control mb-3"
                id="password"
                onChange={handleForm}
                required
              />
              <button
                disabled={status === "loading"}
                className="btn btn-primary btn me-3"
              >
                {status === "loading" ? "Please Wait..." : "Login"}
              </button>
              <NavLink className="btn btn-secondary btn" to="/register">
                Register
              </NavLink>
              {error && <p className="text-danger">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
