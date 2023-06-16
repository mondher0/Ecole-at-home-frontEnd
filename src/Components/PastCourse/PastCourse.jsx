/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import CourseCard from "../CourseCard/CourseCard";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axiosInstance from "../../utils/utils";
import { baseURl } from "../../utils/utils";

const PastCourse = () => {
  const { userInfo } = useContext(GlobalContext);
  console.log(userInfo);
  const { role } = userInfo;
  const [pastCoursesTeacher, setPastCoursesTeacher] = useState([]);
  const [pastCoursesStudent, setPastCoursesStudent] = useState([]);

  // get past courses of the teacher
  const getPastCoursesForTeacher = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseURl}/cours/professeurs/cours-passe`
      );
      const pastCourses = await response.data;
      console.log(pastCourses);
      setPastCoursesTeacher(pastCourses);
    } catch (error) {
      console.log(error);
    }
  };

  // Get past Courses of the student
  const getPastCoursesForStudent = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseURl}/cours/students/cours-avenir`
      );
      const pastCourses = await response.data;
      console.log(pastCourses);
      setPastCoursesStudent(pastCourses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (role === "teacher") {
      getPastCoursesForTeacher();
    }
    if (role === "student") {
      getPastCoursesForStudent();
    }
  }, []);
  return (
    <div className="up_coming_courses">
      <h3 className="green_title">Cours à venir de la semaine</h3>
      {role === "parent" ? (
        <div className="select_child">
          <label>Enfant:</label>
          <select>
            <option>Séléctioner</option>
          </select>
        </div>
      ) : role === "student" ? (
        <div className="courses_cards">
          {pastCoursesStudent.map((course) => {
            console.log(course);
            return <CourseCard key={course.id} course={course} />;
          })}
          <div>Student</div>
        </div>
      ) : role === "teacher" ? (
        <div className="courses_cards">
          {pastCoursesTeacher.map((course) => {
            console.log(course);
            return <CourseCard key={course.id} course={course} etat="passe" />;
          })}
          <div>teacher</div>
        </div>
      ) : null}

      <div className="courses_cards"></div>
    </div>
  );
};

export default PastCourse;
