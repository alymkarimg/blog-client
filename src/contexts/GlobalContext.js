import React, { createContext, Component, useEffect, useState } from 'react';
import { isEdit, getCookie, isAuth } from '../auth/Helpers'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { removeQuery } from '../auth/Helpers';

export const GlobalContext = createContext(null);

const GlobalContextProvider = (props) => {
    const [globalValues, setValues] = useState({
        theme: false,
        loggedIn: false
    })

    const { theme, loggedIn } = globalValues

    // add a value to the editable area state
    const updateLoggedIn = () => {
        setValues({ ...globalValues, loggedIn: !loggedIn })
    }

    // for a button in the navigation to update publish editable area state
    const updateTheme = () => {
        setValues({ ...globalValues, theme: !theme })
    }

    useEffect(() => {
        if (loggedIn) {
            toast.success(`Hey ${isAuth().firstname} ${isAuth().surname}, Welecome back!`);
            updateLoggedIn();
        }

    }, [loggedIn])

    return (
        <GlobalContext.Provider value={{ globalValues, updateLoggedIn, updateTheme }}>
            <ToastContainer />
            {props.children}
        </GlobalContext.Provider>
    )

}

export default GlobalContextProvider;