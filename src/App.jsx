import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "./components/start/Start";
import Register from "./components/start/Register";
import Profile from "./components/profile/Profile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
