/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/utils";
import { baseURl } from "../utils/utils";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  // Get User Info
  const getUserInfo = async () => {
    try {
      console.log("getUserInfo");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <GlobalContext.Provider value={{ userInfo }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
