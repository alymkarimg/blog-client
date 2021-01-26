import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Layout from '../../layouts/Layout';
import { updateUserCookie, isAuth, getCookie, signout } from '../../helpers/Default'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import EditableArea from '../../core/components/EditableArea';

const BlogLayout = ({ history, match }) => {

    let user = isAuth();
    const [values, setValues] = useState({
        title: '',
        slug: '',
        editableArea: false,
        mtitle: '',
        mdescription: '',
        image: '',
        categories: [],
        author: '',
    })

    const blogId = match.params.id

    useEffect(
        () => {
            axios({
                method: 'POST',
                url: `${process.env.REACT_APP_API}/api/blogs/${blogId}`,
                data: values,
              }).then(response => {
                if (response.data.errors && response.data.errors.length > 0) {
                  response.data.errors.forEach((error) => {
                    toast.error(error.message)
                  })
                } else {
                    setValues({
                        ...values,
                        title: response.data.title,
                        slug: response.data.slug,
                        editableArea: response.data.editableArea,
                        mtitle: response.data.mtitle,
                        mdescription: response.data.mdescription,
                        image: response.data.image,
                        categories: response.data.categories,
                        author: response.data.author,
                    })
                }
              }).catch(error => {
                error.response.data.errors.forEach((error) => {
                  toast.error(error.message)
                })
              })
        }, []
    )

    const { title, slug, editableArea, mtitle, mdescription, image, categories, author, } = values;

    const blog = () => (
        <div>
          <h1>{title}</h1>
          <EditableArea fade size={{width: "unset", height:"200px"}} pathname={editableArea.pathname} guid={editableArea.guid}></EditableArea>
        </div>
    );

    return (
        <Layout>
            <div className="col-md-8 offset-md-2">
                {blog()}
            </div>
        </Layout>
    )
};
export default BlogLayout;