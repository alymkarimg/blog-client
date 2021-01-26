import React from 'react';
import Layout from '../layouts/Layout'
import BlogCard from '../blog/components/BlogCard'
import { useState, useEffect } from 'react';
import axios from 'axios'
import EditableArea from '../core/components/EditableArea';
import SimpleSelect from '../core/components/Select';
import CheckboxList from '../core/components/Checklist'
import MultipleSelect from '../core/components/MultipleSelect'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import FadeIn from 'react-fade-in';
import InputLabel from '@material-ui/core/InputLabel';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ShopSnippet from './components/ShopSnippet';

const Shop = () => {

    const [values, setValues] = useState({
        posts: [1, 2, 3],
    });

    const useStyles = makeStyles((theme) => ({
        avatar: {
            backgroundColor: red[500],
        },

        sort: {
            marginRight: "20px"
        }
    }));

    const classes = useStyles();

    const { posts } = values;

    useEffect(() => {

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/blogs/`
        }).then(response => {
            if (response.data.errors && response.data.errors.length > 0) {
                response.data.errors.forEach((error) => {
                    toast.error(error.message)
                })
            }
            else if (response.data.blogs.length > 0) {
                setValues({ ...values, posts: response.data.blogs });
            }
            else {

            }
        }).catch(error => {
            console.log(error)
            error.response.data.errors.forEach((error) => {
                toast.error(error.message)
            })
        })
    }, [])

    return (
        <Layout>
            <div className="row">
                <div className="col-md-12">
                    <EditableArea fade={true} pathname="/shop" guid="EA_shop_title"></EditableArea>
                </div>
                <div className="col-md-12" >
                    <EditableArea fade={true} pathname="/shop" guid="EA_shop_new_items"></EditableArea>
                    <ShopSnippet></ShopSnippet>
                    <EditableArea fade={true} pathname="/shop" guid="EA_shop_offers"></EditableArea>
                    <ShopSnippet></ShopSnippet>
                </div>
                <div className="row col-md-12">
                </div>
            </div>
        </Layout >
    )
}

export default Shop;
