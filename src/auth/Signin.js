import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Layout from '../layouts/Layout'
import { authenticate, isAuth } from '../helpers/Default'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Google from './components/Google'
import { GlobalContext } from '../contexts/GlobalContext'
import EditableArea from '../core/components/EditableArea'
import Facebook from './components/Facebook'

const Signin = ({ history }) => {

    const { updateLoggedIn } = useContext(GlobalContext);

    const [values, setValues] = useState({
        step: 1,
        email: 'alymkarimg@gmail.com',
        password: 'password1',
        buttonText: 'Submit'
    })

    const { email, password, buttonText, step } = values;

    const nextStep = () => {
        setValues({ ...values, step: step + 1 })
    }

    const handleChange = (name) => ((event) => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value })
    })

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, [buttonText]: 'Submitting' })
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: values
        }).then(response => {
            console.log('Signin success', response)

            // save the response (user, token) in localstorage/cookie
            authenticate(response, async () => {
                setValues({
                    ...values,
                    email: '',
                    password: '',
                    buttonText: 'Submitted'
                })

                updateLoggedIn();
                isAuth() && isAuth().category.title === "admin" ? history.push('/admin/home') : history.push('/profile')

                // toast.success(`Hey ${response.data.user.firstname} ${response.data.user.surname}, Welecome back!`);
            })
        }).catch(error => {
            console.log('Signin error', error.response.data);

            error.response.data.errors.forEach((error) => {
                toast.error(error.message)
            })
        })

    }

    const signinForm = () => {
        switch (step) {
            case 1:
                return (
                    <form >
                        <div className="form-group col-xs-12">
                            <label className="text-muted">Email*</label>
                            <input type="text" className="form-control" onChange={handleChange('email')} value={email} />
                        </div>

                        <div className="form-group col-xs-12">
                            <button className="btn btn-primary" onClick={nextStep}>Next</button>
                        </div>

                        <div className="form-group col-xs-12">
                            <p> Don't have an account? <Link to='/signup' >Sign Up</Link></p>
                        </div>
                    </form>
                )
            case 2:
                return (
                    <form className="row">
                        <div className="form-group col-sm-12">
                            <label className="text-muted">Email*</label>
                            <input type="text" className="form-control" onChange={handleChange('email')} value={email} />
                        </div>
                        <div className="form-group col-sm-12">
                            <label className="text-muted">Password*</label>
                            <input type="text" className="form-control" onChange={handleChange('password')} value={password} />
                        </div>

                        <div className="form-group pt-2 col-sm-12 pb-2">
                            <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
                        </div>

                        <div className="form-group pt-2 col-sm-12 pb-2">
                            <p> Don't have an account? <Link to='/signup' >Sign Up</Link></p>
                        </div>
                    </form>
                )
            default:
                return null
        }
    };

    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <ToastContainer />
                    {isAuth() && isAuth().category.title !== "admin" ? <Redirect to="/" /> : null}
                    <h1 className="text-center">Signin</h1>
                    <Google history={history}></Google>
                    <Facebook history={history}></Facebook>
                    {signinForm()}
                    <Link to='/auth/password/forgot' className="btn btn-sm btn-outline-danger"> Forgot Password </Link>
                </div>
                <div className="d-none d-lg-block col-md-9" style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                    <EditableArea size={{ height: "100%" }} guid="EA_signin" pathname="/signin"></EditableArea>
                </div >
            </div>

        </Layout>
    )
};

export default Signin;