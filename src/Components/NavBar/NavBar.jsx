/* eslint-disable no-unused-vars */
import "./NavBar.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom/dist";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import {
  avatar,
  drop,
  logout1,
  parentPicture,
  studentPicture,
  teacherPicture,
} from "../../assets/index";

const NavBar = () => {
  const navigate = useNavigate();
  const { isLogged, handleLogout } = useContext(AuthContext);
  const { userInfo } = useContext(GlobalContext);
  console.log(userInfo);
  const { role } = userInfo;
  const [isMobile, setIsMobile] = useState(false);
  const [logoutAction, setLogoutAction] = useState(false);
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    borderRadius: "50%",
                    position: "relative",
                  }}
                >
                  {role === "teacher" ? (
                    <img
                      src={
                        userInfo?.proffesseurProfile?.imgUrl
                          ? userInfo?.proffesseurProfile?.imgUrl
                          : teacherPicture
                      }
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                    />
                  ) : role === "student" ? (
                    <img
                      src={studentPicture}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                    />
                  ) : role === "parent" ? (
                    <img
                      src={parentPicture}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                    />
                  ) : null}
                  {userInfo?.prenom}
                  <img
                    src={drop}
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      setLogoutAction(!logoutAction);
                    }}
                  />
                  {logoutAction && (
                    <div
                      onClick={handleLogout}
                      style={{
                        position: "absolute",
                        top: "50px",
                        right: "-0",
                        backgroundColor: "#fff",
                        width: "200px",
                        borderRadius: "12px",
                        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
                        padding: "20px",
                        color: "black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontWeight: "bold",
                      }}
                    >
                      <img src={logout1} />
                      SE DECONNECTER
                    </div>
                  )}
                </div>
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
