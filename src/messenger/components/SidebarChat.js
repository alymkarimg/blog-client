import React, { useState, useEffect } from 'react'
import {Avatar} from '@material-ui/core'
import "../Default.css"

const CreateSidebarChat = () => {

    return (
            <div className="sidebarChat">
                <Avatar></Avatar>
                <div className="sidebarChatInfo">
                    <h2>Room name</h2>
                    <p>Last message seen on the room</p>
                </div>
            </div>
    )

};

export default CreateSidebarChat;