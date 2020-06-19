import React from 'react';
import Layout from './Layout'
import AdminDashboardCard from './AdminDashboardCard'

const AdminHome = () => (
    <Layout>
        <div className="row">
            <div className="col-md-4" style={{marginTop: '20px', marginBottom: '20px'}}>
                <AdminDashboardCard link='/admin/users' pathname="/admin/home" guid="users" ></AdminDashboardCard>
            </div>
            <div className="col-md-4" style={{marginTop: '20px', marginBottom: '20px'}}>
                <AdminDashboardCard link='/admin/pages' pathname="/admin/home" guid="pages" ></AdminDashboardCard>
            </div>
            <div className="col-md-4" style={{marginTop: '20px', marginBottom: '20px'}}>
                <AdminDashboardCard link='/admin/menu' pathname="/admin/home" guid="menu" ></AdminDashboardCard>
            </div>
            <div className="col-md-4" style={{marginTop: '20px', marginBottom: '20px'}}>
                <AdminDashboardCard link='/admin/banners' pathname="/admin/home" guid="banners" ></AdminDashboardCard>
            </div>
            <div className="col-md-4" style={{marginTop: '20px', marginBottom: '20px'}}>
                <AdminDashboardCard link='/admin/blog' pathname="/admin/home" guid="products" ></AdminDashboardCard>
            </div>
            <div className="col-md-4" style={{marginTop: '20px', marginBottom: '20px'}}>
                <AdminDashboardCard link='/admin/products' pathname="/admin/home" guid="blog" ></AdminDashboardCard>
            </div>
        </div>



    </Layout>
)

export default AdminHome;
