import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "./components/start/Start";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
