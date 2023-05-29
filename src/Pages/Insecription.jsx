/* eslint-disable no-unused-vars */
import React from "react";
import StudentAndParent from "../Components/StudentAndParentRegister/StudentAndParent";
import TeacherRegister from "../Components/TeacherRegister/TeacherRegister";
import { useParams } from "react-router-dom";

const Insecription = () => {
  const { userType } = useParams();
  return userType === "Teacher" ? (
    <TeacherRegister />
  ) : (
    <StudentAndParent type={userType} />
  );
};

export default Insecription;
