/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import AdminTable from './components/AdminTable';
import axios from 'axios';
import { toast } from 'react-toastify';


const AdminOrders = () => {

    const getURL = `${process.env.REACT_APP_API}/order`

    return (
        <Layout>
            <AdminTable
                name="Order"
                routePrefix="order"
                getURL={getURL}
            />
        </Layout >
    )
};

export default AdminOrders