import React from 'react'
import "../Default.css"
import ChatIcon from '@material-ui/icons/Chat';
import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat'

const CreateSidebar = () => {

    return (
        <div className="messengerSidebar">
            <div className="sidebarHeader">
                <Avatar src="https://i.pinimg.com/originals/29/a8/20/29a82067b71bd9e3df95e1c0ba5c4daf.jpg" />
                <div className="sidebarHeaderRight">
                    <IconButton><ChatIcon /></IconButton>
                    <IconButton><DonutLargeIcon /></IconButton>
                    <IconButton><MoreVertIcon /></IconButton>
                </div>
            </div>
            <div className="sidebarSearch">
                <div className="sidebarSearchContainer">
                    <SearchOutlined></SearchOutlined>
                    <input placeholder="Search or start new chat" type="text"></input>
                </div>
            </div>
            <div className="sidebarChats">
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )

};

export default CreateSidebar;