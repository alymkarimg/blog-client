/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../layouts/Layout'
import BlogCard from './components/BlogCard'
import axios from 'axios'
import EditableArea from '../core/components/EditableArea';
import SimpleSelect from '../core/components/Select';
import MultipleSelect from '../core/components/MultipleSelect'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const BlogCardItem = () => {

    const [values, setValues] = useState({
        blogs: [],
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

    const { blogs } = values;

    useEffect(() => {

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/blogs/`
        }).then(response => {

            setValues({ ...values, blogs: response.data.blogs });

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
                    <EditableArea fade={true} pathname="/blog" guid="EA_blog_title"></EditableArea>
                </div>
                {/* <div className="col-md-12" style={{ marginBottom: "10px" }}>
                    <p>Search</p>
                    <div style={{ width: "33%" }}>
                        <TextField id="search_blogs" fullWidth />
                    </div>
                </div> */}
                <div className="col-md-12" style={{ display: "flex", flexDirection: "row", }} >
                    <div style={{ MarginRight: "15px", MarginLeft: "-15px", marginBottom: "10px" }}>
                        <p>Sort</p>
                        <div className="sort" style={{ display: "flex", flexDirection: "row", padding: "0px 0px 20px 0px" }}>
                            <SimpleSelect value="" sort="Newest listed" title="By" menuitems={["Most popular", "Newest listed", "Oldest listed"]} />
                        </div>
                    </div>
                    <div>
                        <p>Filter</p>
                        <div className="filter" style={{ display: "flex", flexDirection: "row", padding: "0px 0px 20px 0px" }}>
                            <SimpleSelect value="" title="Time" menuitems={["Past hour", "Past 24 hours", "Past week", "Past month", "Past year"]} />
                            <MultipleSelect value={[]} title="Category" menuitems={["Vegetarian", "Recipes", "Articles"]} />
                            <MultipleSelect value={[]} title="Author" menuitems={["Jane Dick", "Richard Harry", "Steve Austen"]} />
                            <MultipleSelect value={[]} title="Month" menuitems={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]} />
                        </div>
                    </div>
                </div>
                <div className="row col-md-12">
                    <div className="col-md-9">
                        {blogs.map((blog, i) => {
                            return (
                                <Fragment key={`blog-elem${i}`}>
                                    <div className="fade-in blogCard" style={{ marginBottom: "20px" }}>
                                        <BlogCard blog={blog} />
                                    </div>
                                </Fragment>
                            )
                        })}
                    </div>
                    <div className="col-md-3 fade-in ml-auto" style={{
                        paddingRight: "0px",
                        marginBottom: "20px",
                        position: "relative"
                    }}>
                        <Card className={classes.root
                        } raised={true} >
                            <div className={classes.details}>
                                <CardContent>
                                    <h2 style={{ textAlign: "center" }}  >Categories</h2>
                                    <div style={{ display: "flex", textAlign: "centre", justifyContent: "center" }} className="">
                                        <section><Avatar style={{ alignSelf: 'right' }} aria-label={"avatar icon"} className={classes.avatar}></Avatar><span>Recipes</span></section>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default BlogCardItem;
