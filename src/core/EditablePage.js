import React from 'react';
import Layout from '../layouts/Layout'
import EditableArea from './components/EditableArea'

const EditablePage = (props) => {
  return (
      <Layout>
        <div id="">
        <EditableArea key={props.location.pathname} EditablePage={props.match.path} fade={true} guid='ea_editablePage' pathname={`${props.location.pathname}`}></EditableArea>
        </div>   
      </Layout>
  )
}


export default EditablePage;