import React from 'react';
import Layout from '../layouts/Layout';
import AdminTable from './components/AdminTable';

const AdminBlog = () => {

    const getURL = `${process.env.REACT_APP_API}/blogs`

    return (
        <Layout>
            <AdminTable
                name="Blog"
                routePrefix="blogs"
                getURL={getURL}
            />
        </Layout >
    )
};

export default AdminBlog