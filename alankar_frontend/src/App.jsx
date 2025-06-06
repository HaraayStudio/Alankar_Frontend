// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login.jsx"
// import Dashboard from "./pages/Dashboard.jsx"
import { DataProvider, DataContext } from "./context/DataContext";
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import AddProject from './pages/Projects/AddProject.jsx';
import OngoingProjects from './pages/Projects/OngoingProjects.jsx';
import ProjectHistory from './pages/Projects/ProjectHistory.jsx';
import AddClient from './pages/Clients/AddClient.jsx';
import AllClients from './pages/Clients/AllClients.jsx';
import Billing from './pages/Clients/Billing.jsx';
import Account from './pages/Account/Account.jsx';
import Employee from './pages/Employee/Employee.jsx';
import MainLayout from "./pages/Mainlayout.jsx";
const App = () => {
  return (
    <DataProvider>
      <Router>
        <AppRoutes />
      </Router>
    </DataProvider>
  );
};
// Separate component to handle routes and authentication logic
const AppRoutes = () => {
  const { user } = React.useContext(DataContext);
  return (
     <Routes>
        {/* All routes under MainLayout */}
        <Route path="/" element={<MainLayout />}>
        <Route path="/login" element={<Login />}/>
          <Route path="dashboard" element={<Dashboard />} />
          {/* Projects submenu */}
          <Route path="projects/new" element={<AddProject />} />
          <Route path="projects/ongoing" element={<OngoingProjects />} />
          <Route path="projects/history" element={<ProjectHistory />} />
          {/* Clients submenu */}
          <Route path="clients/new" element={<AddClient />} />
          <Route path="clients/list" element={<AllClients />} />
          <Route path="clients/billing" element={<Billing />} />
          <Route path="account" element={<Account />} />
          <Route path="employee" element={<Employee />} />
        </Route>
      </Routes>
  );
};
export default App;