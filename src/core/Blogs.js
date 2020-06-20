import React from 'react';
import Layout from './Layout'
import BlogCard from './BlogCard'
import { useState, useEffect } from 'react';
import axios from 'axios'
import EditableArea from '../core/EditableArea';
import SimpleSelect from './Select';
import CheckboxList from './Checklist'
import MultipleSelect from './MultipleSelect'

const Blogs = () => {

    const [values, setValues] = useState({
        posts: [1, 2, 3]
    });

    const { posts } = values;

    useEffect(() => {
        // axios({

        // })
    }, [])

    return (
        <Layout>
            <div className="row">
                <div className="col-md-12">
                    <EditableArea pathname="/blog" guid="EA_blog_title"></EditableArea>
                </div>
                <div className="col-md-12" style={{display: "flex", flexDirection: "row"}}>
                    <SimpleSelect sort="Newest listed" title="Sort" menuitems={["Most popular", "Newest listed", "Oldest listed"]}></SimpleSelect>
                    <SimpleSelect title="Links From:" menuitems={["Past hour", "Past 24 hours", "Past week", "Past month", "Past year"]}></SimpleSelect>
                    <MultipleSelect title="Category" menuitems={["Vegetarian", "Recipes", "Articles"]} />
                    <MultipleSelect title="Author" menuitems={["Jane Dick", "Richard Harry", "Steve Austen"]} />
                    <MultipleSelect title="Month" menuitems={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]} />
                </div>
                <div className="col-md-12">
                        {posts.map((post, i) => {
                            return (
                                <div className="col-md-12" style={{ marginBottom: "20px" }}>
                                    <BlogCard post={post} />
                                </div>
                            )
                        })}
                    </div>
            </div>
        </Layout>
    )
}

export default Blogs;
