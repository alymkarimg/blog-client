import React from 'react';
import Layout from '../layouts/Layout'
import EditableArea from './components/EditableArea'

const App = () => {
  return (
      <Layout>
        <div id="intro">
        <EditableArea fade={true} className="p-5 text-center" path="/" guid="ea_profile_intro"></EditableArea>
        </div>   
      </Layout>
  )
}


export default App;