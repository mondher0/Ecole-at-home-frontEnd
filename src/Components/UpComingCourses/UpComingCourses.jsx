/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import CourseCard from "../CourseCard/CourseCard";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axiosInstance from "../../utils/utils";
import { baseURl } from "../../utils/utils";

const UpComingCourses = () => {
  const { userInfo } = useContext(GlobalContext);
  console.log(userInfo);
  const { role } = userInfo;
  const [upComingCoursesTeacher, setUpComingCoursesTeacher] = useState([]);
  const [upComingCoursesStudent, setUpComingCoursesStudent] = useState([]);
  const [upComingCoursesEnfant, setUpComingCoursesEnfant] = useState([]);
  const [enfants, setEnfants] = useState();
  const [enfant, setEnfant] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Get upComing Courses of the teacher
  const getUpComingCoursesForTeacher = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/cours/professeurs/cours-avenir`
      );
      console.log(response);
      const upComingCourses = await response.data;
      console.log(upComingCourses);

      setUpComingCoursesTeacher(upComingCourses);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  // Get upComing Courses of the student
  const getUpComingCoursesForStudent = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/cours/students/cours-avenir`
      );
      console.log(response);
      setUpComingCoursesStudent(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  // get enfants of the parent
  const getEnfants = async () => {
    try {
      const response = await axiosInstance.get(`${baseURl}/enfant`);
      console.log(response);
      setEnfants(response.data.enfants);
    } catch (error) {
      console.log(error);
    }
  };

  // get cours avenir of an enfant
  const getUpComingCoursesForEnfant = async (id) => {
    try {
      const response = await axiosInstance.get(
        `${baseURl}/cours/parents/cours-avenir?enfantId=${id}`
      );
      console.log(response);
      setUpComingCoursesEnfant(response.data);
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
    if (role === "parent") {
      getEnfants();
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "3rem",
            color: "black",
          }}
        >
          Loading...
        </h1>
      ) : (
        <div className="up_coming_courses">
          <h3 className="green_title">Cours à venir de la semaine</h3>
          {role === "parent" ? (
            <div className="select_child">
              <label>Enfant:</label>
              <select
                onChange={(e) => {
                  setEnfant(e.target.value);
                  getUpComingCoursesForEnfant(e.target.value);
                }}
              >
                <option>Séléctioner</option>
                {enfants?.map((enfant) => {
                  return (
                    <option key={enfant.id} value={enfant.id}>
                      {enfant.nom} {enfant.prenom}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : role === "student" ? (
            <div className="courses_cards">
              {upComingCoursesStudent.map((course) => {
                console.log(course);
                return (
                  <CourseCard key={course.id} course={course} etat="venir" />
                );
              })}
            </div>
          ) : role === "teacher" ? (
            <div className="courses_cards">
              {upComingCoursesTeacher.map((course) => {
                console.log(course);
                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    etat="venir"
                    rol="teacher"
                  />
                );
              })}
            </div>
          ) : null}
          <div className="courses_cards">
            {role === "parent" &&
              upComingCoursesEnfant?.map((course) => {
                console.log("hello");
                return (
                  <CourseCard key={course.id} course={course} etat="venir" />
                );
              })}
          </div>
        </div>
      )}
      {isError && (
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            fontSize: "3rem",
            color: "black",
          }}
        >
          Something went wrong -_-
        </h1>
      )}
    </>
  );
};

export default UpComingCourses;
