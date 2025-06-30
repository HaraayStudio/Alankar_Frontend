import React, { useContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import AddPreSale from "./Pages/Sales/AddPreSale.jsx";
import { DataProvider, DataContext } from "./context/DataContext";

// Layout
import MainLayout from "./Layout/MainLayout.jsx";

// Pages
import Login from "./pages/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Projects from "./pages/Order/Order.jsx";
import AddProject from "./pages/Order/AddOrder.jsx";
import OngoingProjects from "./pages/Order/OngoingOrder.jsx";
import ProjectHistory from "./pages/Order/OrderHistory.jsx";
import Clients from "./pages/Clients/Clients.jsx";
import AddClient from "./pages/Clients/AddClient.jsx";
import AllClients from "./pages/Clients/AllClients.jsx";
import GSTPlansBilling from "./pages/Clients/GSTPlansBilling.jsx";
import Account from "./pages/Account/Account.jsx";
import Invoices from "./pages/Account/Invoices.jsx";
import ClientPayments from "./pages/Account/ClientPayments.jsx";
import QuotationList from "./pages/Account/QuotationList.jsx";
import Employee from "./pages/Employee/Employee.jsx";
import AddEmployee from "./pages/Employee/AddEmployee.jsx";
import AllEmployee from "./pages/Employee/AllEmployee.jsx";
import SalesDashboard from "./pages/Sales/SalesDashbaord.jsx";
import PreSale from "./pages/Sales/PreSale.jsx";
import PostSale from "./pages/Sales/PostSale.jsx";

// PrivateRoute wrapper (optional, if you want route protection)
const PrivateRoute = ({ children }) => {
  const { authToken } = useContext(DataContext);
  return authToken ? children : <Navigate to="/login" replace />;
};

// All App routes, wrapped in DataContext
const AppRoutes = () => {
  const { authToken } = useContext(DataContext);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          // <PrivateRoute>
            <MainLayout />
          // </PrivateRoute>
        }
      >
        {/* Dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Projects/Orders */}
        <Route path="projects" element={<Projects />} />
        <Route path="projects/new" element={<AddProject />} />
        <Route path="projects/ongoing" element={<OngoingProjects />} />
        <Route path="projects/history" element={<ProjectHistory />} />

        {/* Sales */}
        <Route path="sales" element={<SalesDashboard />} />
        <Route path="sales/presale" element={<PreSale />} />
        <Route path="sales/postsale" element={<PostSale />} />

        {/* Clients */}
        <Route path="clients" element={<Clients />} />
        <Route path="clients/new" element={<AddClient />} />
        <Route path="clients/list" element={<AllClients />} />
        <Route path="clients/billing" element={<GSTPlansBilling />} />

        {/* Account */}
        <Route path="account" element={<Account />} />
        <Route path="account/invoices" element={<Invoices />} />
        <Route path="account/payments" element={<ClientPayments />} />
        <Route path="account/quotation" element={<QuotationList />} />

        {/* Employee */}
        <Route path="employee" element={<Employee />} />
        <Route path="employee/new" element={<AddEmployee />} />
        <Route path="employee/list" element={<AllEmployee />} />
      </Route>
      {/* Fallback Route */}
      <Route
        path="*"
        element={<Navigate to={authToken ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
};

// Popup modal wrapper (only uses hooks inside the function)
function PopupWrapper() {
  const { addPreSalePopup, setAddPreSalePopup } = useContext(DataContext);
  return (
    <>
      {addPreSalePopup && (
        <AddPreSale onClose={() => setAddPreSalePopup(false)} />
      )}
    </>
  );
}

// Main App component
const App = () => (
  <ReduxProvider store={store}>
    <DataProvider>
      <Router>
        <PopupWrapper />
        <AppRoutes />
      </Router>
    </DataProvider>
  </ReduxProvider>
);

export default App;
