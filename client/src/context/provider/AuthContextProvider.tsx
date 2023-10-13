import { createContext, useReducer } from 'react'

interface stateType {
  token: undefined | string
}

interface authContextType {
  state: stateType | null;
  dispatch: React.DispatchWithoutAction | React.Dispatch<{ type: any; token?: string | undefined; }> | any
}

export const AuthContext = createContext<authContextType>({
  state: null,
  dispatch: null
});

const reducer = (state: stateType, action: { type: any, token?: string }) => {

  switch (action.type) {
    case "setToken":
      localStorage.setItem("jwt_token", action.token || "")
      state = { ...state, token: action.token };
      return state;
      break;

    default:
      return state;
  }

}

const initialState = {
  token: localStorage.getItem("jwt_token") || undefined
}

const AuthContextProvider = ({ children }: React.HTMLProps<HTMLDivElement>) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider