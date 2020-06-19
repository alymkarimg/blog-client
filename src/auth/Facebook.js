import React, { useContext } from 'react';
import { authenticate, isAuth } from './Helpers';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { GlobalContext } from '../contexts/GlobalContext'

const Facebook = (props) => {

    const { globalValues, updateLoggedIn } = useContext(GlobalContext);
    const { loggedIn } = globalValues;

    const responseFacebook = (response) => {
        console.log(response)
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/facebook-login`,
            data: { accessToken: response.accessToken, userID: response.userID }
        }).then(response => {

            // save the response (user, token) in localstorage/cookie
            authenticate(response, async () => {
                updateLoggedIn();
                isAuth() && isAuth().category.title == "admin" ? props.history.push('/admin/home') : props.history.push('/profile')
            })

        }).catch(error => {
            console.log(error)
            error.response.data.errors.forEach((error) => {
                toast.error(error.message)
            })

        })
    }

    return (
        <div className="pb-3">
            <FacebookLogin
                appId={`${process.env.REACT_APP_FACEBOOK_CLIENT_ID}`}
                autoLoad={false}
                callback={responseFacebook}
                render={renderProps => (
                    <button className="btn btn-primary btn-large btn-block" 
                    onClick={renderProps.onClick} 
                    >Login with Facebook</button>
                )}
            />
        </div>
    )
}

export default Facebook