import React from 'react';
import Layout from '../layouts/Layout'
import EditableArea from './components/EditableArea'

const EditablePage = (props) => {
  return (
      <Layout>
        <div id="">
        <EditableArea fade={true} pathname="page" guid={`${props.location.pathname}`}></EditableArea>
        </div>   
      </Layout>
  )
}


export default EditablePage;