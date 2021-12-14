import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import AdminTable from './components/AdminTable';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@material-ui/core'

const AdminUsers = () => {

    const getURL = `${process.env.REACT_APP_API}/user`

    return (
        <Layout>
            <AdminTable
                name="User"
                routePrefix="user"
                getURL={getURL}
                ></AdminTable>
        </Layout >
    )
};

export default AdminUsers