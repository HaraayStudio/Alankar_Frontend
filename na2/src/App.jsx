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
import Clients from './pages/Clients/Clients.jsx';
import AddClient from './pages/Clients/AddClient.jsx';
import AllClients from './pages/Clients/AllClients.jsx';
import Account from './pages/Account/Account.jsx';
import Invoices from './pages/Account/Invoices.jsx';
import ClientPayments from './pages/Account/ClientPayments.jsx';
import QuotationList from './pages/Account/QuotationList.jsx';
import Employee from './pages/Employee/Employee.jsx';
import AddEmployee from './pages/Employee/AddEmployee.jsx';
import AllEmployee from './pages/Employee/AllEmployee.jsx';
import MainLayout from "./pages/Mainlayout.jsx";
import SalesDashboard from "./pages/Sales/SalesDashbaord.jsx";
import PreSale from "./pages/Sales/PreSale.jsx";
import PostSale from "./pages/Sales/PostSale.jsx";
import EditPrintPrices from "./pages/Prices/EditPrintPrices.jsx";
import GSTPlansBilling from "./pages/Clients/GSTPlansBilling.jsx";
import ReportsChart from "./pages/Charts/chart1.jsx";
import ClientOrdersPage from "./pages/temp/presaleList.jsx";
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
        <Route path="/price" element={<EditPrintPrices />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/new" element={<AddProject />} />
        <Route path="projects/ongoing" element={<OngoingProjects />} />
        <Route path="projects/history" element={<ProjectHistory />} />
        <Route path="clients" element={<Clients />} />
        <Route path="clients/new" element={<AddClient />} />
        <Route path="clients/list" element={<AllClients />} />
        <Route path="clients/billing" element={<GSTPlansBilling />} />
        <Route path="account" element={<Account />} />
        <Route path="account" element={<Account />} />
        <Route path="account/invoices" element={<Invoices />} />
        <Route path="account/payments" element={<ClientPayments />} />
        <Route path="account/quotation" element={<QuotationList />} />
        <Route path="employee" element={<Employee />} />
        <Route path="employee/new" element={<AddEmployee />} />
        <Route path="employee/list" element={<AllEmployee />} />
        <Route path="sales" element={<SalesDashboard />} />
        <Route path="sales/presale" element={<PreSale />} />
        <Route path="sales/postsale" element={<PostSale />} />
        <Route path="chart1" element={<ReportsChart />} />
        <Route path="temp" element={<ClientOrdersPage />} />
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