import React from 'react';
import Layout from './Layout'
import BlogCard from './BlogCard'
import { useState, useEffect } from 'react';
import axios from 'axios'
import EditableArea from '../core/EditableArea';
import SimpleSelect from './Select';

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
                    <SimpleSelect title="Sort" menuitems={["Most popular", "Newest listed", "Oldest listed"]}></SimpleSelect>
                </div>
                {posts.map((post, i) => {
                    return (
                        <div className="col-md-12" style={{marginBottom: "20px"}}>
                            <BlogCard post={post} />
                        </div>
                    )
                })}
            </div>
        </Layout>
    )
}

export default Blogs;
