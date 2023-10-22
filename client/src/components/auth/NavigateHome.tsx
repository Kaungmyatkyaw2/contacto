import { AuthContext } from "@/context/provider/AuthContextProvider";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const NavigateHome = () => {
  const { state: auth } = useContext(AuthContext);

  return auth?.token ? <Navigate to={"/"} /> : <Outlet />;
};

export default NavigateHome;
