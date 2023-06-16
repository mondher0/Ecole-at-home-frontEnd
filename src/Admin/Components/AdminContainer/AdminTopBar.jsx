/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import "./AdminTopBar.css";
import {
  adminBellIcon,
  adminProfileIcon,
  adminSearchIcon,
} from "../../../assets/index";

const AdminTopBar = (props) => {
  return (
    <div className="admin_top_bar">
      <div
        className={props.mobile ? "side_bar_berger active" : "side_bar_berger"}
        onClick={() => {
          props.setMobile(!props.mobile);
        }}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="admin_search_bar">
        <input type="text" placeholder="Chercher" />
        <img src={adminSearchIcon} />
      </div>
      <ul className="links">
        <li>
          <img src={adminBellIcon} />
        </li>
        <li>
          <img src={adminProfileIcon} />
          <span className="username">Test Username</span>
        </li>
      </ul>
    </div>
  );
};

export default AdminTopBar;
