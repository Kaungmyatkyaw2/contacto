import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"

import { LayoutProvider } from "./components/layout";
import { Login, Signup, Home, VerifyEmail, CreateContact } from "./pages";
import "./index.css";
import HeadProvider from "./context/provider/HeadProvider";
import Protect from "./components/auth/Protect";


const routes = createBrowserRouter([
  {
    path: "/",

    children: [
      {
        path: "",
        element: (
          <LayoutProvider>
            <Protect>
              <Home />
            </Protect>
          </LayoutProvider>
        ),
      },
      {
        path: "create",
        element: (
          <LayoutProvider>
            <CreateContact />
          </LayoutProvider>
        ),
      }]
  },
  {
    path: "/login",
    element: <Protect>
      <Login />
    </Protect>
    ,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/verifyEmail",
    element: <VerifyEmail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HeadProvider>
    <RouterProvider router={routes} />
    <Toaster />
  </HeadProvider>);
