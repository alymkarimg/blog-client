import React, { useState, useEffect } from 'react';
import Layout from '../core/layouts/Layout';
import AdminTable from './components/AdminTable';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@material-ui/core'

const AdminBlog = () => {

    const [values, setValues] = useState({
        rows: []
    })

    const { rows } = values

    useEffect(function () {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/blogs/`,
        }).then(response => {
            setValues({
                ...values, rows: response.data.map(blog => {
                    return {
                        id: blog.id,
                        name: blog.title,
                        image: blog.image,
                        mtitle: blog.mtitle,
                        mdescription: blog.mdescription,
                        categories: blog.categories,
                        author: blog.author,
                        created: blog.dateCreated,
                        edit: `/blogs/admin/edit/${blog.slug}`
                    }
                })
            })
        }).catch(error => {
            console.log('Error loading blog articles', error.response.data);
            error.response.data.errors.forEach((error) => {
                toast.error(error.message)
            })
        })
    }, [])

    return (
        <Layout>
            <AdminTable
                title="Manage blogs"
                deletepathname="blogs/deleteAdmin"
                headCells={[
                    { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
                    { id: 'image', numeric: false, disablePadding: false, label: 'Primary Image' },
                    { id: 'categories', numeric: false, disablePadding: false, label: 'Categories' },
                    { id: 'author', numeric: false, disablePadding: false, label: 'Author' },
                    { id: 'created', numeric: false, disablePadding: false, label: 'Date Created' },
                    { id: 'edit', numeric: false, disablePadding: false, label: '' },
                ]}
                rows={rows}></AdminTable>

        </Layout >
    )
}

export default AdminBlog