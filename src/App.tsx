import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { PrivateRoute } from "./components/auth/privateRoute";
import { ROUTES } from "./constants/routes";

const SignupPage = React.lazy(() => import("./pages/auth/signUp/page"));
const SignInPage = React.lazy(() => import("./pages/auth/signIn/page"));
const ResetPasswordPage = React.lazy(
  () => import("./pages/auth/resetPassword/page")
);
const DashboardPage = React.lazy(() => import("./pages/dashboard/page"));
import { SectionCards } from "./components/dashboard/section-cards";
import { Loader } from "lucide-react";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center" aria-busy>
              <Loader className="size-8 animate-spin text-muted-foreground" />
            </div>
          }
        >
          <Routes>
            <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.SIGNIN} replace />} />
            <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
            <Route path={ROUTES.SIGNIN} element={<SignInPage />} />
            <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
            <Route
              path={ROUTES.DASHBOARD}
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
