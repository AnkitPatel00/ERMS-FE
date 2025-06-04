import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./app/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Register from "./Component/Register.jsx";
import ProtectedRoute from "./Component/ProtectedRoute.jsx";
import UserProtectedRoute from "./Component/UserProtectedRoute.jsx";
import CreateAssignment from "./Pages/Manager/CreateAssignment.jsx";
import ProjectManagement from "./Pages/Manager/ProjectManagement.jsx";
import MyAssignments from "./Pages/Engineer/MyAssignments.jsx";
import Profile from "./Pages/Engineer/Profile.jsx";
import EditProfile from "./Pages/Engineer/EditProfile.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import TeamOverview from "./Pages/Manager/TeamOverview.jsx";
import ProjectDetails from "./Pages/Manager/ProjectDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/team-overview",
        element: <TeamOverview />,
      },
      {
        path: "/createassignment",
        element: <CreateAssignment />,
      },
      {
        path: "/projectmanagement",
        element: <ProjectManagement />,
      },
      {
        path: "/my-assignment",
        element: <MyAssignments />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/project-details/:projectId",
        element: <ProjectDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <UserProtectedRoute>
        <Login />
      </UserProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <UserProtectedRoute>
        <Register />
      </UserProtectedRoute>
    ),
  },
  {
    path: "*",
    element: (
      <UserProtectedRoute>
        <Login />
      </UserProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
