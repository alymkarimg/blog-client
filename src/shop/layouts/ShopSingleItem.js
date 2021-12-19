/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Layout from '../../layouts/Layout'
import { useState, useEffect } from 'react';
import axios from 'axios'
import EditableArea from '../../core/components/EditableArea';
import MultipleSelect from '../../core/components/MultipleSelect'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
// import { makeStyles } from '@material-ui/core/styles';
// import { red } from '@material-ui/core/colors';
import ShopSnippet from '../components/ShopSnippet';
import "../../assets/css/Style.css"

const ShopSingleItem = () => {

    const [values, setValues] = useState({
        products: [],
    });

    // const useStyles = makeStyles((theme) => ({
    //     avatar: {
    //         backgroundColor: red[500],
    //     },

    //     sort: {
    //         marginRight: "20px"
    //     }
    // }));

    // const classes = useStyles();

    const { products } = values;

    useEffect(() => {

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/shop/`
        }).then(response => {
            if (response.data.errors && response.data.errors.length > 0) {
                response.data.errors.forEach((error) => {
                    toast.error(error.message)
                })
            }
            else if (response.data.products.length > 0) {
                setValues({ ...values, products: response.data.products });
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

            <div style={{ marginBottom: "20px", paddingBottom: "20px" }} className="shopContainer">
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
                        {/* products.filter(q => q.category === "food") */}
                        <ShopSnippet products={products} title={"food"}></ShopSnippet>
                    </div>
                    <div className="col-md-12" style={{ display: "flex", flexDirection: "row", }} >
                        <div>
                            <div className="filter" style={{ display: "flex", flexDirection: "row", padding: "0px 0px 20px 0px" }}>
                                <MultipleSelect value={[]} title="Filter drinks" menuitems={["Pizzas", "Kebabs", "Garlic Bread", "Chicken Strips", "Hot Wings", "Side Orders", ""]} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12" >
                        {/* products.filter(q => q.category === "drink") */}
                        <EditableArea fade={true} pathname="/shop" guid="EA_shop_drinks"></EditableArea>
                        <ShopSnippet title={"drink"} products={products} ></ShopSnippet>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ShopSingleItem;
