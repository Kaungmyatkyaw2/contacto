import { AuthContext } from "@/context/provider/AuthContextProvider";
import axiosClient from "@/lib/axiosClient";
import { Loader } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protect = () => {
  const { state: auth, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!(auth?.user?._id && auth?.token);

  const getMe = async () => {
    try {
      const response = await axiosClient().get("/users/me");
      dispatch({ type: "setUser", user: response.data.data.data });
      setLoading(false);
    } catch (error) {
      dispatch({ type: "setUser", user: undefined });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth?.user?._id) {
      getMe();
    } else {
      setLoading(false);
    }
  }, [auth?.token]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 h-[100vh] w-full flex flex-col items-center justify-center z-[9999] bg-white">
        <Loader className="animate-spin" size={30} />
        <p className="text-gray-500">Aunthenticating. Please wait!</p>
      </div>
    );
  }

  return isLoggedIn ? (
    location.pathname.includes("login") ? (
      <Navigate to="/" replace />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/login" replace />
  );
};

export default Protect;
