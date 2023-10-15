import { AuthContext } from "@/context/provider/AuthContextProvider";
import axiosClient from "@/lib/axiosClient";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protect = ({ children }: React.HTMLProps<HTMLDivElement>) => {
  const { state: auth, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const getMe = async () => {
    try {
      const response = await axiosClient().get("/users/me");
      dispatch({ type: "setUser", user: response.data.data.data });
    } catch (error) {
      dispatch({ type: "setUser", user: undefined });
    }
  };

  useEffect(() => {
    if (!auth?.user?._id) {
      getMe();
    }
  }, [auth?.token]);

  useEffect(() => {
    if (!auth?.user?._id || !auth?.token) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [auth]);

  return <>{children}</>;
};

export default Protect;
