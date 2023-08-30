/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./AdminTopBar.css";
import {
  adminBellIcon,
  adminProfileIcon,
  adminSearchIcon,
} from "../../../assets/index";
import axiosInstance, { baseURl } from "../../../utils/utils";

const AdminTopBar = (props) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  // get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get(`${baseURl}/users/me`);
      console.log(response);
      setNom(response.data.nom);
      setPrenom(response.data.prenom);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
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

      <div className="admin_search_bar"></div>
      <ul className="links">
        <li>
        
        </li>
        <li>
          <img src={adminProfileIcon} />
          <span className="username">
            {nom} {prenom}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default AdminTopBar;
