import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//import Dash from './Dashboard';

// Manager Components
import Table from "./ManagerComponent/table";
import Deli from "./ManagerComponent/DeliveryPersonD";
import ManagerSignUp from "./ManagerComponent/ManagerSignUp";
import ManagerSignin from "./ManagerComponent/ManagerSignin";
import DeliveryDetails from "./ManagerComponent/managerdetails";
import ManagerUpdateItem from "./ManagerComponent/UpdateMnaneger";

//pack
import Order from "./packing/Order";
import AddMaterials from "./packing/AddMaterials";
import Materials from "./packing/Materials";

//product
import AddProduct from "./Product/AddProduct";
import AdminView from "./Product/AdminView";
import Dashboard from "./Product/Dashboard";

import AdminProfile from "./Payment/Admin_profile";

import Complaint from "./complaint/ManageFaqComplain";

import Return from "./return/manageReturn";

import AdminOrdPage from "./order/AdminPgae";

import AdminRegister from "./Common/AdminRegister";
import AdminLogin from "./Common/AdminLogin";
import UserTable from "./Common/UserTable"; // User details page

function App() {
  return (
    <Router>
      <Routes>
        {/* Home and Product Routes <Route path='/' element={<Dash />} />*/}

        {/* Manager & Routes */}
        <Route path="/table" element={<Table />} />
        <Route path="/delper" element={<Deli />} />
        <Route path="/managerSignup" element={<ManagerSignUp />} />
        <Route path="/manager/login" element={<ManagerSignin />} />
        <Route path="/mdet" element={<DeliveryDetails />} />
        <Route path="/mdet/:id" element={<ManagerUpdateItem />} />

        {/* Package Routes */}

        <Route path="/packorder" element={<Order />} />
        <Route path="/addMaterials" element={<AddMaterials />} />
        <Route path="/materials" element={<Materials />} />

        {/* products Routes */}
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/adminproduct" element={<AdminView />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/admin-profile" element={<AdminProfile />} />

        <Route path="/complaint" element={<Complaint />} />
        <Route path="/returnpro" element={<Return />} />

        <Route path="/order" element={<AdminOrdPage />} />

        <Route path="/" element={<Navigate to="/admin-login" />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-details" element={<UserTable />} />

        {/* 404 Route */}
        <Route path="*" element={<h2>404: Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
