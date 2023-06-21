/* eslint-disable no-unused-vars */
import "./NavBar.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom/dist";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const { isLogged, handleLogout } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(false);
  let L = useLocation();
  useEffect(() => {
    if (isMobile) {
      document.getElementById("mobile_links01").style.top = "60px";
    } else {
      document.getElementById("mobile_links01").style.top = "-150px";
    }
  }, [isMobile]);
  useEffect(() => {
    setIsMobile(false);
  }, [L]);

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
            <div
              className="berger"
              onClick={() => {
                setIsMobile(!isMobile);
              }}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div id="mobile_links01">
              <ul className="container">
                <li>
                  <NavLink to={"/"}>ACCEUIL</NavLink>
                </li>
                {isLogged ? (
                  <li>
                    <NavLink to={"/mes-cours"}>MES COURS</NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink to={"/chercher-un-cours"}>
                      CHERCHER UN COURS
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink to={"/a-propos"}>A PROPOS</NavLink>
                </li>
                <li>
                  {isLogged ? (
                    <button
                      style={{
                        backgroundColor: "#f5f5f5",
                        color: "#0078D4",
                        border: "1px solid #0078D4",
                        borderRadius: "15px",
                      }}
                      onClick={handleLogout}
                    >
                      DECONNEXION
                    </button>
                  ) : (
                    <button
                      style={{
                        backgroundColor: "#f5f5f5",
                        color: "#0078D4",
                        border: "1px solid #0078D4",
                        borderRadius: "15px",
                      }}
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      CONNEXION
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default NavBar;
