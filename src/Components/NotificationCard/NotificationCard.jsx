/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const NotificationCard = ({ notification }) => {
  const { createdAt } = notification;
  console.log(createdAt);
  const inputDate = new Date(createdAt);
  const options = { month: "short", day: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  return (
    <div className="the_notification_card">
      <h3 className="notivication_time">{formattedDate}</h3>
      <div className="notification_text">
        <h2>{notification?.id}</h2>
        <p>{notification?.text}</p>
      </div>
    </div>
  );
};

export default NotificationCard;
