/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import CourseCard from "../CourseCard/CourseCard";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axiosInstance from "../../utils/utils";
import { baseURl } from "../../utils/utils";
import AbonnementCard from "../AbonnmentCard/AbonnementCard";

const Abonnement = () => {
  const { userInfo } = useContext(GlobalContext);
  const { role } = userInfo;
  const [upComingCoursesTeacher, setUpComingCoursesTeacher] = useState([]);
  const [upComingCoursesStudent, setUpComingCoursesStudent] = useState([]);
  const [abonnmentsEnfant, setAbonnmentsEnfant] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [enfants, setEnfants] = useState();
  const [enfant, setEnfant] = useState();

  // Get abonnement of the enfant
  const getAbonnment = async (id) => {
    try {
      const response = await axiosInstance.get(
        `${baseURl}/abonnement/enfant/${id}`
      );
      console.log(response);
      setAbonnmentsEnfant(response.data.abonnements);
    } catch (error) {
      console.log(error);
    }
  };

  // Get upComing Courses of the student
  const getUpComingCoursesForStudent = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`${baseURl}/abonnement/user`);
      console.log(response);

      setUpComingCoursesStudent(response.data.abonnements);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // if (role === "teacher") {
    //   getUpComingCoursesForTeacher();
    // }
    if (role === "student") {
      getUpComingCoursesForStudent();
    }
    if (role === "parent") {
      getEnfants();
    }
  }, []);

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
          <h3 className="green_title">Abonnements actifs</h3>
          {role === "parent" ? (
            <div className="select_child">
              <label>Enfant:</label>
              <select
                onChange={(e) => {
                  setEnfant(e.target.value);
                  getAbonnment(e.target.value);
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
                  <AbonnementCard
                    key={course.id}
                    course={course}
                    etat="venir"
                  />
                );
              })}
            </div>
          ) : role === "teacher" ? (
            <div className="courses_cards">
              {upComingCoursesTeacher.map((course) => {
                console.log(course);
                return (
                  <AbonnementCard
                    key={course.id}
                    course={course}
                    etat="venir"
                  />
                );
              })}
            </div>
          ) : null}
          <div className="courses_cards">
            {role === "parent" &&
              abonnmentsEnfant?.map((course) => {
                return (
                  <AbonnementCard
                    key={course.id}
                    course={course}
                    etat="venir"
                    id={enfant}
                  />
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

export default Abonnement;
