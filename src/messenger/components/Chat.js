import React, { setState, useState, useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import "../Default.css"
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

const CreateChat = () => {

    // set values
    const [values, setValues] = useState({ input: ""})


    // destructure values
    let { input } = values

    // functions
    const setInput  = (updatedVal) => {
        setValues({...values, input: updatedVal})

    }

    const sendMessage = () => {

    }

    return (
        <div className="messengerChat">
            <div className="chatHeader">
                <Avatar></Avatar>
                <div className="chatHeaderInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chatHeaderRight">
                    <IconButton><SearchOutlined /></IconButton>
                    <IconButton><AttachFile /></IconButton>
                    <IconButton><MoreVertIcon /></IconButton>
                </div>
            </div>
            <div className="chatBody">
                <p className="chatMessage">
                    <span className="chatName">Aang</span>
                    This is a message
                    <span className="chatTime">{new Date().toUTCString()}</span>
                </p>
                <p className="chatMessage chatReciever">
                    <span className="chatName">Aang</span>
                    This is a message
                    <span className="chatTime">{new Date().toUTCString()}</span>
                </p>
                <p className="chatMessage">
                    <span className="chatName">Aang</span>
                    This is a message
                    <span className="chatTime">{new Date().toUTCString()}</span>
                </p>
            </div>
            <div className="chatFooter">
                    <InsertEmoticon></InsertEmoticon>
                    <form>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message"
                            type="text" 
                            />
                            <button onClick={sendMessage} type="submit">
                                Send a message
                            </button>
                    </form>
                    <MicIcon/>
                </div>
        </div>
    )


};

export default CreateChat;