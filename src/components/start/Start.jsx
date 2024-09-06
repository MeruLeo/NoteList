import LinkBtn from "../form/btn/LinkBtn";
import Input from "../form/input/Input";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../db/firebase.js";

const Start = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => doc.data());
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      console.log("Users:", users);
    }
  }, [users]);

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleChangeUserPassword = (e) => {
    setPassword(e.target.value);
  };

  const listenerlogin = () => {
    const existingUser = users.find(
      (user) => user.user_name === userName && user.password === password,
    );
    if (existingUser) {
      console.log(`ورود موفق ${userName}`);
    } else {
      console.log(`خطا ${userName}`);
    }
  };

  return (
    <div className="backdrop-blur-xl border-1 border-org-dark z-50 p-8 rounded-[3rem] flex sm:flex-row flex-col items-center justify-center top-[50%] left-[50%] translate-x-[-50%] absolute translate-y-[-50%]">
      <section className="block sm:hidden">
        <img
          src="src/assets/imgs/play_Note.png"
          alt=""
          className="w-32 h-32 my-10"
        />
      </section>
      <section>
        <h1 className="text-org-color text-4xl text-center font-bold mb-5">
          نوت لیست
        </h1>
        <Input
          type={`text`}
          placeholder={`نام کاربری`}
          icon={
            <i className="fi fi-tr-circle-user flex items-center justify-center"></i>
          }
          change={handleChangeUserName}
          value={userName}
        />
        <Input
          type={`password`}
          placeholder={`رمز عبور`}
          icon={
            <i className="fi fi-ts-key flex items-center justify-center"></i>
          }
          change={handleChangeUserPassword}
          value={password}
        />
        <div>
          <h2 className="text-org-light text-2xl mt-4">ورود به عنوان</h2>
          <LinkBtn
            clickEvent={listenerlogin}
            title={`شنونده`}
            icon={
              <i className="fi fi-tr-earbuds flex justify-center items-center"></i>
            }
          />
          <LinkBtn
            clickEvent={() => console.log(`Creator: ${userName}`)}
            title={`ایجاد کننده`}
            icon={
              <i className="fi fi-tr-play-circle flex justify-center items-center"></i>
            }
          />
        </div>
      </section>
      <section className="hidden sm:block">
        <img
          src="src/assets/imgs/full.png"
          alt="note_list logo"
          className="scale-95"
        />
      </section>
    </div>
  );
};

export default Start;
