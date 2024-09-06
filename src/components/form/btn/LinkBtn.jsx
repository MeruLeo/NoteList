import { Link } from "react-router-dom";
import "./LinkBtn.css";

const LinkBtn = ({ title, icon, clickEvent }) => {
  return (
    <button onClick={clickEvent} className="button my-4">
      {title}
      <span className="mr-3">{icon}</span>
    </button>
  );
};

export default LinkBtn;
