import React from 'react';
import Layout from '../layouts/Layout';
import AdminTable from './components/AdminTable';

const AdminUsers = () => {

    const getURL = `${process.env.REACT_APP_API}/user`

    return (
        <Layout>
            <AdminTable
                name="User"
                routePrefix="user"
                getURL={getURL}
            />
        </Layout >
    )
};

export default AdminUsers