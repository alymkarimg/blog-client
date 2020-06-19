import React, { useState, useEffect, Fragment, useContext } from 'react';
import reactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import { isEdit, isAuth, signout } from '../auth/Helpers';
import EditableArea from './EditableArea'
import { EditableAreaContext } from '../contexts/EditableAreaContext'
import Sidebar from './Sidebar'
import Banner from './AnimatedBanner'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { Button, Drawer, makeStyles } from '@material-ui/core';
import '../assets/css/Style.css'

const Layout = function ({ children, match, history }) {

    const useStyles = makeStyles((themes) => ({
        drawerPaper: { width: 'inherit' }
    }))

    const [values, setValues] = useState({
        sidebarIsOpen: false,
        adminButtonText: ''
    })

    let { sidebarIsOpen, adminButtonText } = values

    const toggleDrawer = () => {
        setValues({ ...values, sidebarIsOpen: !sidebarIsOpen })
    }

    useEffect(() => {
        setValues({ ...values, adminButtonText: sidebarIsOpen ? "Close Menu" : "Administer Site" })
    }, [sidebarIsOpen])

    const classes = useStyles();
    const { updatePublishEditableAreas } = useContext(EditableAreaContext);

    const items = [
        { name: 'home', label: 'Home' },
        {
            name: 'billing',
            label: 'Billing',
            items: [
                { name: 'statements', label: 'Statements' },
                { name: 'reports', label: 'Reports' },
            ],
        },
        {
            name: 'settings',
            label: 'Settings',
            items: [
                { name: 'profile', label: 'Profile' },
                { name: 'insurance', label: 'Insurance' },
                {
                    name: 'notifications',
                    label: 'Notifications',
                    items: [
                        { name: 'email', label: 'Email' },
                        {
                            name: 'desktop',
                            label: 'Desktop',
                            items: [
                                { name: 'schedule', label: 'Schedule' },
                                { name: 'frequency', label: 'Frequency' },
                            ],
                        },
                        { name: 'sms', label: 'SMS' },
                    ],
                },
            ],
        },
    ]

    const isActive = (path) => {
        if (match.path === path) {
            return { color: '#000' };
        } else {
            return { color: '#fff' };
        }
    }

    const isHomepageActive = () => {
        if (match.path === '/') {
            return true;
        } else {
            return false;
        }
    }

    const isFullscreen = () => {
        if (match.path === '/signin') {
            return true;
        } else {
            return false;
        }
    }


    const nav = () => (
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item"><Link to="/" className="nav-link" style={isActive('/')}>Home </Link></li>

            {!isAuth() && (
                <Fragment>
                    <li className="nav-item"><Link to="/signup" className="nav-link" style={isActive('/signup')}>Sign up</Link></li>
                    <li className="nav-item"><Link to="/signin" className="nav-link" style={isActive('/signin')}>Sign in</Link></li>
                </Fragment>
            )}

            {/* admin dashboard */}
            {isAuth() && isAuth().category.title == 'admin' && (
                <li className="nav-item" >
                    <Link className="nav-link" to="/admin/home" style={isActive('/admin/home')} >{`Admin home`}</Link>
                </li>
            )}

            {/* profile page */}
            {isAuth() && (
                <li className="nav-item" >
                    <Link style={isActive('/profile')} to="/profile" className="nav-link">{`${isAuth().firstname} ${isAuth().surname}`}</Link>
                </li>
            )}

            {/* signout button  */}
            {isAuth() && (
                <span className="nav-link" style={{ cursor: 'pointer', color: 'white' }} onClick={() => {
                    signout(() => {
                        history.push('/')
                    })
                }}>Signout</span>
            )}

            {/* Publish */}
            {isEdit() && isAuth() && isAuth().category.title == 'admin' && (
                <span className="nav-link" style={{ cursor: 'pointer', color: 'white' }} onClick={
                    () => updatePublishEditableAreas()
                }>Publish</span>
            )}

            {/* Edit page */}
            {!isEdit() && isAuth() && isAuth().category.title == 'admin' && (
                <span className="nav-link" style={{ cursor: 'pointer', color: 'white' }} onClick={() => {
                    history.push({
                        search: '?edit=true'
                    })
                }}>Edit</span>
            )}

            {/* Open admin sidebar page */}
            {isAuth() && isAuth().category.title == 'admin' && (
                <span className="nav-link" style={{ cursor: 'pointer', color: 'white' }} onClick={toggleDrawer}>{adminButtonText}</span>
            )}

        </ul >
    )
    return (
        <div className="wrapper">
            <Drawer style={{ width: '220px' }} variant="persistent" anchor="left" open={sidebarIsOpen} classes={{ paper: classes.drawerPaper }}>
                <Sidebar items={items} />
            </Drawer>
            <div>
                <ToastContainer></ToastContainer>
                {nav()}
                <div className="">
                    {isHomepageActive() && (
                        <Banner title="mainBanner" ></Banner>
                    )}
                    {!isFullscreen() && (
                        <div style={{ marginTop: '20px', marginBottom: '20px' }} className="container">
                            {children}
                        </div>
                    )}
                    {isFullscreen() && (
                        <div style={{ margin: '20px', marginRight: "0px", marginTop: "0px" , marginBottom: "0px" }} className="">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default withRouter(Layout);