import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEngineer } from "../../features/engineerSlice";
import ManagerDashboard from "./ManagerDashboard";
import { fetchAssignment } from "../../features/assignmentSlice";
import Loading from "../../Component/Loading";

const TeamOverview = () => {
  const [skillFilter, setSkillFilter] = useState("All");

  const dispatch = useDispatch();

  const { engineers, fetchEngineerStatus } = useSelector(
    (state) => state.engineerState
  );

  const { assignments, createStatus, fetchStatus } = useSelector(
    (state) => state.assignmentState
  );

  const uniqueSkills = [
    ...new Set(
      engineers
        ?.map(({ skills }) => {
          return skills;
        })
        .flat(1)
    ),
  ];

  useEffect(() => {
    dispatch(fetchEngineer());
    dispatch(fetchAssignment());
  }, []);

  const handleSkillFilter = (e) => {
    console.log(e.target.value);
    setSkillFilter(e.target.value);
  };

  const filteredEngineer =
    skillFilter === "All"
      ? engineers
      : engineers.filter(({ skills }) => skills.includes(skillFilter));

  if (fetchEngineerStatus === "loading" || fetchStatus === "loading") {
    return <Loading />;
  }
  return (
    <div className="container py-4">
      <h2 className="mb-4">Team Overview</h2>

      <div className="mb-3">
        <label htmlFor="skillFilter" className="form-label fw-bold me-2">
          Filter by Skills
        </label>
        <select
          id="skillFilter"
          className="form-select form-select-sm w-auto d-inline-block"
          onChange={handleSkillFilter}
        >
          <option value="All">All</option>
          {uniqueSkills?.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
      </div>

      <div className="row">
        {filteredEngineer.map((eng) => (
          <div key={eng._id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{eng.name}</h5>
                <p className="card-text">
                  <strong>Department:</strong> {eng.department}
                  <br />
                  <strong>Seniority:</strong> {eng.seniority}
                  <br />
                  <strong>Skills:</strong>{" "}
                  {eng.skills.map((skill) => {
                    return <span key={skill}> {skill} ,</span>;
                  })}
                  <br />
                  <strong>Max Capacity:</strong> {eng.maxCapacity}%<br />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamOverview;
