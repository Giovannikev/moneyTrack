import "./App.css";
import SignupPage from "./pages/auth/signUp/page";
import SignInPage from "./pages/auth/signIn/page";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { PrivateRoute } from "./components/auth/privateRoute";
import ResetPasswordPage from "./pages/auth/resetPassword/page";
import DashboardPage from "./pages/dashboard/page";
import { SectionCards } from "./components/dashboard/section-cards";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          >
            <Route index element={<SectionCards />} />
            <Route path="count" element={<div>Count Page</div>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
