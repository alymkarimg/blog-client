import React, { Fragment, useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Layout from '../core/layouts/Layout';
import { updateUserCookie, isAuth, getCookie, signout } from '../helpers/Default'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import EditableArea from '../core/components/EditableArea';
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'

const CreateMessenger = ({ history }) => {
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

    const MessengerDefault = () => (
        <div className="messenger">
            <EditableArea pathname="/messenger" guid="sidebar_messenger" fade={true}></EditableArea>
            <div className="messengerBody">
                <Sidebar />
                <Chat />
            </div>
        </div>
    );

    return (
        <Layout>
            {MessengerDefault()}
        </Layout>
    )
};
export default CreateMessenger;