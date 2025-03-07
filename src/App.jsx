import { BrowserRouter, Route, Routes } from "react-router";

import HomePage from "./pages/homePage";
import AdminHomePage from "./pages/adminHomePage";
import AdminLoginPage from "./pages/loginpage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes path="/*">
          <Route path="/" element={<HomePage />} />
          <Route path="/login/" element={<AdminLoginPage />} />
          <Route path="/admin/*" element={<AdminHomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
