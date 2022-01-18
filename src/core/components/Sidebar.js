import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import EditableArea from '../../core/components/EditableArea'

function SidebarItem({ label, items, depthStep = 10, depth = 0, ...rest }) {
  return (
    <>
      <ListItem button dense {...rest}>
        <ListItemText style={{ paddingLeft: depth * depthStep }}>
          <span>{label}</span>
        </ListItemText>
      </ListItem>
      {Array.isArray(items) ? (
        <List disablePadding dense>
          {items.map((subItem) => (
            <SidebarItem
              key={subItem.name}
              depth={depth + 1}
              depthStep={depthStep}
              {...subItem}
            />
          ))}
        </List>
      ) : null}
    </>
  )
}

function Sidebar({ items, depthStep, depth, toggleDrawer, sidebarIsOpen }) {
  return (
    <React.Fragment>
      <div className="sidebar">
        <EditableArea size={{ width: "400px", height: "345px" }} pathname="/" guid="ea_sidemenu"></EditableArea>
        <List disablePadding dense>
          {items.map((sidebarItem, index) => (
            <SidebarItem
              key={`${sidebarItem.name}${index}`}
              depthStep={depthStep}
              depth={depth}
              {...sidebarItem}
            />
          ))}
        </List>
      </div>
    </React.Fragment>
  )
}

export default Sidebar