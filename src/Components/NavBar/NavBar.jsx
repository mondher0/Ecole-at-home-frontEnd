/* eslint-disable no-unused-vars */
import "./NavBar.css";
import { Outlet, useNavigate } from "react-router-dom/dist";
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
              <li>ACCEUIL</li>
              {isLogged ? <li>MES COURS</li> : <li>CHERCHER UN COURS</li>}
              <li>A PROPOS</li>
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
