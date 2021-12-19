import React from 'react';
import Layout from '../layouts/Layout';
import AdminTable from './components/AdminTable';

const AdminShop = () => {

    const getURL = `${process.env.REACT_APP_API}/shop`

    return (
        <Layout>
            <AdminTable
                name="Product"
                routePrefix="shop"
                getURL={getURL}
            />
        </Layout >
    )
}

export default AdminShop