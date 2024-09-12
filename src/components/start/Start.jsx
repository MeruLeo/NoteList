import LinkBtn from "../form/btn/LinkBtn";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../db/firebase.js";
import * as Yup from "yup";
import FormComp from "../form/form.jsx";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../notifcation/Notifcation.jsx";
import Cookies from "js-cookie";
import { RotatingLines } from "react-loader-spinner";

const Start = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = Cookies.get("user_id");
    if (userId) {
      navigate("/profile");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch {
        setNotification({
          icon: "xmark",
          title: "خطا",
          content: "خطا در اتصال",
          iconColor: "text-red-600",
        });
        setTimeout(() => {
          setNotification(null);
        }, 4000);
      }
    };

    fetchUsers();
  }, []);

  const listenerlogin = async (values) => {
    setIsLoading(true);
    try {
      const existingUser = users.find(
        (user) =>
          user.user_name === values.user_name &&
          user.password === values.password,
      );

      if (existingUser) {
        await Cookies.set("user_id", existingUser.id, { expires: 7 });

        setNotification({
          icon: "check",
          title: "موفق",
          content: "ورود شما موفقیت آمیز بود",
          iconColor: "text-green-600",
        });
        setTimeout(() => {
          setNotification(null);
          navigate("/profile");
        }, 4000);
      } else {
        setNotification({
          icon: "xmark",
          title: "ناموفق",
          content: "رمز عبور یا نام کاربری اشتباه است",
          iconColor: "text-red-600",
        });
        setTimeout(() => {
          setNotification(null);
        }, 4000);
      }
    } catch {
      setNotification({
        icon: "xmark",
        title: "خطا",
        content: "مشکلی در ورود رخ داد، لطفا دوباره تلاش کنید",
        iconColor: "text-red-600",
      });

      setTimeout(() => {
        setNotification(null);
      }, 4000);
    } finally {
      setIsLoading(false);
    }
  };

  const inputs = [
    {
      name: "user_name",
      type: "text",
      placeholder: "نام کاربری",
      icon: (
        <i className="fi fi-tr-id-card-clip-alt flex items-center justify-center"></i>
      ),
      initialValue: "",
      value: userName,
      change: (e) => setUserName(e.target.value),
      validation: Yup.string()
        .min(2, "لطفا حداقل دو حرف وارد کنید")
        .required("این فیلد اجباری است"),
    },
    {
      name: "password",
      type: "password",
      placeholder: "رمز عبور",
      icon: <i className="fi fi-ts-key flex items-center justify-center"></i>,
      initialValue: "",
      value: password,
      change: (e) => setPassword(e.target.value),
      validation: Yup.string()
        .min(8, "لطفا حداقل هشت حرف وارد کنید")
        .required("این فیلد اجباری است"),
    },
  ];

  return (
    <>
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
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
            ورود
          </h1>
          <FormComp
            inputs={inputs}
            onSubmit={listenerlogin}
            btn={
              <LinkBtn
                title={`ورود`}
                icon={
                  <i className="fi fi-ts-arrow-left-to-arc flex items-center justify-center"></i>
                }
              />
            }
          />
          <i className="fi fi-tr-earbuds text-center text-org-color text-4xl my-5 justify-center items-center w-full flex"></i>
          <Link
            to={`/register`}
            className="bg-org-color w-full flex justify-center items-center transition-all duration-200 hover:scale-95 p-4 rounded-xl border-1 border-org-dark"
          >
            حساب کاربری جدید بسازید
            <i className="fi fi-tr-person-circle-plus flex justify-center items-center mr-4 text-xl"></i>
          </Link>
        </section>
        <section className="hidden sm:block">
          <img
            src="src/assets/imgs/full.png"
            alt="note_list logo"
            className="scale-95"
          />
        </section>
      </div>
      {notification && (
        <Notification
          content={notification.content}
          icon={notification.icon}
          iconColor={notification.iconColor}
          title={notification.title}
        />
      )}
      {isLoading && (
        <div className="fixed z-50 backdrop-blur-2xl p-4 rounded-full flex top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <RotatingLines
            visible={true}
            height="30"
            width="30"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            strokeColor="#b6b6b6"
            wrapperClass=""
          />
        </div>
      )}
    </>
  );
};

export default Start;
