import { BrowserRouter, Route, Routes } from "react-router";

import HomePage from "./pages/homePage";
import AdminHomePage from "./pages/adminHomePage";
import AdminLoginPage from "./pages/loginpage";
import { Toaster } from "react-hot-toast"; // Import Toaster
import UploadFile from "./pages/test ";
import Signupform from "./pages/singnup";
import VerifyEmailForm from "./pages/verifyForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes path="/*">
          <Route path="/*" element={<HomePage />} />
          <Route path="/login/" element={<AdminLoginPage />} />
          <Route path="/admin/*" element={<AdminHomePage />} />
          <Route path="/test" element={<UploadFile />} />
          <Route path="/signup" element={<Signupform />} />
          <Route path="/verifyemail" element={<VerifyEmailForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
