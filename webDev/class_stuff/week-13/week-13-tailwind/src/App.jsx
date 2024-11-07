import "./App.css";
import { AgePage } from "./components/agePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EmailPage } from "./components/emailPage";
import { OtpPage } from "./components/otpPage";

function App() {
  return (
    <div className="h-screen bg-blue-800">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AgePage />} />
          <Route path="email" element={<EmailPage />} />
          <Route path="otp" element={<OtpPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
