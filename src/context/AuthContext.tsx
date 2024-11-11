import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useAxios, { baseURL } from "@utils/useAsios";
import { User } from "utils/types";
import Cookies from "js-cookie";
import SigninDialog from "@components/SigninDialog/SigninDialog";

// Define interfaces for AuthData (containing user and token) and IAuthContext
interface AuthData {
  user: User;
  access_token: string;
}

interface IAuthContext {
  user: User | null;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
  authData: AuthData | null;
  setAuthData?: React.Dispatch<React.SetStateAction<AuthData | null>>;
  credits: number;
  setCredits: React.Dispatch<React.SetStateAction<number>>;
  startCreditPurchase?: (plan_name: string, payment_info: string, method: string) => Promise<void>;
  registerUser?: (
    name: string,
    email: string,
    password: string,
    phone_number: string
  ) => Promise<void>;
  loginUser?: (email: string, password: string) => Promise<void>;
  logoutUser?: () => void;
  toggleModal?: () => void;
  validateEmailCode?: (email: string, code: string) => Promise<void>;
  validatePhoneCode?: (phone_number: string, code: string) => Promise<void>;
}

// Create the context with default values for easy consumption in components
const AuthContext = createContext<IAuthContext>({
  user: null,
  authData: null,
  credits: 0,
  setCredits: () => {},
});

export default AuthContext;

export const AuthProvider = ({ children }) => {
  // Initialize necessary hooks and state
  const axios = useAxios();
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false); // Manage modal visibility
  const [rememberMe, setRememberMe] = useState(false); // Track "Remember Me" preference
  const [authData, setAuthData] = useState<AuthData | null>(retrieveAuthData); // Store auth data from cookies/session
  const [user, setUser] = useState<User | null>(() => (authData ? jwtDecode(authData.access_token) : null)); // Decode user from token
  const [credits, setCredits] = useState<number>(user ? user.credits : 0); // Track user's credits
  const [loading, setLoading] = useState(true); // Loading indicator for async data retrieval
  const [emailVerified, setEmailVerified] = useState(false); // Track email verification status
  const [phoneVerified, setPhoneVerified] = useState(false); // Track phone verification status

  // Toggles modal display state
  const toggleModal = () => setShowModal(!showModal);

  // Retrieves auth data from either cookies or session storage (based on user choice)
  function retrieveAuthData() {
    const storedData = Cookies.get("authorization") || sessionStorage.getItem("authorization");
    return storedData ? JSON.parse(storedData) : null;
  }

  // Helper function to store auth data in the appropriate storage (cookies or session)
  function setAuthDataWithPersistence(data: AuthData) {
    const dataString = JSON.stringify(data);
    if (rememberMe) {
      Cookies.set("authorization", dataString);
    } else {
      sessionStorage.setItem("authorization", dataString);
    }
    setAuthData(data); // Update context state
    setUser(jwtDecode(data.access_token)); // Set user from decoded token
  }

  // Starts credit purchase process by making a POST request with phone number and amount
  const startCreditPurchase = async (plan_name: string, payment_info: string, method: string) => {
    try {
      const response = await axios.post(`${baseURL}/subscriptions/`, { "plan_name" :plan_name, "payment_info" :payment_info, "method" :method });
      console.log("Credit purchase initiated, follow mobile payment instructions", response);
    } catch (error) {
      console.error("Credit purchase error:", error);
    }
  };

  // Login function that authenticates the user, stores auth data, and navigates to the homepage
  const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, { email, password });
      if (response.status === 200) {
        setAuthDataWithPersistence(response.data); // Store auth data with selected persistence method
        navigate("/"); // Redirect to the homepage after successful login
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Registers a new user and sends verification codes to the provided email and phone number
  const registerUser = async (
    name: string,
    email: string,
    password: string,
    phone_number: string
  ) => {
    try {
      console.log("Starting registration...", { name, email, password, phone_number });
      const response = await axios.post(`/auth/register`, { name, email, password, phone_number });
      if (response.status === 201) {
        await axios.post(`send-email-code/`, { email }); // Send email verification code
        await axios.post(`send-phone-code/`, { phone_number }); // Send phone verification code
        navigate("/verify-email"); // Redirect to email verification page
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  // Verifies email using a code sent to the user's email
  const validateEmailCode = async (email: string, code: string) => {
    try {
      const response = await axios.post(`/verify-email/`, { email, code });
      if (response.status === 200) setEmailVerified(true); // Update email verification status on success
    } catch (error) {
      console.error("Email validation error:", error);
    }
  };

  // Verifies phone number using a code sent to the user's phone
  const validatePhoneCode = async (phone_number: string, code: string) => {
    try {
      const response = await axios.post(`/verify-phone/`, { phone_number, code });
      if (response.status === 200) setPhoneVerified(true); // Update phone verification status on success
    } catch (error) {
      console.error("Phone validation error:", error);
    }
  };

  // Logs out the user, clears auth data, and removes cookies/session storage
  const logoutUser = () => {
    setAuthData(null);
    setUser(null);
    Cookies.remove("authorization"); // Remove token from cookies
    sessionStorage.removeItem("authorization"); // Remove token from session storage
    navigate("/"); // Redirect to homepage after logout
  };

  // Package context data for use in consuming components
  const contextData = {
    user,
    setUser,
    authData,
    setAuthData,
    credits,
    setCredits,
    registerUser,
    loginUser,
    logoutUser,
    toggleModal,
    startCreditPurchase,
    validateEmailCode,
    validatePhoneCode,
  };

  // Effect hook to disable loading state once auth data is set
  useEffect(() => setLoading(false), [authData]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
      {showModal && <SigninDialog toggleModal={toggleModal} />}
    </AuthContext.Provider>
  );
};
