import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  // useEffect,
} from "react";
// import { useNavigate } from "react-router-dom";
import { useLogin } from "../api/user/queries";
import { MutateOptions } from "react-query";
import { LoginRequest } from "../schema/login.schema";
import { message } from "antd";

interface AuthContextProps {
  loggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggingUser?: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(
    () => !!localStorage.getItem("bookRental")
  );

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!loggedIn) {
  //     navigate("/login");
  //   }
  // }, [loggedIn]);

  // const { mutate: loginUser, isLoading: isLoggingUser } = useLogin();

  // const login: any = (
  //   username: LoginRequest,
  //   password: MutateOptions<any, unknown, LoginRequest, unknown> | undefined
  // ) => {
  //   loginUser(
  //     { username, password },
  //     {
  //       onSuccess: () => {
  //         // const { accessToken, refreshToken } = data;
  //         localStorage.setItem(
  //           "bookRental",
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  //         );
  //         localStorage.setItem(
  //           "refreshToken",
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  //         );

  //         setLoggedIn(true);
  //         message.success(`Login Sucessfull`);
  //       },
  //       onError: () => {
  //         setLoggedIn(true);
  //         localStorage.setItem(
  //           "bookRental",
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  //         );
  //         localStorage.setItem(
  //           "refreshToken",
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  //         );
  //         // message.error(`Login Failed ${errorMsg}`);
  //       },
  //     }
  //   );
  // };

  // var islogging = null;

  // isLoggingUser ? islogging : !islogging;

  const login: any = () => {
    localStorage.setItem(
      "bookRental",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    );
    localStorage.setItem(
      "refreshToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    );

    setLoggedIn(true);
    message.success(`Login Sucessfull`);
  };

  const logout = () => {
    localStorage.removeItem("bookRental");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("refreshToken");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
