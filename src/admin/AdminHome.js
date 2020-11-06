import React from 'react';
import Layout from '../core/layouts/Layout'
import AdminDashboardCard from './components/AdminDashboardCard'

const size = {width:"400px", height:"345px"};
const fade = true

// automate this to use a list of the modules installed, the list should be found in the database
const AdminHome = () => (
    <Layout>
        <div className="row">
            <div className="col-md-4" style={{marginTop: '20px', marginBottom: '20px'}}>
                <AdminDashboardCard  size={size} fade={fade} link='/admin/users' pathname="/admin/home" guid="users" ></AdminDashboardCard>
            </div>
            <div className="col-md-4" style={{marginTop: '20px', marginBottom: '20px'}}>
                <AdminDashboardCard  size={size} fade={fade} link='/admin/pages' pathname="/admin/home" guid="pages" ></AdminDashboardCard>
            </div>
            <div className="col-md-4" style={{marginTop: '20px', marginBottom: '20px'}}>
                <AdminDashboardCard  size={size} fade={fade} link='/admin/menu' pathname="/admin/home" guid="menu" ></AdminDashboardCard>
            </div>
            <div className="col-md-4" style={{marginTop: '20px', marginBottom: '20px'}}>
                <AdminDashboardCard  size={size} fade={fade} link='/admin/banners' pathname="/admin/home" guid="banners" ></AdminDashboardCard>
            </div>
            <div className="col-md-4" style={{marginTop: '20px', marginBottom: '20px'}}>
                <AdminDashboardCard  size={size} fade={fade} link='/admin/blog' pathname="/admin/home" guid="products" ></AdminDashboardCard>
            </div>
            <div className="col-md-4" style={{marginTop: '20px', marginBottom: '20px'}}>
                <AdminDashboardCard size={size} fade={fade} fade={fade} link='/admin/products' pathname="/admin/home" guid="blog" ></AdminDashboardCard>
            </div>
        </div>
    </Layout>
)

export default AdminHome;
