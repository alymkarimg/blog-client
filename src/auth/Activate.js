import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/layouts/Layout';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const ActivateAccount = ({match}) => {
    const [values, setValues] = useState({
        firstname: '',
        token: '',
        show: true
    })

    useEffect(() => {
        let token = match.params.token;
        let user = jwt.decode(token)

        if(user){
            setValues({...values, firstname: user.firstname, token})
        }

    }, [])

    const { firstname, token, show } = values;

    const clickSubmit = (event) => {
        event.preventDefault()
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/account-activation`,
            data: {token}
        }).then(response => {
            console.log('Account activation success', response)
            setValues({...values,
                show: false
            })
            toast.success(response.data.message)
            // redirect to account
        }).catch(error => {
            console.log('Account activation error', error.response.data);
            error.response.data.errors.forEach((error) => {
                toast.error(error.message)
            })
        })

    }

    const activationLink = () => (
        <div className="text-center">
            <h1 className="p-5">Hey {firstname}, ready to activate your account?</h1>
            <button className="btn btn-success" onClick={clickSubmit}>Activate Account</button>
        </div>
    )

    return (
    <Layout>
        <ToastContainer />
        <div className="col-md-6 offset-md-3">
            {activationLink()}
        </div>
    </Layout>
    )
};

export default ActivateAccount;