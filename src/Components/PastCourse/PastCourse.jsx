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
  const [pastCoursesEnfant, setPastCoursesEnfant] = useState([]);
  const [enfants, setEnfants] = useState();
  const [enfant, setEnfant] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // get past courses of the teacher
  const getPastCoursesForTeacher = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseURl}/cours/professeurs/cours-passe?page=1&pageSize=10        `
      );
      const pastCourses = await response.data.items;
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
        `${baseURl}/cours/students/cours-passe?page=1&pageSize=10        `
      );
      console.log(response);
      const pastCourses = await response.data.items;
      console.log(pastCourses);
      setPastCoursesStudent(pastCourses);
    } catch (error) {
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

  // get âst courses of an enfant
  const getPastCoursesForEnfant = async (id) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/cours/parents/cours-passe?enfantId=${id}`
      );
      console.log(response);
      setPastCoursesEnfant(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
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
                  getPastCoursesForEnfant(e.target.value);
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
              {pastCoursesStudent.map((course) => {
                console.log(course);
                return <CourseCard key={course.id} course={course} />;
              })}
            </div>
          ) : role === "teacher" ? (
            <div className="courses_cards">
              {pastCoursesTeacher.map((course) => {
                console.log(course);
                return (
                  <CourseCard key={course.id} course={course} etat="passe" />
                );
              })}
            </div>
          ) : null}

          <div className="courses_cards">
            {role === "parent" &&
              pastCoursesEnfant?.map((course) => {
                console.log("hello");
                return (
                  <CourseCard key={course.id} course={course} etat="passe" />
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

export default PastCourse;
