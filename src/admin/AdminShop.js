import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import AdminTable from './components/AdminTable';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@material-ui/core'

const AdminShop = () => {

    const getURL = `${process.env.REACT_APP_API}/shop`

    return (
        <Layout>
            <AdminTable
                name="Product"
                routePrefix="shop"
                getURL={getURL}
                ></AdminTable>

        </Layout >
    )
}

export default AdminShop