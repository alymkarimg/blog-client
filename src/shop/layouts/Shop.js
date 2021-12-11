import React from 'react';
import Layout from '../../layouts/Layout'
import BlogCard from '../../blog/components/BlogCard'
import { useState, useEffect } from 'react';
import axios from 'axios'
import EditableArea from '../../core/components/EditableArea';
import SimpleSelect from '../../core/components/Select';
import CheckboxList from '../../core/components/Checklist'
import MultipleSelect from '../../core/components/MultipleSelect'
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
import ShopSnippet from '../components/ShopSnippet';
import Banner from '../../core/components/AnimatedBanner'
import "../../assets/css/Style.css"

const Shop = () => {

    const [values, setValues] = useState({
        products: [1, ,2, 3],
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

    const { products } = values;

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
           
            <div style={{marginBottom: "20px", paddingBottom: "20px"}} className="shopContainer">
                <div className="row">
                    <div className="col-md-12">
                        <EditableArea fade={true} pathname="/shop" guid="EA_shop_title"></EditableArea>
                    </div>
                    <div className="col-md-12" style={{ display: "flex", flexDirection: "row", }} >
                        <div>
                            <div className="filter" style={{ display: "flex", flexDirection: "row", padding: "0px 0px 20px 0px" }}>
                                <MultipleSelect value={[]} title="Filter food" menuitems={["Pizzas", "Kebabs", "Garlic Bread", "Chicken Strips", "Hot Wings", "Side Orders", ""]} />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12" >
                            <ShopSnippet title={"food"}></ShopSnippet>
                    </div>
                    <div className="col-md-12" style={{ display: "flex", flexDirection: "row", }} >
                        <div>
                            <div className="filter" style={{ display: "flex", flexDirection: "row", padding: "0px 0px 20px 0px" }}>
                                <MultipleSelect value={[]} title="Filter drinks" menuitems={["Pizzas", "Kebabs", "Garlic Bread", "Chicken Strips", "Hot Wings", "Side Orders", ""]} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12" >
                        <EditableArea fade={true} pathname="/shop" guid="EA_shop_drinks"></EditableArea>
                        <ShopSnippet title={"drink"}></ShopSnippet>
                    </div>
                </div>
        </div>
        </Layout>
    )
}

export default Shop;
