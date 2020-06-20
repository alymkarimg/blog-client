import React from 'react';
import Layout from './Layout';
import AdminTable from './AdminTable';

const AdminBlog = () => {
    return (
        <Layout>
            <AdminTable
                headCells={[
                    { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
                    { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
                    { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
                    { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
                    { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
                ]}
                rows={[
                    { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 3.7},
                    {name: 'Donut', calories: 265, fat: 3, carbs: 67, protein: 1.2},
                    {name: 'Eclair', calories: 132, fat: 1.7, carbs: 52, protein: 2.3},
                    {name: 'KitKat', calories: 156, fat: 2.5, carbs: 43, protein: 0.9},
                    {name: 'Oreo', calories: 201, fat: 1.1, carbs: 37, protein: 4.0},
              ]}></AdminTable>
              
        </Layout >
    )
}

export default AdminBlog