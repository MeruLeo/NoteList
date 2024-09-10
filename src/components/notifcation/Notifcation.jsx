import React, { useState, useEffect } from "react";
import "./Notifcation.css";

const Notification = ({ icon, iconColor, title, content }) => {
  const [notificationClass, setNotificationClass] = useState("animation-notif");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setNotificationClass("hide-notifcation");
    }, 3000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <div
      className={`w-[26rem] bg-org-dark border-half-dark border-1 p-4 text-white rounded-3xl flex items-center justify-between z-50 absolute top-10 right-[1%] ${notificationClass}`}
    >
      <div>
        <h5 className="font-bold text-org-color text-xl">{title}</h5>
        <p className="max-w-64 text-org-light">{content}</p>
      </div>
      <i className={`fa-solid fa-circle-${icon} ${iconColor} text-2xl`}></i>
    </div>
  );
};

export default Notification;
