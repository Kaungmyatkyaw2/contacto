import { UserType } from "@/types/user.types";
import { createContext, useReducer } from "react";

interface stateType {
  token: undefined | string;
  user: UserType | null;
}

interface authContextType {
  state: stateType | null;
  dispatch:
    | React.Dispatch<{ type: any; token?: string | undefined; user?: UserType }>
    | any;
}

export const AuthContext = createContext<authContextType>({
  state: null,
  dispatch: null,
});

const reducer = (
  state: stateType,
  action: { type: any; token?: string; user?: UserType }
) => {
  switch (action.type) {
    case "setToken":
      localStorage.setItem("jwt_token", action.token || "");
      state = { ...state, token: action.token };
      return state;
      break;

    case "setUser":
      state = { ...state, user: action.user || null };
      return state;
      break;

    case "loginError":
      localStorage.removeItem("jwt_token");
      state = { ...state, user: null, token: undefined };
      return state;
      break;

    case "logOut":
      localStorage.removeItem("jwt_token");
      state = { ...state, token: undefined, user: null };
      return state;
      break;

    default:
      return state;
  }
};

const initialState = {
  token: localStorage.getItem("jwt_token") || undefined,
  user: null,
};

const AuthContextProvider = ({ children }: React.HTMLProps<HTMLDivElement>) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
