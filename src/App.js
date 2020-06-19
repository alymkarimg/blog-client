import React from 'react';
import Layout from './core/Layout'
import EditableAreaContextProvider from './contexts/EditableAreaContext'
import EditableArea from './core/EditableArea'

const App = () => {
  return (
      <Layout>
      <EditableArea className="p-5 text-center" path="/" guid="ea_profile_intro"></EditableArea>
        <h1> Hello React </h1>
      </Layout>
  )
}


export default App;