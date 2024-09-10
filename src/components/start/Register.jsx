import LinkBtn from "../form/btn/LinkBtn";
import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import db from "../../db/firebase.js";
import * as Yup from "yup";
import FormComp from "../form/form.jsx";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../notifcation/Notifcation.jsx";
import Cookies from "js-cookie";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState(null);

  const navigate = useNavigate();

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

  const listenerRegister = async (values) => {
    const existingUser = users.find(
      (user) => user.user_name === values.user_name,
    );
    if (existingUser) {
      setNotification({
        icon: "xmark",
        title: "ناموفق",
        content: "نام کاربری تکراری است",
        iconColor: "text-red-600",
      });
      setTimeout(() => {
        setNotification(null);
      }, 4000);
    } else {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          user_name: values.user_name,
          password: values.password,
          email: values.email,
        });

        Cookies.set("user_id", docRef.id, { expires: 7 });

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
      } catch {
        setNotification({
          icon: "xmark",
          title: "ناموفق",
          content: "ثبت نام با مشکل مواجه شد",
          iconColor: "text-red-600",
        });
        setTimeout(() => {
          setNotification(null);
        }, 4000);
      }
    }
  };

  const inputs = [
    {
      name: "email",
      type: "email",
      placeholder: "ایمیل",
      icon: (
        <i className="fi fi-tr-circle-envelope flex items-center justify-center"></i>
      ),
      initialValue: "",
      value: userName,
      change: (e) => setUserName(e.target.value),
      validation: Yup.string()
        .email("ایمیل نامعتبر است")
        .required("ایمیل اجباری است"),
    },
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
        .required("نام کاربری اجباری است"),
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
        .required("رمزعبور اجباری است"),
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
            ثبت نام
          </h1>
          <FormComp
            inputs={inputs}
            onSubmit={listenerRegister}
            btn={
              <LinkBtn
                title={`ثبت نام`}
                icon={
                  <i className="fi fi-tr-person-circle-plus flex items-center justify-center"></i>
                }
              />
            }
          />
          <i className="fi fi-tr-earbuds text-center text-org-color text-4xl my-5 justify-center items-center w-full flex"></i>
          <Link
            to={`/`}
            className="bg-org-color w-full flex justify-center items-center transition-all duration-200 hover:scale-95 p-4 rounded-xl border-1 border-org-dark"
          >
            حساب کاربری دارید ؟ وارد شوید
            <i className="fi fi-ts-arrow-left-to-arc flex justify-center items-center mr-4 text-xl"></i>
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
    </>
  );
};

export default Register;
