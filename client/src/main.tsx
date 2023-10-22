import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { LayoutProvider } from "./components/layout";
import {
  Login,
  Signup,
  Home,
  VerifyEmail,
  CreateContact,
  EditContact,
  LabelPage,
  ContactPage,
  SettingPage,
  GetVerifyEmailLink,
  ForgotPassword,
  ResetPassword,
} from "./pages";
import "./index.css";
import HeadProvider from "./context/provider/HeadProvider";
import Protect from "./components/auth/Protect";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavigateHome from "./components/auth/NavigateHome";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HeadProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LayoutProvider>
                <Protect />
              </LayoutProvider>
            }
          >
            <Route path="" element={<Home />} />
            <Route path="setting" element={<SettingPage />} />
          </Route>

          <Route path="/" element={<NavigateHome />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="resetPassword" element={<ResetPassword />} />
            <Route path="verifyEmail" element={<VerifyEmail />} />
            <Route path="getVerifyEmailLink" element={<GetVerifyEmailLink />} />
          </Route>

          <Route
            path="/contact"
            element={
              <LayoutProvider>
                <Protect />
              </LayoutProvider>
            }
          >
            <Route path=":id" element={<ContactPage />} />
            <Route path="edit/:id" element={<EditContact />} />
            <Route path="create" element={<CreateContact />} />
          </Route>

          <Route
            path="/label"
            element={
              <LayoutProvider>
                <Protect />
              </LayoutProvider>
            }
          >
            <Route path=":id" element={<LabelPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  </HeadProvider>
);
