import { useState } from "react";
import PopupInput from "./PopupInput";
import Notification from "../notifcation/Notifcation";
import "./PopUp.css";

const Popup = ({
  title,
  btnTitle,
  onClose,
  submitData,
  inputChange,
  value,
  icon,
  placeholder,
}) => {
  const [notification, setNotification] = useState(null);

  return (
    <>
      <div
        className={`backdrop-blur-2xl load border-1 border-light-dark w-fit rounded-[2rem] z-50 p-4 `}
      >
        <header className="flex relative justify-between items-center">
          <button
            className="absolute -left-[.3rem] text-org-color text-[10px] -top-[.3rem] w-8 h-8 bg-org-dark rounded-full"
            onClick={onClose}
          >
            <i className="fi fi-rr-cross flex justify-center items-center"></i>
          </button>
          <h4 className="flex-grow text-center text-org-color text-xl font-bold">
            {title}
          </h4>
        </header>
        <main>
          <PopupInput
            type={`text`}
            placeholder={placeholder}
            icon={icon}
            value={value}
            onChange={inputChange}
          />
          <button
            className="w-full transition-all duration-200 hover:scale-95 bg-org-color p-2 rounded-full"
            onClick={submitData}
          >
            {btnTitle}
          </button>
        </main>
      </div>
      {notification && (
        <Notification
          content={notification.content}
          icon={notification.icon}
          iconColor={notification.iconColor}
          title={notification.title}
        />
      )}
    </>
  );
};

export default Popup;
