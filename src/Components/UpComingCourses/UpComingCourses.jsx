/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import CourseCard from "../CourseCard/CourseCard";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axiosInstance from "../../utils/utils";

const UpComingCourses = () => {
  const { userInfo } = useContext(GlobalContext);
  const { role } = userInfo;
  const baseURl = "http://localhost:9999/api";
  const [upComingCoursesTeacher, setUpComingCoursesTeacher] = useState([]);

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

  useEffect(() => {
    if (role === "teacher") {
      getUpComingCoursesForTeacher();
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
          <CourseCard />
          <div>Student</div>
        </div>
      ) : role === "teacher" ? (
        <div className="courses_cards">
          {upComingCoursesTeacher.map((course) => {
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
