import React, { useState, useEffect, Fragment, useContext, useRef, createRef } from 'react';
import reactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import { isEdit, isAuth, signout } from '../helpers/Default';
import EditableArea from '../core/components/EditableArea'
import { EditableAreaContext } from '../contexts/EditableAreaContext'
import { AnimatedBannerContext } from '../contexts/AnimatedBannerContext'
import Sidebar from '../core/components/Sidebar'
import Banner from '../core/components/AnimatedBanner'
import Hamburger from 'hamburger-react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.min.css'
import { Drawer, makeStyles, fade, Avatar, ClickAwayListener, Popper } from '@material-ui/core';
import '../assets/css/Style.css'
import { isHomepageActive, isActive, isFullscreen, isMessengerActive } from '../helpers/Default'
import { Navbar, Nav, NavDropdown, Line, Form, FormControl, Button } from 'react-bootstrap'
import { Switch, FormGroup, FormControlLabel } from '@material-ui/core';
import $, { contains, nodeName } from "jquery"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import EditIcon from '@material-ui/icons/Edit';
import PublishIcon from '@material-ui/icons/Publish';
import {
    Menu,
    MenuItem,
    MenuButton,
    SubMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';


const Layout = function ({ children, match, history }) {


    const elementsRef = useRef([]);

    $(document).ready(function () {
        $("a").on('click', function (e) {
            var url = e.target.parentNode.href;
            if (url && url.endsWith("#intro")) {
                var hash = url.substring(url.indexOf("#") + 1);
                $('html, body').animate({
                    scrollTop: $('#' + hash).offset().top
                }, 500);
                return false;
            }
        });
    });

    const useStyles = makeStyles((theme) => ({
        menu: {
            display: "flex",
            justifyContent: "flex-end",
            [theme.breakpoints.up('md')]: {
                justifyContent: 'flex-start',
            },
        },
        drawerPaper: {
            paddingTop: "70px",
            width: 'inherit',
            boxShadow: "1px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)"
        },
        input: { color: "white" },
        root: {
            boxShadow: "none !important",
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "flex-end",
            zIndex: "1500",
            width: "100%",
        },
        menuButton: {
            marginRight: theme.spacing(2),
            position: 'absolute',
            marginLeft: "5px",
            paddingTop: "9px",
            zIndex: 1300,
            color: "rgb(57, 255, 20) !important",
            display: "none",
            [theme.breakpoints.down('sm')]: {
                display: 'block',
            },
        },
        title: {
            display: 'none',
            padding: "0px 30px",
            [theme.breakpoints.up('md')]: {
                display: 'block',
            },
        },
        menuItems: {
            justifyContent: "flex-start",
            display: "none",
            flexGrow: 1,
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        menuItem: {
            marginTop: "3px",
            padding: "0px 30px",
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: "100px",
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));
    const classes = useStyles();

    const [values, setValues] = useState({
        sidebarIsOpen: false,
        adminButtonText: 'Close Menu',
        HomepageActive: false,
        editSwitchText: "edit",
        checked: false,
        menuTree: null,
        anchorEl: null,
        anchorEl2: null,
        popupOpen: false,
    })

    let { sidebarIsOpen, menuTree, anchorEl, anchorEl2, popupOpen } = values

    const toggleDrawer = () => {
        setValues({ ...values, sidebarIsOpen: !sidebarIsOpen })
    }

    const toggleEditMode = () => {

    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/menu/`,
        }).then(response => {
            setValues({ ...values, menuTree: response.data.menuTree })
        }).catch(error => {
            console.log('Error loading menu items', error.response.data);
            error.response.data.errors.forEach((error) => {
                toast.error(error.message)
            })
        })
    }, [])

    useEffect(() => {
        setValues({ ...values, adminButtonText: sidebarIsOpen ? "Close Menu" : "Administer Site" })
    }, [])

    useEffect(() => {
        setValues({ ...values, HomepageActive: isHomepageActive(match) })
    }, [match])

    const { updatePublishEditableAreas } = useContext(EditableAreaContext);
    const { updatePublishAnimatedBanners } = useContext(AnimatedBannerContext);

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

    var popper1 = useRef()


    const nav = () => {
        const handleClose = (event, url) => {

            setValues({ ...values, anchorEl: null, popupOpen: true });
        }

        const handleClick = (event, url) => {
            setValues({ ...values, anchorEl: event.currentTarget, popupOpen: true });
            event.preventDefault();


        }

        const printMenuTree = () => {

            var menutree = menuTree && menuTree.map((menuItem, index) => {

                const onClick = () => {

                }

                const printMenuTreeItem = (item) => {
                    if (item.children.length > 0) {
                        return (
                            item.children.map((child) => {
                                return (<SubMenu className="menu" label={item.title}>
                                    {printMenuTreeItem(child)}
                                </SubMenu >)
                            })
                        )
                    }
                    else {
                        if (item) {
                            return (
                                <MenuItem className="menuItem"> 
                                    {item.title}
                                </MenuItem>
                            )
                        }
                    }
                }

                return (
                    menuItem.children.map((menuitem) => {
                        return (
                            <Menu  onMouseOver={onClick} className="menu" menuButton={<MenuButton>{menuItem.title}</MenuButton>}>
                                {
                                    printMenuTreeItem(menuitem)
                                }
                            </Menu>
                        )
                    })
                )
            })

            return menutree
        }

        return (
            <React.Fragment>
                <div style={isHomepageActive("/", match) ? { backgroundColor: "transparent" } : { backgroundColor: "black" }} className={classes.root}>
                    <AppBar style={{ boxShadow: "none" }} position="static">
                        <Toolbar className={classes.menu} >
                            <Typography className={classes.title} variant="h5" noWrap>
                                <Link to="/" style={isActive('/', match)}>Home</Link>
                            </Typography>
                            <div className={classes.menuItems}>
                                    <Link to="/blogs" style={isActive('/blogs', match)} >{`Blog`}</Link>
                                    <Link to="/shop" style={isActive('/shop', match)} >{`Shop`}</Link>
                                {printMenuTree()}
                            </div>

                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>

                            {!isAuth() && (
                                <Fragment>
                                    <Typography>
                                        <Link to="/signup" className="nav-link" style={isActive('/signup', match)}>Sign up</Link>
                                    </Typography>
                                    <Typography>
                                        <Link to="/signin" className="nav-link" style={isActive('/signin', match)}>Sign in</Link>
                                    </Typography>
                                </Fragment>
                            )}
                            {isAuth() && (
                                    <Menu
                                        className="menu"
                                        direction={"bottom"}
                                        menuButton={<MenuButton><Avatar src="/broken-image.jpg" /></MenuButton>}
                                    >
                                        <MenuItem  className="menuItem" ><Link style={isActive('/profile', match)} to="/profile" >{`${isAuth().firstname} ${isAuth().surname}`}</Link></MenuItem>
                                        <MenuItem ><Link to="/messenger" style={isActive('/messenger', match)} >{`Messenger`}</Link></MenuItem>
                                        <MenuItem ><button className="btn btn-link" style={{ cursor: 'pointer' }} onClick={() => {
                                            signout(() => {
                                                history.push('/')
                                            })
                                        }}>Signout</button></MenuItem>
                                    </Menu>
                            )}
                            {isAuth() && isAuth().category.title == "admin" && (
                                <Link to="/admin/home" className="nav-link" style={isActive('/admin/home', match)}> <SupervisorAccountIcon></SupervisorAccountIcon></Link>
                            )}
                            {isEdit() && isAuth() && isAuth().category.title == 'admin' && (
                                <button className="btn btn-link" style={{ cursor: 'pointer', color: 'white' }} onClick={
                                    () => {
                                        updatePublishAnimatedBanners();
                                        updatePublishEditableAreas();
                                    }
                                }><PublishIcon></PublishIcon></button>
                            )}
                            {!isEdit() && isAuth() && isAuth().category.title == 'admin' && (
                                <button className="btn btn-link" style={{ cursor: 'pointer', color: 'white' }} onClick={() => {
                                    history.push({
                                        search: '?edit=true'
                                    })
                                }}><EditIcon></EditIcon></button>
                            )}
                        </Toolbar>
                    </AppBar>
                </div>
            </React.Fragment>
        )

    }

    const messengerVar = isMessengerActive(match) ? "messenger p-0" : ""
    const hamburgerMessage = sidebarIsOpen ? "Close" : ""

    return (
        <div className="wrapper">
            <Drawer style={{ width: '220px' }} variant="persistent" anchor="left" open={sidebarIsOpen} classes={{ paper: classes.drawerPaper }}>
                <Sidebar toggleDrawer={toggleDrawer} items={items} />
            </Drawer>
            <div>
                <ToastContainer></ToastContainer>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                >

                    <Hamburger style={classes.smallMenu} toggled={sidebarIsOpen} toggle={toggleDrawer} />
                    <span>{hamburgerMessage}</span>
                </IconButton>
                {nav(this)}
                {isHomepageActive(match) && (
                    <div className="overlay_above_nav">
                        <div className="banner_wrapper" style={{
                        }}>
                            <Banner size={{ width: "100%", height: "400px" }} title="mainBanner" ></Banner>
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