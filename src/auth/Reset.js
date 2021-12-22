/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import Layout from '../layouts/Layout'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Reset = ({ match }) => {
    const [values, setValues] = useState({
        user: null, // what is this for?
        token: '', // props.match from react router dom
        password: '',
        confirmPassword: '',
        buttonText: 'Reset password'
    })

    const { buttonText, user, token, password, confirmPassword } = values;

    useEffect(() => {
        let token = match.params.token;
        let user = jwt.decode(token);
        if (token) {
            setValues({ ...values, user, token })
        }
    }, [])


    const handleChange = (name) => ((event) => {
        setValues({ ...values, [name]: event.target.value })
    })

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, [buttonText]: 'Submitting' })
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: { password, confirmPassword, resetPasswordLink: token }
        }).then(response => {

            toast.success(response.data.message);
            setValues({ ...values, [buttonText]: 'Done' })

        }).catch(error => {
            console.log('forgot password error', error.response.data);

            error.response.data.errors.forEach((error) => {
                toast.error(error.message)
            })

            setValues({ ...values, [buttonText]: 'Reset password' })
        })

    }

    const passwordResetForm = () => (
        <form>
            <div className="row">
                <div className="form-group col-xs-12 col-sm-6">
                    <label className="text-muted">Password*</label>
                    <input type="text" className="form-control" onChange={handleChange('password')} value={password} />
                </div>
                <div className="form-group col-xs-12 col-sm-6">
                    <label className="text-muted">Confirm Password*</label>
                    <input type="text" className="form-control" onChange={handleChange('confirmPassword')} value={confirmPassword} />
                </div>
                <div className="col-sm-3">
                    <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
                </div>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="p-5 text-center">Hey, {user ? user.firstname + " " + user.surname : ""}, please enter your new password</h1>
                {passwordResetForm()}
            </div>
        </Layout>
    )
};

export default Reset;