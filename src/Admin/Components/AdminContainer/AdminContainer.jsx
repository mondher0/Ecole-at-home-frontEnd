/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import AdminTopBar from "./AdminTopBar";
import "./AdminContainer.css";
import { Outlet } from "react-router-dom";

const AdminContainer = (props) => {
  let [mobile, setMobile] = useState(false);
  return (
    <div className="admin_container">
      <AdminSideBar mobile={mobile} />
      <div className="page_layout">
        <AdminTopBar mobile={mobile} setMobile={setMobile} />
        <div className="page_content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminContainer;
