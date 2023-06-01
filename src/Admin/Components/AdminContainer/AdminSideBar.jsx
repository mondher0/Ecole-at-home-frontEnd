/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import "./AdminSideBar.css";
import { NavLink } from "react-router-dom";
import logo from "./nav_logo.svg";

const AdminSideBar = ({ mobile }) => {
  return (
    <div className={mobile ? "admin_side_bar active" : "admin_side_bar"}>
      <img className="side_bar_logo" src={logo} />

      <ul className="links">
        <NavLink to="/admin/board">
          <li>
            <img className="side_bar_logo" src="../assets/admin_board.svg" />
            Tableau de bord
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <NavLink to="/admin/professeurs">
          <li>
            <img className="side_bar_logo" src="../assets/bag.svg" />
            Profeseurs
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <NavLink to="/admin/eleve-parent">
          <li>
            <img className="side_bar_logo" src="../assets/two_users.svg" />
            Elève/Parent
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <NavLink to="/admin/Emails">
          <li>
            <img className="side_bar_logo" src="../assets/email.svg" />
            Emails
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <NavLink to="/admin/Abonnements">
          <li>
            <img className="side_bar_logo" src="../assets/chart.svg" />
            Abonnements
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <NavLink to="/admin/Cours">
          <li>
            <img className="side_bar_logo" src="../assets/cours.svg" />
            Cours
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <NavLink to="/admin/Paiment">
          <li>
            <img className="side_bar_logo" src="../assets/coins.svg" />
            Paiment
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <NavLink to="/admin/Avis">
          <li>
            <img className="side_bar_logo" src="../assets/avis.svg" />
            Avis
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <NavLink to="/admin/Historique">
          <li>
            <img className="side_bar_logo" src="../assets/historique.svg" />
            Historique
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <NavLink to="/admin/Paramètres">
          <li>
            <img className="side_bar_logo" src="../assets/settings.svg" />
            Paramètres
            <div className="border left"></div>
            <div className="border right"></div>
          </li>
        </NavLink>
        <li className="logout_btn">
          <img className="side_bar_logo" src="../assets/logout.svg" />
          Se deconnecter
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;
