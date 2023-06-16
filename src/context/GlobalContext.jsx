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
      const response = await axiosInstance.get(`${baseURl}/users/me`);
      const Info = await response.data;
      console.log(Info);
      setUserInfo(Info);
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
