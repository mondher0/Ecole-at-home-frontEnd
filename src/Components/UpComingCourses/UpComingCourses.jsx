/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import CourseCard from "../CourseCard/CourseCard";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axiosInstance from "../../utils/utils";

const UpComingCourses = () => {
  const { userInfo } = useContext(GlobalContext);
  console.log(userInfo);
  const { role } = userInfo;
  const baseURl = "http://localhost:9999/api";
  const [upComingCoursesTeacher, setUpComingCoursesTeacher] = useState([]);
  const [upComingCoursesStudent, setUpComingCoursesStudent] = useState([]);

  // Get upComing Courses of the teacher
  const getUpComingCoursesForTeacher = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseURl}/cours/professeurs/cours-avenir`
      );
      const upComingCourses = await response.data;
      console.log(upComingCourses);
      setUpComingCoursesTeacher(upComingCourses);
    } catch (error) {
      console.log(error);
    }
  };

  // Get upComing Courses of the student
  const getUpComingCoursesForStudent = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseURl}/cours/students/cours-avenir`
      );
      const upComingCourses = await response.data;
      console.log(upComingCourses);
      setUpComingCoursesStudent(upComingCourses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (role === "teacher") {
      getUpComingCoursesForTeacher();
    }
    if (role === "student") {
      getUpComingCoursesForStudent();
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
          {upComingCoursesStudent.map((course) => {
            console.log(course);
            return <CourseCard key={course.id} course={course} />;
          })}
          <div>Student</div>
        </div>
      ) : role === "teacher" ? (
        <div className="courses_cards">
          {upComingCoursesTeacher.map((course) => {
            console.log(course);
            return <CourseCard key={course.id} course={course} />;
          })}
          <div>teacher</div>
        </div>
      ) : null}

      <div className="courses_cards"></div>
    </div>
  );
};

export default UpComingCourses;
