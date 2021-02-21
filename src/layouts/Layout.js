import React, { useState, useEffect, Fragment, useContext } from 'react';
import reactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import { isEdit, isAuth, signout } from '../helpers/Default';
import EditableArea from '../core/components/EditableArea'
import { EditableAreaContext } from '../contexts/EditableAreaContext'
import Sidebar from '../core/components/Sidebar'
import Banner from '../core/components/AnimatedBanner'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.min.css'
import { Drawer, makeStyles } from '@material-ui/core';
import '../assets/css/Style.css'
import { isHomepageActive, isActive, isFullscreen, isMessengerActive } from '../helpers/Default'
import { Navbar, Nav, NavDropdown, Line, Form, FormControl, Button } from 'react-bootstrap'
import { Switch, FormGroup, FormControlLabel } from '@material-ui/core';

const Layout = function ({ children, match, history }) {

    const useStyles = makeStyles((themes) => ({
        drawerPaper: { width: 'inherit' },
        input: { color: "white" }
    }))

    const [values, setValues] = useState({
        sidebarIsOpen: false,
        adminButtonText: 'Close Menu',
        HomepageActive: false,
        editSwitchText: "edit",
        checked: false
    })

    let { sidebarIsOpen, adminButtonText, HomepageActive, checked } = values

    const toggleDrawer = () => {
        setValues({ ...values, sidebarIsOpen: !sidebarIsOpen })
    }

    const toggleEditMode = () => {

    }

    useEffect(() => {
        setValues({ ...values, adminButtonText: sidebarIsOpen ? "Close Menu" : "Administer Site" })
    }, [])

    useEffect(() => {
        setValues({ ...values, HomepageActive: isHomepageActive(match) })
    }, [match])

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


    const nav = () => {
        return (
            <React.Fragment>
                <Navbar style={{ zIndex: "20" }} bg={HomepageActive ? "transparent" : "dark"} expand="md">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Brand><Link to="/" className="nav-link" style={isActive('/', match)}>Home</Link></Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* Blogs button  */}
                        <Nav.Link className="nav-item" >
                            <Link className="nav-link" to="/blogs" style={isActive('/blogs', match)} >{`Blog`}</Link>
                        </Nav.Link>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                        <Nav className="mr-0">
                            {!isAuth() && (
                                <Fragment>
                                    <Nav.Link className="nav-item"><Link to="/signup" className="nav-link" style={isActive('/signup', match)}>Sign up</Link></Nav.Link>
                                    <Nav.Link className="nav-item"><Link to="/signin" className="nav-link" style={isActive('/signin', match)}>Sign in</Link></Nav.Link>
                                </Fragment>
                            )}

                            {/* admin dashboard */}
                            {isAuth() && isAuth().category.title == 'admin' && (
                                <Nav.Link className="nav-item" >
                                    <Link className="nav-link" to="/admin/home" style={isActive('/admin/home', match)} >{`Admin home`}</Link>
                                </Nav.Link>
                            )}
                            {/* Open admin sidebar page */}
                            {isAuth() && isAuth().category.title == 'admin' && (
                                <button className="btn btn-link" style={{ cursor: 'pointer', color: 'white' }} onClick={toggleDrawer}>{adminButtonText}</button>
                            )}
                            {/* profile page */}
                            {isAuth() && (
                                <Nav.Link className="nav-item" >
                                    <Link style={isActive('/profile', match)} to="/profile" className="nav-link">{`${isAuth().firstname} ${isAuth().surname}`}</Link>
                                </Nav.Link>
                            )}
                            {/* messenger */}
                            {isAuth() && isAuth().category.title == 'admin' && (
                                <Nav.Link className="nav-item" >
                                    <Link className="nav-link" to="/messenger" style={isActive('/messenger', match)} >{`Messenger`}</Link>
                                </Nav.Link>
                            )}

                            {/* signout button  */}
                            {isAuth() && (
                                <button className="btn btn-link" style={{ cursor: 'pointer', color: 'white' }} onClick={() => {
                                    signout(() => {
                                        history.push('/')
                                    })
                                }}>Signout</button>
                            )}

                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={checked}
                                            onChange={toggleEditMode}
                                            name="Edit"
                                            color="primary"
                                        />
                                    }
                                    label="Edit"
                                />
                            </FormGroup>

                            {/* Publish */}
                            {
                                isEdit() && isAuth() && isAuth().category.title == 'admin' && (
                                    <button className="btn btn-link" style={{ cursor: 'pointer', color: 'white' }} onClick={
                                        () => updatePublishEditableAreas()
                                    }>Publish</button>
                                )}

                            {/* Edit page */}
                            {!isEdit() && isAuth() && isAuth().category.title == 'admin' && (
                                <button className="btn btn-link" style={{ cursor: 'pointer', color: 'white' }} onClick={() => {
                                    history.push({
                                        search: '?edit=true'
                                    })
                                }}>Edit</button>
                            )}
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </React.Fragment>
        )

    }

    const messengerVar = isMessengerActive(match) ? "messenger p-0" : ""

    return (
        <div className="wrapper">
            <Drawer style={{ width: '220px' }} variant="persistent" anchor="left" open={sidebarIsOpen} classes={{ paper: classes.drawerPaper }}>
                <Sidebar items={items} />
            </Drawer>
            <div>
                <ToastContainer></ToastContainer>
                {nav()}
                {isHomepageActive(match) && (
                    <div className="overlay_above_nav">
                        <div className="banner_wrapper" style={{
                        }}>
                            <Banner size={{ width: "unset", height: "400px" }} title="mainBanner" ></Banner>
                        </div>
                        {!isFullscreen(match) && (
                            <div style={{ marginTop: '20px', marginBottom: '20px' }} className={`container`} >
                                {children}
                            </div>
                        )}
                        {isFullscreen(match) && (
                            <div style={{ margin: '20px', marginRight: "0px", marginTop: "0px", marginBottom: "0px" }} className="">
                                {children}
                            </div>
                        )}
                    </div>
                )}
                {!isHomepageActive(match) && (
                    <div>
                        {/* {isHomepageActive(match) && (
                            <Banner size={{ width: "unset", height: "400px" }} title="mainBanner" ></Banner>
                        )} */}
                        {!isFullscreen(match) && (
                            <div style={{ marginTop: '20px', marginBottom: '20px' }} className={`container ${messengerVar}`}>
                                {children}
                            </div>
                        )}
                        {isFullscreen(match) && (
                            <div style={{ margin: '20px', marginRight: "0px", marginTop: "0px", marginBottom: "0px" }} className={`${messengerVar}`}>
                                {children}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default withRouter(Layout);