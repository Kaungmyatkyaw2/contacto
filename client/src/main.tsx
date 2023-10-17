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
} from "./pages";
import "./index.css";
import HeadProvider from "./context/provider/HeadProvider";
import Protect from "./components/auth/Protect";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
            <Route path="edit/:id" element={<EditContact />} />
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
          <Route path="/create" element={<CreateContact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verfiyEmail" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  </HeadProvider>
);
