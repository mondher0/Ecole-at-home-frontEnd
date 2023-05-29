import "./NavBar.css";
import { Outlet, useNavigate } from "react-router-dom/dist";

const NavBar = () => {
  const  navigate = useNavigate();
  return (
    <>
      <header>
        <div className="container">
          <div className="nav_bar">
            <div className="nav_logo"></div>
            <ul className="nav_center_li">
              <li>ACCEUIL</li>
              <li>MES COURS</li>:<li>CHERCHER UN COURS</li>
              <li>A PROPOS</li>
            </ul>
            <div className="nav_logs">
              <>
                <button className="insc_btn" onClick={() => {
                  navigate('/choose_user_type');
                }}>INSCRIPTION</button>
                <button className="con_btn">CONNEXION</button>
              </>
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
