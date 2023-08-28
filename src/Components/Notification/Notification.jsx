/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import NotificationCard from "../NotificationCard/NotificationCard";
import { GlobalContext } from "../../context/GlobalContext";
import axiosInstance, { baseURl } from "../../utils/utils";
import "../../css/loader.css";

const Notification = () => {
  const { userInfo } = useContext(GlobalContext);
  console.log(userInfo);
  const { role } = userInfo;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpy, setIsEmpy] = useState(false);
  const [notifications, setnotifications] = useState("");

  // get notifications of the teacher
  const getNotificationsForTeacher = async () => {
    try {
      setIsEmpy(false);
      setIsError(false);
      setIsLoading(true);
      const response = await axiosInstance.get(`${baseURl}/notification/prof`);
      console.log(response);
      setnotifications(response?.data);
      if (response?.data?.length === 0) {
        setIsEmpy(true);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  // get notifications of the student or parent
  const getNotificationsForStudentOrParent = async () => {
    try {
      setIsEmpy(false);
      setIsError(false);
      setIsLoading(true);
      const response = await axiosInstance.get(`${baseURl}/notification/user`);
      console.log(response);
      setnotifications(response?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    if (role === "teacher") {
      getNotificationsForTeacher();
    } else {
      getNotificationsForStudentOrParent();
    }
  }, []);
  return (
    <div className="notification_page">
      <h3 className="main_title">Mes nouvelles</h3>
      {
        // if there is no notifications
        isEmpy && (
          <div className="empty_container">
            <h3
              style={{
                textAlign: "center",
                fontSize: "1.5rem",
              }}
            >
              Vous n{"'"}avez pas de nouvelles
            </h3>
          </div>
        )
      }
      {
        // if there is an error
        isError && (
          <div className="empty_container">
            <h3
              style={{
                textAlign: "center",
                fontSize: "1.5rem",
              }}
            >
              Une erreur est survenue
            </h3>
          </div>
        )
      }
      {isLoading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="notification_container">
          {notifications &&
            notifications?.map((notification) => (
              <NotificationCard
                notification={notification}
                key={notification.id}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Notification;
