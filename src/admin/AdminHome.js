import React from 'react';
import Layout from '../layouts/Layout'
import AdminDashboardCard from './components/AdminDashboardCard'

const size = {width:"400px", height:"345px"};
const fade = true

// automate this to use a list of the modules installed, the list should be found in the database
const AdminHome = () => (
    <Layout>
        <div className="adminHome row"  style={{display: 'flex', marginBottom: '20px'}}>
            <div className="col-md-3 p-3" style={{marginTop: '20px', marginBottom: '20px'}}>
                <AdminDashboardCard  size={size} fade={fade} link={true} pathname="/admin/home" guid="users" ></AdminDashboardCard>
            </div>
            <div className="col-md-3 p-3" style={{marginTop: '20px', marginBottom: '20px'}}>
                <AdminDashboardCard   size={size} fade={fade} link={true} pathname="/admin/home" guid="pages" ></AdminDashboardCard>
            </div>
            <div className="col-md-3 p-3" style={{marginTop: '20px', marginBottom: '20px'}}>
                <AdminDashboardCard   size={size} fade={fade} link={true} pathname="/admin/home" guid="menu" ></AdminDashboardCard>
            </div>
            <div className="col-md-3 p-3" style={{marginTop: '20px', marginBottom: '20px'}}>
                <AdminDashboardCard  size={size} fade={fade} link={true} pathname="/admin/home" guid="categories" ></AdminDashboardCard>
            </div>
            <div className="col-md-3 p-3" style={{marginTop: '20px', marginBottom: '20px'}}>
                <AdminDashboardCard  size={size} fade={fade} link={true} pathname="/admin/home" guid="products" ></AdminDashboardCard>
            </div>
            <div className="col-md-3 p-3" style={{marginTop: '20px', marginBottom: '20px'}}>
                <AdminDashboardCard hasLink size={size} fade={fade} link={true} pathname="/admin/home" guid="blog" ></AdminDashboardCard>
            </div>
            <div className="col-md-3 p-3" style={{marginTop: '20px', marginBottom: '20px'}}>
                <AdminDashboardCard hasLink size={size} fade={fade}  link={true} pathname="/admin/home" guid="orders" ></AdminDashboardCard>
            </div>
        </div>
    </Layout>
)

export default AdminHome;
