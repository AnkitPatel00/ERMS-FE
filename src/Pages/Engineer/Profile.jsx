import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../Component/Loading";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status } = useSelector((state) => state.userState);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleEdit = () => {
    navigate("/edit-profile");
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="container py-5">
      <div className="card shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Profile Overview</h2>
          <button className="btn btn-primary" onClick={handleEdit}>
            Edit Profile
          </button>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <strong>Name:</strong> <span>{user.name}</span>
          </div>
          <div className="col-md-6 mb-3">
            <strong>Email:</strong> <span>{user.email}</span>
          </div>
          <div className="col-md-6 mb-3">
            <strong>Role:</strong> <span>{user.role}</span>
          </div>
          <div className="col-md-6 mb-3">
            <strong>Department:</strong> <span>{user.department}</span>
          </div>
          <div className="col-md-6 mb-3">
            <strong>Seniority:</strong> <span>{user.seniority}</span>
          </div>
          <div className="col-md-6 mb-3">
            <strong>Max Capacity:</strong> <span>{user.maxCapacity}%</span>
          </div>
          <div className="col-md-12 mb-3">
            <strong>Skills:</strong> <span>{user.skills?.join(", ")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
