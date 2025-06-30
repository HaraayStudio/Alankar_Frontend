// src/App.jsx
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import { DataProvider, DataContext } from "./context/DataContext";
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Projects from './pages/Dashboard/Projects.jsx';
import AddProject from './pages/Projects/AddProject.jsx';
import OngoingProjects from './pages/Projects/OngoingProjects.jsx';
import ProjectHistory from './pages/Projects/ProjectHistory.jsx';
import AddClient from './pages/Clients/AddClient.jsx';
import AllClients from './pages/Clients/AllClients.jsx';
import Billing from './pages/Clients/Billing.jsx';
import Account from './pages/Account/Account.jsx';
import Employee from './pages/Employee/Employee.jsx';
import MainLayout from "./pages/Mainlayout.jsx";
// ✅ PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const { authToken } = useContext(DataContext);
  return authToken ? children : <Navigate to="/login" replace />;
};
const AppRoutes = () => {
  const { authToken } = useContext(DataContext);
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />
      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/new" element={<AddProject />} />
        <Route path="projects/ongoing" element={<OngoingProjects />} />
        <Route path="projects/history" element={<ProjectHistory />} />
        <Route path="clients/new" element={<AddClient />} />
        <Route path="clients/list" element={<AllClients />} />
        <Route path="clients/billing" element={<Billing />} />
        <Route path="account" element={<Account />} />
        <Route path="employee" element={<Employee />} />
      </Route>
      {/* Fallback Route */}
      <Route
        path="*"
        element={<Navigate to={authToken ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
};
// ✅ App entry point
const App = () => {
  return (
    <DataProvider>
      <Router>
        <AppRoutes />
      </Router>
    </DataProvider>
  );
};
export default App;