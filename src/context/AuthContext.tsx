import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useAxios, { baseURL } from "../utils/useAsios";
import { User } from "../utils/types";
import Cookies from "js-cookie";
import SigninDialog from "@components/SigninDialog/SigninDialog";

interface AuthData {
  user: User;
  access_token: string;
}
interface IAuthContext {
  user: User | null;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
  authData: AuthData | null;
  setAuthData?: React.Dispatch<React.SetStateAction<AuthData | null>>;
  registerUser?: (
    username: any,
    email: any,
    password: any,
    password2: any
  ) => Promise<void>;
  loginUser?: (username: any, password: any) => Promise<void>;
  logoutUser?: () => void;
  toggleModal?: () => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  authData: null,
});

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const axios = useAxios();
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
      setShowModal(!showModal);
    };

  const [authData, setAuthData] = useState<AuthData | null>(() =>
    Cookies.get("authorization")
      ? JSON.parse(Cookies.get("authorization"))
      : null
  );

  const [user, setUser] = useState<User | null>(() =>
    Cookies.get("authorization")
      ? jwtDecode(JSON.parse(Cookies.get("authorization")).access_token)
      : null
  );
  const [loading, setLoading] = useState(true);

  const [theme, setTheme] = useState<string>(() =>
    localStorage.getItem("theme")
      ? JSON.parse(localStorage.getItem("theme")!)
      : "light"
  );

  const navigate = useNavigate();



  const loginUser = async (email: string, password: string) => {
    const response = await axios.post(`login/`, {
      email,
      password,
    });
    const data = await response.data;
    if (response.status === 200) {
      setAuthData(data);
      setUser(jwtDecode(data.access_token));
      Cookies.set("authorization", JSON.stringify(data));
      navigate("/");
    }
  };

  const registerUser = async (
    username: string,
    email: string,
    password: string,
    password2: string
  ) => {
    const response = await axios.post(`register/`, {
      email,
      username,
      password,
      password2,
    });
    if (response.status === 201) {
      navigate("/login");
    }
  };

  const logoutUser = () => {
    setAuthData(null);
    setUser(null);
    navigate("/");
  };

  const contextData = {
    user,
    setUser,
    authData,
    setAuthData,
    registerUser,
    loginUser,
    logoutUser,
    toggleModal
 
  };



  useEffect(() => {
    if (authData) {
    }
    setLoading(false);
  }, [authData, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
      {showModal && <SigninDialog toggleModal={toggleModal} />}
    </AuthContext.Provider>
  );
};
