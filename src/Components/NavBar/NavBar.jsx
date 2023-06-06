/* eslint-disable no-unused-vars */
import "./NavBar.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom/dist";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { isLogged, handleLogout } = useContext(AuthContext);
  console.log(isLogged);
  return (
    <>
      <header>
        <div className="container">
          <div className="nav_bar">
            <div
              className="nav_logo"
              onClick={() => {
                navigate("/");
              }}
            ></div>
            <ul className="nav_center_li">
              <NavLink to="/">
                <li>ACCEUIL</li>
              </NavLink>
              {isLogged ? (
                <NavLink to="/mes-cours">
                  <li>MES COURS</li>
                </NavLink>
              ) : (
                <NavLink to="/chercher-un-cours">
                  <li>CHERCHER UN COURS</li>
                </NavLink>
              )}
              <NavLink to="/a-propos">
              <li>A PROPOS</li>
              </NavLink>
            </ul>
            <div className="nav_logs">
              {isLogged ? (
                <button className="con_btn" onClick={handleLogout}>
                  DECONNEXION
                </button>
              ) : (
                <>
                  {" "}
                  <button
                    className="insc_btn"
                    onClick={() => {
                      navigate("/choose_user_type");
                    }}
                  >
                    INSCRIPTION
                  </button>
                  <button
                    className="con_btn"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    CONNEXION
                  </button>
                </>
              )}
            </div>
            <div className="berger">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default NavBar;
