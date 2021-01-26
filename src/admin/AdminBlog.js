import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import AdminTable from './components/AdminTable';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@material-ui/core'
import { getCookie } from '../helpers/Default'

const AdminBlog = () => {

    const getURL = `${process.env.REACT_APP_API}/blogs`

    return (
        <Layout>
            <AdminTable
                title="Manage blogs"
                deletepathname="blogs/deleteAdmin"
                getURL={getURL}
                ></AdminTable>

        </Layout >
    )
};

export default AdminBlog