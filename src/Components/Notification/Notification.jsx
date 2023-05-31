/* eslint-disable no-unused-vars */
import React from "react";
import NotificationCard from "../NotificationCard/NotificationCard";

const Notification = () => {
  return (
    <div className="notification_page">
      <h3 className="main_title">Mes nouvelles</h3>
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
    </div>
  );
};

export default Notification;
