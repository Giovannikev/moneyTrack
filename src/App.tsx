import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { PrivateRoute } from "./components/auth/privateRoute";

const SignupPage = React.lazy(() => import("./pages/auth/signUp/page"));
const SignInPage = React.lazy(() => import("./pages/auth/signIn/page"));
const ResetPasswordPage = React.lazy(() => import("./pages/auth/resetPassword/page"));
const DashboardPage = React.lazy(() => import("./pages/dashboard/page"));
import { SectionCards } from "./components/dashboard/section-cards";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<div>Chargement...</div>}>
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
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
