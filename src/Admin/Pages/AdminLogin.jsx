/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import "../Css/AdminLogin.css"
import { BiShow } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container admin_login">
        <div className='logo_section'>
            <img src='../assets/au_logo.svg' />
        </div>
        <fieldset className='admin_fieldset'>
            <div className='input_container2'>
                <label>Adresse email</label>
                <input/>
            </div>
            <div className='input_container2'>
                <label>Mot de passe</label>
                <div className="password-input">
                  <input type={showPassword ? "text" : "password"}/>
                  <button type="button" className='aye_btn' onClick={togglePasswordVisibility}>
                    {showPassword ? <BiHide/> : <BiShow/>}
                  </button>
                </div>
            </div>   
            <h5 className='note'>Mot de passe oublié ?</h5>    
            <button>Connexion</button>     
        </fieldset>
    </div>
  )
}

export default AdminLogin;
