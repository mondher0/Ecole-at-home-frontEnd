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
  const [currentPage, setCurrentPage] = useState(1);
  const [isEmpy, setIsEmpy] = useState(false);

  // get past courses of the teacher
  const getPastCoursesForTeacher = async () => {
    try {
      setIsEmpy(false);
      setIsError(false);
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/cours/professeurs/cours-passe?page=${currentPage}&pageSize=3`
      );
      if (response.data.items.length === 0) {
        setIsEmpy(true);
      }
      const pastCourses = await response.data.items;
      console.log(pastCourses);
      setPastCoursesTeacher(pastCourses);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  // Get past Courses of the student
  const getPastCoursesForStudent = async () => {
    try {
      setIsEmpy(false);
      setIsError(false);
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/cours/students/cours-passe?page=${currentPage}&pageSize=3`
      );
      console.log(response);
      if (response.data.items.length === 0) {
        setIsEmpy(true);
      }
      const pastCourses = await response.data.items;
      console.log(pastCourses);
      setPastCoursesStudent(pastCourses);
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

  // get âst courses of an enfant
  const getPastCoursesForEnfant = async (id) => {
    try {
      setIsEmpy(false);
      setIsError(false);
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/cours/parents/cours-passe?enfantId=${id}`
      );
      console.log(response);
      if (response.data.length === 0) {
        setIsEmpy(true);
      }
      setPastCoursesEnfant(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  // Pagination handlers
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
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
  }, [currentPage]);
  return (
    <>
      {isLoading ? (
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
            fontSize: "2rem",
            color: "black",
          }}
        >
          Loading...
        </h1>
      ) : isEmpy ? (
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
            fontSize: "2rem",
            color: "black",
          }}
        >
          Aucun cours à afficher
        </h1>
      ) : (
        <div className="up_coming_courses">
          <h3 className="green_title">Cours passé</h3>
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
          {role === "parent" && (
            <div className="courses_cards">
              {role === "parent" &&
                pastCoursesEnfant?.map((course) => {
                  console.log("hello");
                  return (
                    <CourseCard key={course.id} course={course} etat="passe" />
                  );
                })}
            </div>
          )}
          {role !== "parent" && (
            <div
              className="table_pagination_bar"
              style={{
                margin: "0",
              }}
            >
              <div
                className="pagination_btns"
                style={{
                  gap: "10px",
                }}
              >
                <button
                  className="pagination_arrow"
                  disabled={currentPage === 1}
                  onClick={goToPreviousPage}
                >
                  <img
                    src="../assets/arrow.svg"
                    style={{
                      height: "20px",
                    }}
                  />
                </button>
                <button className="pagination_btn selected">
                  {currentPage}
                </button>
                <button
                  className="pagination_arrow right"
                  onClick={goToNextPage}
                  // disabled={pages === 0 ? 1 : Math.ceil(pages / 5)}
                >
                  <img
                    src="../assets/arrow.svg"
                    style={{
                      height: "20px",
                    }}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {isError && (
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
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
