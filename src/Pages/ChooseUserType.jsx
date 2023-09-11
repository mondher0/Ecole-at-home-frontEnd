/* eslint-disable no-unused-vars */
import React from "react";
import "../css/ChooseUserType.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChooseUserType = () => {
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/inscription/${userType}`);
  };

  return (
    <div className="container">
      <fieldset className="user_type_fs">
        <legend className="sign_up_legend">Créer ton compte</legend>
        <form onSubmit={handleSubmit}>
          <div
            className={
              userType === "Student"
                ? "user_type_card selected"
                : "user_type_card"
            }
            onClick={() => {
              setUserType("Student");
              navigate(`/inscription/Student`);
            }}
          >
            <img src="./assets/student.svg" />
            Elève
          </div>

          <div
            className={
              userType === "Parent"
                ? "user_type_card selected"
                : "user_type_card"
            }
            onClick={() => {
              setUserType("Parent");
              navigate(`/inscription/Parent`);
            }}
          >
            <img src="./assets/Parent.svg" />
            Parent
          </div>

          <div
            className={
              userType === "Teacher"
                ? "user_type_card selected"
                : "user_type_card"
            }
            onClick={() => {
              setUserType("Teacher");
              navigate(`/inscription/Teacher`);
            }}
          >
            <img src="./assets/Parent.svg" />
            Enseignant
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default ChooseUserType;
