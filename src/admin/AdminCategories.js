import React from 'react';
import Layout from '../layouts/Layout';
import AdminTable from './components/AdminTable';

const AdminCategories = () => {

    const getURL = `${process.env.REACT_APP_API}/category`

    return (
        <Layout>
            <AdminTable
                name="Category"
                routePrefix="category"
                getURL={getURL}
            />
        </Layout >
    )
};

export default AdminCategories