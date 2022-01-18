/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from "react";
import { isAuth, getLocalStorage, setLocalStorage } from "../helpers/Default";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { getCookie } from "../helpers/Default";

export const GlobalContext = createContext(null);

const GlobalContextProvider = ({ children }) => {
  const [globalValues, setValues] = useState({
    theme: false,
    loggedIn: false,
  });

  const [categories, setCategories] = useState(() => getLocalStorage("categories", []));
  const [loading,setLoading]=useState(false);

  const { theme, loggedIn } = globalValues;

  const pageLoad = true;

  // add a value to the editable area state
  const updateLoggedIn = () => {
    setValues({ ...globalValues, loggedIn: !loggedIn });
  };

  // for a button in the navigation to update publish editable area state
  const updateTheme = () => {
    setValues({ ...globalValues, theme: !theme });
  };

  useEffect(() => {
    if (loggedIn) {
      toast.success(
        `Hey ${isAuth().firstname} ${isAuth().surname}, Welecome back!`
      );
      updateLoggedIn();
    }
  }, [loggedIn]);

  useEffect(() => {
    setLocalStorage("categories", categories);
  }, [categories]);

  const getAllCategories = async () => {
    const getURL = `${process.env.REACT_APP_API}/category`;

    try {
      return axios({
        method: "GET",
        url: `${getURL}`,
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
        .then((response) => {
          if (response.data.categorys) {
            setLoading(true)
            // save to local storgage
            setCategories(response.data.categorys);
            setLoading(false)
          }
        })
        .catch((error) => {
          error.response.data.errors.forEach((error) => {
            toast.error(error.message);
          });
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {
    const fetchData = async () => {
      await getAllCategories();
    };
    await fetchData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ globalValues, updateLoggedIn, updateTheme, loading, categories  }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
