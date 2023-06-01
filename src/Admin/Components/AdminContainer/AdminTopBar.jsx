/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import "./AdminTopBar.css";

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
        <img src="../assets/admin_search_icon.svg" />
      </div>
      <ul className="links">
        <li>
          <img src="../assets/admin_bell_icon.svg" />
        </li>
        <li>
          <img src="../assets/admin_profile_icon.svg" />
          <span className="username">Test Username</span>
        </li>
      </ul>
    </div>
  );
};

export default AdminTopBar;
