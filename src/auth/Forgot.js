import React, { useState } from 'react'
import Layout from '../core/Layout'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Forgot = ({ history }) => {
    const [values, setValues] = useState({
        password: 'alymkarimg@gmail.com',
        buttonText: 'Request link'
    })

    const { email, buttonText } = values;

    const handleChange = (name) => ((event) => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value })
    })

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, [buttonText]: 'Submitting' })
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/forgot-password`,
            data: values
        }).then(response => {

            toast.success(`You have been emailed a link to reset your password`);
            setValues({ ...values, [buttonText]: 'Requested' })

        }).catch(error => {
            console.log('forgot password error', error.response.data);

            error.response.data.errors.forEach((error) => {
                toast.error(error.message)
            })

            setValues({ ...values, [buttonText]: 'Request link' })
        })

    }

    const passwordForgotForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email*</label>
                <input type="text" className="form-control" onChange={handleChange('email')} value={email} />
            </div>
            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
            </div>
        </form>
    );

    return (<Layout>
        <div className="col-md-6 offset-md-3">
            <ToastContainer />
            <h1 className="p-5 text-center">Forgot Password</h1>
            {passwordForgotForm()}
        </div>
    </Layout>
    )
};

export default Forgot;