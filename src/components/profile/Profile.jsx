import { useEffect, useState } from "react";
import {
  collection,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import db from "../../db/firebase";
import Cookies from "js-cookie";
import "./Profile.css";
import Popup from "../pop_up/PopUp";
import Notification from "../notifcation/Notifcation";
import { RotatingLines } from "react-loader-spinner";
import TwoOption from "../pop_up/two_option/TwoOption";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";

const Profile = () => {
  const [user, setUser] = useState({});
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [popupState, setPopupState] = useState({ show: false, type: "" });
  const [twoOptionState, setTwoOptionState] = useState({
    show: false,
    type: "",
  });
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");

  const [openShareCard, setOpenShareCaed] = useState(false);

  const navigate = useNavigate();

  // -useEffects-
  // open user menu
  useEffect(() => {
    if (openUserMenu) {
      setIsUserMenuVisible(true);
    }
  }, [openUserMenu]);

  // open settings menu
  useEffect(() => {
    if (openSettings) {
      setIsSettingsVisible(true);
    }
  }, [openSettings]);

  // close user menu at open popup
  useEffect(() => {
    if (popupState.show) {
      setOpenUserMenu(false);
      setIsUserMenuVisible(false);
    }
  }, [popupState.show]);

  // close settings menu at open popup
  useEffect(() => {
    if (twoOptionState.show) {
      setOpenUserMenu(false);
      setIsUserMenuVisible(false);
    }
  }, [twoOptionState.show]);

  // close settings menu at open share card
  useEffect(() => {
    if (openShareCard) {
      setOpenSettings(false);
      setIsSettingsVisible(false);
    }
  }, [openShareCard]);

  // fetch main user on state {user}
  useEffect(() => {
    const fetchUser = async () => {
      const userId = Cookies.get("user_id");

      if (userId) {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          console.log("کاربر یافت نشد");
        }
      } else {
        console.log("کوکی پیدا نشد");
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (openUserMenu) {
      setTimeout(() => setOpenSettings(false), 100);
    }
  }, [openUserMenu]);

  useEffect(() => {
    if (openSettings) {
      setTimeout(() => setOpenUserMenu(false), 100);
    }
  }, [openSettings]);

  const handleUserMenuClose = () => {
    setOpenUserMenu(false);
    setTimeout(() => {
      setIsUserMenuVisible(false);
    }, 500);
  };

  const handleSettingsMenuClose = () => {
    setOpenSettings(false);
    setTimeout(() => {
      setIsSettingsVisible(false);
    }, 500);
  };

  const changeUserName = async (newName, setUser) => {
    setIsLoading(true);
    try {
      const userId = Cookies.get("user_id");

      if (userId) {
        const userDocRef = doc(db, "users", userId);

        await updateDoc(userDocRef, {
          user_name: newName,
        });

        setUser((prevUser) => ({
          ...prevUser,
          user_name: newName,
        }));

        setNotification({
          icon: "check",
          title: "موفق",
          content: "نام شما با موفقیت تغییر یافت",
          iconColor: "text-green-600",
        });
        setTimeout(() => {
          setNotification(null);
        }, 4000);
      } else {
        setNotification({
          icon: "xmark",
          title: "ناموفق",
          content: "خطا در تغییر نام",
          iconColor: "text-red-600",
        });
        setTimeout(() => {
          setNotification(null);
        }, 4000);
      }
    } catch {
      setNotification({
        icon: "xmark",
        title: "ناموفق",
        content: "خطا در تغییر نام",
        iconColor: "text-red-600",
      });
      setTimeout(() => {
        setNotification(null);
      }, 4000);
    } finally {
      setIsLoading(false);
      handlePopupClose();
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const userId = Cookies.get("user_id");
      if (userId) {
        await deleteDoc(doc(db, "users", userId));
        Cookies.remove("user_id");
        setNotification({
          icon: "check",
          title: "موفق",
          content: "حساب با موفقیت حذف شد",
          iconColor: "text-green-600",
        });
        setTimeout(() => {
          setNotification(null);
          navigate("/");
        }, 4000);
      }
    } catch (error) {
      setNotification({
        icon: "xmark",
        title: "خطا",
        content: "خطا در حذف حساب",
        iconColor: "text-red-600",
      });
      setTimeout(() => {
        setNotification(null);
      }, 4000);
    } finally {
      setIsLoading(false);
      handlePopupClose();
    }
  };

  const handleLogout = () => {
    Cookies.remove("user_id");
    navigate("/");
  };

  const changeUserEmail = async (newEmail, setUser) => {
    setIsLoading(true);
    try {
      const userId = Cookies.get("user_id");
      if (userId) {
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, { email: newEmail });
        setUser((prevUser) => ({ ...prevUser, email: newEmail }));
        setNotification({
          icon: "check",
          title: "موفق",
          content: "ایمیل با موفقیت تغییر یافت",
          iconColor: "text-green-600",
        });
        setTimeout(() => {
          setNotification(null);
        }, 4000);
      } else {
        setNotification({
          icon: "xmark",
          title: "ناموفق",
          content: "خطا در تغییر ایمیل",
          iconColor: "text-red-600",
        });
        setTimeout(() => {
          setNotification(null);
        }, 4000);
      }
    } catch {
      setNotification({
        icon: "xmark",
        title: "ناموفق",
        content: "خطا در تغییر ایمیل",
        iconColor: "text-red-600",
      });
      setTimeout(() => {
        setNotification(null);
      }, 4000);
    } finally {
      setIsLoading(false);
      handlePopupClose();
    }
  };

  const changeUserPassword = async (newPassword, setUser) => {
    setIsLoading(true);
    try {
      const userId = Cookies.get("user_id");
      if (userId) {
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, { password: newPassword });
        setUser((prevUser) => ({ ...prevUser, password: newPassword }));
        setNotification({
          icon: "check",
          title: "موفق",
          content: "رمزعبور  با موفقیت تغییر یافت",
          iconColor: "text-green-600",
        });
        setTimeout(() => {
          setNotification(null);
        }, 4000);
      } else {
        setNotification({
          icon: "xmark",
          title: "ناموفق",
          content: "خطا در تغییر رمزعبور",
          iconColor: "text-red-600",
        });
        setTimeout(() => {
          setNotification(null);
        }, 4000);
      }
    } catch {
      setNotification({
        icon: "xmark",
        title: "ناموفق",
        content: "خطا در تغییر رمزعبور",
        iconColor: "text-red-600",
      });
      setTimeout(() => {
        setNotification(null);
      }, 4000);
    } finally {
      setIsLoading(false);
    }
  };

  const userOptionMenu = [
    {
      id: 1,
      title: "تغییر نام",
      icon: <i className="fi fi-rr-edit flex justify-center items-center"></i>,
      clickEvent: () => setPopupState({ show: true, type: "editName" }),
    },
    {
      id: 2,
      title: "تغییر ایمیل",
      icon: (
        <i className="fi fi-rr-envelope flex justify-center items-center"></i>
      ),
      clickEvent: () => setPopupState({ show: true, type: "editEmail" }),
    },
    {
      id: 3,
      title: "تغییر رمزعبور",
      icon: <i className="fi fi-rr-lock flex justify-center items-center"></i>,
      clickEvent: () => setPopupState({ show: true, type: "editPassword" }),
    },
    {
      id: 4,
      title: "خروج از حساب",
      icon: <i className="fi fi-rr-leave flex justify-center items-center"></i>,
      clickEvent: () => setTwoOptionState({ show: true, type: "exitAccount" }),
    },
    {
      id: 5,
      title: "حذف حساب",
      icon: <i className="fi fi-rr-trash flex justify-center items-center"></i>,
      clickEvent: () =>
        setTwoOptionState({ show: true, type: "deleteAccount" }),
    },
  ];

  const settings = [
    {
      id: 1,
      title: "اشتراک گذاری پروفایل",
      icon: (
        <i className="fi fi-rr-share-square flex justify-center items-center"></i>
      ),
      clickEvent: () => setOpenShareCaed(true),
    },
    {
      id: 2,
      title: "تغییر پس زمینه",
      icon: (
        <i className="fi fi-rr-picture flex justify-center items-center"></i>
      ),
      clickEvent: "",
    },
  ];

  const UserOption = ({ title, icon, clickEvent }) => (
    <li>
      <button
        onClick={clickEvent}
        className="bg-org-dark transition-all duration-200 hover:scale-110 text-org-color p-2 m-1 flex justify-between items-center w-44 rounded-xl"
      >
        <span>{title}</span>
        <span>{icon}</span>
      </button>
    </li>
  );

  const Setting = ({ title, icon, clickEvent }) => (
    <li>
      <button
        onClick={clickEvent}
        className="bg-org-dark transition-all duration-200 hover:scale-110 text-org-color p-2 m-1 flex justify-between items-center w-44 rounded-xl"
      >
        <span>{title}</span>
        <span>{icon}</span>
      </button>
    </li>
  );

  const Header = ({ user_name, email, password }) => (
    <header className="flex w-full justify-evenly items-center">
      <section>
        <button
          onClick={() => {
            setOpenUserMenu(!openUserMenu);
            setOpenSettings(false);
          }}
          className={`${
            openUserMenu ? "border-light-dark" : "border-org-dark"
          } border-2 hover:border-light-dark transition-all duration-300 bg-org-dark flex items-center rounded-full`}
        >
          <span className="bg-org-color text-2xl p-2 w-10 m-0.5 h-10 rounded-full">
            <i className="fi fi-rr-user flex justify-center items-center"></i>
          </span>
          <h4 className="mx-4 text-org-light">{user_name}</h4>
        </button>

        <ul
          className={`bg-light-dark absolute shadow-2xl rounded-2xl mt-2 transition-all duration-500 ${
            openUserMenu ? "open-user__menu" : "close-user__menu"
          }`}
          style={{ display: isUserMenuVisible ? "block" : "none" }}
          onAnimationEnd={openUserMenu ? null : handleUserMenuClose}
        >
          {userOptionMenu.map((option, index) => (
            <UserOption
              key={index}
              title={option.title}
              icon={option.icon}
              clickEvent={option.clickEvent}
            />
          ))}
        </ul>
      </section>

      <section>
        <div className="bg-org-dark flex rounded-full justify-between items-center">
          <input
            type="text"
            placeholder="جستجو کنید"
            className="bg-transparent pr-2 text-org-light outline-none w-full"
          />
          <button className="bg-org-color rounded-full p-2 m-1 w-12 h-10">
            <i className="fi fi-rr-search flex items-center justify-center"></i>
          </button>
        </div>
      </section>

      <section className="flex items-center text-org-color justify-center">
        <button
          onClick={() => {
            setOpenSettings(!openSettings);
            setOpenUserMenu(false);
          }}
          className="bg-org-dark w-12 h-12 rounded-full text-xl transition-all duration-200 hover:bg-org-color hover:text-org-dark"
        >
          <i className="fi fi-rr-settings flex justify-center items-center"></i>
        </button>

        <ul
          className={`bg-light-dark absolute shadow-2xl rounded-2xl mt-52 transition-all duration-500 ${
            openSettings ? "open-user__menu" : "close-user__menu"
          }`}
          style={{ display: isSettingsVisible ? "block" : "none" }}
          onAnimationEnd={openSettings ? null : handleSettingsMenuClose}
        >
          {settings.map((setting, index) => (
            <Setting
              key={index}
              title={setting.title}
              icon={setting.icon}
              clickEvent={setting.clickEvent}
            />
          ))}
        </ul>

        <button
          onClick={() => history.back()}
          className="bg-org-dark w-12 mr-2 h-12 rounded-full text-xl transition-all duration-200 hover:bg-org-color hover:text-org-dark"
        >
          <i className="fi fi-rr-angle-small-left flex justify-center items-center"></i>
        </button>
      </section>
    </header>
  );

  const handlePopupClose = () => setPopupState({ show: false, type: "" });

  const ShareProfile = ({ userName, shareID }) => {
    const copyToClipboard = () => {
      navigator.clipboard.writeText(shareID).then(() => {
        setNotification({
          icon: "check",
          title: "موفق",
          content: "آیدی پروفایل شما با موفقیت کپی شد",
          iconColor: "text-green-600",
        });
        setTimeout(() => {
          setNotification(null);
        }, 4000);
      });
    };

    const downloadAsImage = () => {
      const element = document.getElementById("share-profile");
      html2canvas(element).then((canvas) => {
        const link = document.createElement("a");
        link.download = `profile-${userName}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    };

    return (
      <div
        className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ${
          openShareCard ? "block" : "hidden"
        }`}
      >
        <header className="flex justify-between items-center">
          <div className="bg-light-dark w-fit rounded-full p-1 mb-4 mr-4 border-1 border-org-color">
            <button
              className="bg-half-dark text-org-color p-2 rounded-full text-center transition-all duration-200 hover:bg-org-color hover:text-half-dark"
              onClick={downloadAsImage}
            >
              <i className="fi fi-rr-download text-2xl flex justify-center items-center"></i>
            </button>
            <button
              className="bg-half-dark text-org-color p-2 rounded-full mr-2 text-center transition-all duration-200 hover:bg-org-color hover:text-half-dark"
              onClick={copyToClipboard}
            >
              <i className="fi fi-rr-copy-alt text-2xl flex justify-center items-center"></i>
            </button>
          </div>
          <button
            onClick={() => setOpenShareCaed(false)}
            className="bg-red-500 text-org-dark ml-4 p-2 rounded-full mr-2 text-center transition-all duration-200 hover:scale-95"
          >
            <i className="fi fi-rr-cross flex justify-center items-center"></i>
          </button>
        </header>
        <div
          id="share-profile"
          className="bg-light-dark border-t-1 border-l-1 border-org-color p-4 rounded-[2.5rem]"
        >
          <main>
            <img
              src="src/assets/imgs/NoteList.png"
              className="w-64 h-64"
              alt="note list"
            />
            <div className="text-center">
              <div className="my-4 flex justify-center items-center">
                <img
                  src="src/assets/imgs/play_Note.png"
                  className="w-7 h-7 mt-1 ml-2"
                  alt="note list"
                />
                <h4 className="font-bold text-3xl text-org-light">
                  {userName}
                </h4>
                <img
                  src="src/assets/imgs/play_Note.png"
                  className="w-7 h-7 rotate-180 mr-2"
                  alt="note list"
                />
              </div>
              <p className="bg-org-color p-0.5 rounded-full">{shareID}</p>
            </div>
          </main>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header user_name={user.user_name} />
      <ShareProfile userName={user.user_name} shareID={user.share_page} />
      {popupState.show && (
        <Popup
          title={
            popupState.type === "editName"
              ? "تغییر نام"
              : popupState.type === "editEmail"
              ? "تغییر ایمیل"
              : "تغییر رمز عبور"
          }
          btnTitle={`تغییر`}
          icon={
            popupState.type === "editName" ? (
              <i className="fi fi-tr-id-card-clip-alt flex items-center justify-center"></i>
            ) : popupState.type === "editEmail" ? (
              <i className="fi fi-tr-circle-envelope flex items-center justify-center"></i>
            ) : (
              <i className="fi fi-ts-key flex items-center justify-center"></i>
            )
          }
          placeholder={
            popupState.type === "editName"
              ? user.user_name
              : popupState.type === "editEmail"
              ? user.email
              : "رمز عبور جدید"
          }
          inputChange={
            popupState.type === "editName"
              ? (e) => setEditName(e.target.value)
              : popupState.type === "editEmail"
              ? (e) => setEditEmail(e.target.value)
              : (e) => setEditPassword(e.target.value)
          }
          value={
            popupState.type === "editName"
              ? editName
              : popupState.type === "editEmail"
              ? editEmail
              : editPassword
          }
          submitData={
            popupState.type === "editName"
              ? () => {
                  changeUserName(editName, setUser);
                  setEditName("");
                }
              : popupState.type === "editEmail"
              ? () => {
                  changeUserEmail(editEmail, setUser);
                  setEditEmail("");
                }
              : () => {
                  changeUserPassword(editPassword, setUser);
                  setEditPassword("");
                }
          }
          onClose={() => setPopupState({ show: false, type: "" })}
        />
      )}

      {twoOptionState.show && (
        <TwoOption
          title={
            twoOptionState.type === "exitAccount" ? "خروج از حساب" : "حذف حساب"
          }
          btnTitle={twoOptionState.type === "exitAccount" ? "خروج" : "حذف"}
          cancelTitle={`لغو`}
          onClose={() => setTwoOptionState({ show: false, type: "" })}
          desc={
            twoOptionState.type === "exitAccount"
              ? "با خروج از حساب اطلاعات شما باقی می‌مانند و میتوانید دوباره وارد شوید"
              : "با حذف حساب تمام اطلاعات مربوطه پاک میشوند و امکان ورود به این حساب دیگر وجود نخواهد داشت"
          }
          cancel={() => setTwoOptionState({ show: false, type: "" })}
          submitData={
            twoOptionState.type === "exitAccount"
              ? handleLogout
              : handleDeleteAccount
          }
        />
      )}

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
    </div>
  );
};

export default Profile;
