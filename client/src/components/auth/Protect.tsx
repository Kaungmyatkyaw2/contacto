import { AuthContext } from "@/context/provider/AuthContextProvider";
import axiosClient from "@/lib/axiosClient";
import { Loader } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Protect = ({ children }: React.HTMLProps<HTMLDivElement>) => {
  const { state: auth, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!auth?.user?._id || !auth?.token) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [auth]);

  if (loading) {
    return (
      <div className="h-[100vh] w-full flex flex-col items-center justify-center">
        <Loader className="animate-spin" size={30} />
        <p className="text-gray-500">Aunthenticating. Please wait!</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default Protect;
