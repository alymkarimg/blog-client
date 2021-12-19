import React, { useContext } from 'react';
import { authenticate, isAuth } from '../../helpers/Default';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { GlobalContext } from '../../contexts/GlobalContext'

const Google = (props) => {

    const { updateLoggedIn } = useContext(GlobalContext);

    const responseGoogle = (response) => {
        console.log(response)
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/google-login`,
            data: { idToken: response.tokenId }
        }).then(response => {

            // save the response (user, token) in localstorage/cookie
            authenticate(response, async () => {
                updateLoggedIn();
                isAuth() && isAuth().category.title === "admin" ? props.history.push('/admin/home') : props.history.push('/profile')
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
            <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                render={renderProps => (
                    <button className="btn btn-danger btn-large btn-block" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with Google</button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Google