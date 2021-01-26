import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../layouts/Layout';
import { isAuth } from '../helpers/Default'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Signup = () => {
    const [values, setValues] = useState({
        firstname: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        buttonText: 'Submit'
    })

    const { firstname, surname, username, email, password, confirmPassword, buttonText } = values;

 

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, [buttonText]: 'Submitting' })
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: values
        }).then(response => {
            console.log('Signup success', response)
            setValues({
                ...values,
                firstname: '',
                surname: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                buttonText: 'Submitted'
            })

            toast.success(response.data.message)
        }).catch(error => {
            console.log('Signup error', error.response.data);

            error.response.data.errors.forEach((error) => {
                toast.error(error.message)
            })
        })

    }

    const signupForm = () => (
        <form>
            <div className="row">
                <div className="form-group col-xs-12 col-sm-6">
                    <label className="text-muted">Firstname*</label>
                    <input type="text" className="form-control" onChange={handleChange('firstname')} value={firstname} />
                </div>
                <div className="form-group col-xs-12 col-sm-6">
                    <label className="text-muted">Surname*</label>
                    <input type="text" className="form-control" onChange={handleChange('surname')} value={surname} />
                </div>
                <div className="form-group col-xs-12 col-sm-6">
                    <label className="text-muted">Username</label>
                    <input type="text" className="form-control" onChange={handleChange('username')} value={username} />
                </div>
                <div className="form-group col-xs-12 col-sm-6">
                    <label className="text-muted">Email*</label>
                    <input type="text" className="form-control" onChange={handleChange('email')} value={email} />
                </div>
                <div className="form-group col-xs-12 col-sm-6">
                    <label className="text-muted">Password*</label>
                    <input type="text" className="form-control" onChange={handleChange('password')} value={password} />
                </div>
                <div className="form-group col-xs-12 col-sm-6">
                    <label className="text-muted">Confirm dPassword*</label>
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
            {isAuth() ? <Redirect to="/" /> : null}
            <h1 className="p-5 text-center">Signup</h1>
            {signupForm()}
        </div>
    </Layout>
    )
};

export default Signup;