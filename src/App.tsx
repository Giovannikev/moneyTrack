import "./App.css";
import SignupPage from "./pages/auth/signUp/page";
import SignInPage from "./pages/auth/signIn/page";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route
          path="/dashboard"
          element={<>Bienvenue dans votre dashboard</>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
