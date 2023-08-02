/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import "./AdminSideBar.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  adminBoard,
  bag,
  twoUsers,
  email,
  chart,
  cours,
  coins,
  avis,
  historique,
  settings,
  logout,
  logo,
} from "../../../assets/index";

const AdminSideBar = ({ mobile }) => {
  const { handleAdminLogout } = useContext(AuthContext);
  return (
    <div className={mobile ? "admin_side_bar active" : "admin_side_bar"}>
      <img className="side_bar_logo" src={logo} />

      <ul className="links">
        <NavLink to="/admin/board">
          <li>
            <img className="side_bar_logo" src={adminBoard} />
            Tableau de bord
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <NavLink to="/admin/professeurs">
          <li>
            <img className="side_bar_logo" src={bag} />
            Profeseurs
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <NavLink to="/admin/eleve-parent">
          <li>
            <img className="side_bar_logo" src={twoUsers} />
            Elève/Parent
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <NavLink to="/admin/Emails">
          <li>
            <img className="side_bar_logo" src={email} />
            Emails
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <NavLink to="/admin/abonnements">
          <li>
            <img className="side_bar_logo" src={chart} />
            Abonnements
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <NavLink to="/admin/cours">
          <li>
            <img className="side_bar_logo" src={cours} />
            Cours
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <NavLink to="/admin/Paiment">
          <li>
            <img className="side_bar_logo" src={coins} />
            Paiment
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <NavLink to="/admin/avis">
          <li>
            <img className="side_bar_logo" src={avis} />
            Avis
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <NavLink to="/admin/historique">
          <li>
            <img className="side_bar_logo" src={historique} />
            Historique
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <NavLink to="/admin/parametres">
          <li>
            <img className="side_bar_logo" src={settings} />
            Paramètres
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <li
          className="logout_btn"
          onClick={() => {
            handleAdminLogout();
          }}
        >
          <img className="side_bar_logo" src={logout} />
          Se deconnecter
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;
