import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Layout from './Layout';
import { updateUserCookie, isAuth, getCookie, signout } from '../auth/Helpers'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import EditableArea from './EditableArea';

// add an editable area whose pathname = blog editableAreas and guid = blog {slug}


const BlogLayout = ({ history }) => {

    let user = isAuth();
    const [values, setValues] = useState({
        firstname: '',
        surname: '',
        username: '',
        description: '',
        password: '',
        confirmPassword: '',
        role: '',
        email: '',
        buttonText: 'Submit',
        showPassword: false,
    })

    useEffect(
        () => {
            setValues({
                ...values,
                firstname: user.firstname,
                surname: user.surname,
                username: user.username,
                description: user.description,
                role: user.category.title,
                email: user.email
            })
        }, []
    )

    const { firstname, surname, username, description, password, confirmPassword, role, email, buttonText, showPassword } = values;

    const handleChange = (name) => ((event) => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value })
    })

    const changePassword = (event) => {
        event.preventDefault()
        setValues({ ...values, showPassword: !showPassword })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, buttonText: 'Submitting' })
        var data = {
            firstname,
            surname,
            username,
            description,
        }
        if (showPassword) {
            data.password = password
            data.confirmPassword = confirmPassword
        }

        if (showPassword && password === "") {
            toast.error("Please enter a new password")
            setValues({ ...values, buttonText: 'Submit' })
        } else {
            axios({
                method: 'PUT',
                url: `${process.env.REACT_APP_API}/user/${user._id}`,
                data,
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`
                }
            }).then(response => {
                // save the response (user, token) in localstorage/cookie, update the values
                updateUserCookie(response, () => {

                    user = isAuth();

                    setValues({
                        ...values,
                        firstname: user.firstname,
                        surname: user.surname,
                        username: user.username,
                        description: user.description,
                        buttonText: 'Submit'
                    })
                    if (showPassword) {
                        toast.success('You have changed your password!')
                    }
                    toast.success(`You have updated your profile information!`);
                })

                setValues({ ...values, password: '', confirmPassword: '', showPassword: false })

                toast.success(response.data.message)
            }).catch(error => {

                if (error.response.status === 401) {
                    signout(() => {
                        history.push('/')
                    })
                } else {
                    error.response.data.errors.forEach((error) => {
                        toast.error(error.message)
                    })
                }
            })
        }

    }

    const updateForm = () => (
        <div>
            <div className="row">
                <div className="form-group offset-md-4 col-md-4 text-center">
                    <label className="text-muted">{email}</label>
                </div>
                <div className="form-group offset-md-4 col-md-4 text-center">
                    <label className="text-muted">{role}</label>
                </div>
            </div>

            <form className="row">
                <div className="form-group col-xs-12 col-sm-4">
                    <label className="text-muted">Firstname*</label>
                    <input type="text" className="form-control" onChange={handleChange('firstname')} value={firstname} />
                </div>
                <div className="form-group col-xs-12 col-sm-4">
                    <label className="text-muted">Surname*</label>
                    <input type="text" className="form-control" onChange={handleChange('surname')} value={surname} />
                </div>
                <div className="form-group col-xs-12 col-sm-4">
                    <label className="text-muted">Username*</label>
                    <input type="text" className="form-control" onChange={handleChange('username')} value={username} />
                </div>

                <div className="form-group col-sm-12">
                    <label className="text-muted">Biography</label>
                    <textarea rows={5} className="form-control" onChange={handleChange('description')} value={description} />
                </div>

                <div className="form-group col-sm-3">
                    <button className="btn btn-secondary" onClick={changePassword}>{showPassword ? "Keep Password" : "Change Password"}</button>
                </div>

                {showPassword && (<div className="form-group col-xs-12 col-sm-4">
                    <input type="text" className="form-control" onChange={handleChange('password')} placeholder="Enter password" value={password} />
                </div>)}

                {showPassword && (<div className="form-group col-xs-12 col-sm-4">
                    <input type="text" className="form-control" onChange={handleChange('confirmPassword')} placeholder="Confirm password" value={confirmPassword} />
                </div>)}
            </form>
            <div className="row">
                <div className="form-group col-sm-4">
                    <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
                </div>
            </div>
        </div>
    );

    return (
        <Layout>
            <div className="col-md-8 offset-md-2">
                {updateForm()}
            </div>
        </Layout>
    )
};
export default BlogLayout;