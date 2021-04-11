import React, { createContext, Component, useEffect, useState } from 'react';
import { isEdit, getCookie } from '../helpers/Default'
import { toast } from 'react-toastify'
import axios from 'axios'
import { removeQuery } from '../helpers/Default';
import EditableArea from '../core/components/EditableArea';

export const EditableAreaContext = createContext(null);

const EditableAreaContextProvider = (props) => {
    const [editableAreavalues, setValues] = useState({
        publishEditableAreas: false,
        editableAreas: [],
    })

    var { publishEditableAreas, editableAreas } = editableAreavalues

    // add a value to the editable area state
    const updateEditableAreas = (editableArea) => {
        editableAreas = editableAreas.concat([editableArea])
        setValues({ ...editableAreavalues, editableAreas })
    }

    // for a button in the navigation to update publish editable area state
    const updatePublishEditableAreas = () => {
        setValues({ ...editableAreavalues, publishEditableAreas: true })
    }

    // when pubisheditableareas changes, update db if there are editable areas to update
    useEffect(() => {
        if (publishEditableAreas && editableAreas.length > 0) {
            axios({
                method: 'POST',
                url: `${process.env.REACT_APP_API}/editable-area/save`,
                data: { editableAreas },
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`
                }
            }).then(response => {
                removeQuery("edit")
                setValues({ ...editableAreavalues, editableAreas: [], publishEditableAreas: false })
                toast.success(response.data.message)
            }).catch(error => {
                console.log('Error saving to the database', error.response.data);

                error.response.data.errors.forEach((error) => {
                    toast.error(error.message)
                })
            })
        }
    }, [publishEditableAreas])

    return (
        <EditableAreaContext.Provider value={{ editableAreavalues, updateEditableAreas, updatePublishEditableAreas }}>
            {props.children}
        </EditableAreaContext.Provider>
    )

}

export default EditableAreaContextProvider;