import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import AdminTable from './components/AdminTable';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Button, IconButton, TableCell, TableHead, TableRow } from '@material-ui/core'
import { getCookie, isEdit } from '../helpers/Default'
import Tree from 'rc-tree';
import { generateData, gData } from './utils/dataUtils';
import Nestable from 'react-nestable';
import EditableArea from '../core/components/EditableArea';
import $ from 'jquery'
import FullScreenDialog from '../admin/components/AdminCreateEditDialog'

const AdminMenu = () => {

    const [values, setValues] = useState({
        menuItems: [],
        autoExpandParent: true,
        expandedKeys: ['0-0-key', '0-0-0-key', '0-0-0-0-key'],
        menuTree: [],
        dialogOpen: false,
        prototype: null,
        currentTarget: null,
        changes: []
    });

    const getURL = `${process.env.REACT_APP_API}/menu`

    const handleDeleteClick = () => {
        // axios post
    }

    const handleEditClick = () => {
        // open dialog, set current target
        setValues({ ...values, dialogOpen: true })

    }

    const handleHideClick = () => {
        var hideButton = document.querySelector(".hideButton")

        if(hideButton.className.includes("ToggledOn")){
            hideButton.className = "hideButton"
        } else {
            hideButton.className = "hideButton ToggledOn"
        }
    }   

    const handleAddClick = (event) => {
        // open dialog, set current target 
        setValues({ ...values, dialogOpen: true, currentTarget: event.currentTarget.parentNode.parentNode.id })

    }


    const { menuItems, currentTarget, menuTree, dialogOpen, prototype, changes } = values

    useEffect(function () {
        setValues({
            ...values, prototype
        })
    }, [])

    const renderItem = ({ item }) => item.id;

    function addDepth(arr, unfilteredArray, depth = 1) {

        var treeDepth
        arr.forEach((obj, index) => {

            const getArrayDepth = (arr) => {
                return 1 + Math.max(0, ...arr.map(({ subs = [] }) => getArrayDepth(subs)));
            }
            treeDepth = getArrayDepth(menuTree)

            obj.depth = depth

            const depthToHumanReadableString = () => {
                if (depth == 1){
                    return "Level 1"
                }
                if(depth == 1.1){
                    return "Level 2"
                }
                if(depth == 1.11){
                    return "Level 3"
                } 
            }

            if (unfilteredArray) {
                unfilteredArray.forEach(q => {
                    if (q.id == obj.id) {
                        q.depth = `${depthToHumanReadableString(obj.depth.toString())}`
                    }
                })
            }

            const decimalCount = num => {
                // Convert to String
                const numStr = String(num);
                // String Contains Decimal
                if (numStr.includes('.')) {
                    return numStr.split('.')[1].length;
                };
                // String Does Not Contain Decimal
                return 0;
            }

            if (menuTree) {
                if (decimalCount(obj.depth) == 0) {
                    addDepth(obj.children, unfilteredArray, depth + 1 / 10)
                } else if (decimalCount(obj.depth) == 1) {
                    addDepth(obj.children, unfilteredArray, depth + 1 / 100)
                } else if (decimalCount(obj.depth) == 2) {
                    addDepth(obj.children, unfilteredArray, depth + 1 / 1000)
                } else if (decimalCount(obj.depth) == 3) {
                    addDepth(obj.children, unfilteredArray, depth + 1 / 10000)
                } else if (decimalCount(obj.depth) == 4) {
                    addDepth(obj.children, unfilteredArray, depth + 1 / 100000)
                }
            }
        })
    }


    useEffect(function () {

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/menu/`,
        }).then(response => {

            if (response.data) {

                var tree = response.data.menutree.menuTree
                addDepth(response.data.menutree.menuTree, response.data.menutree.menuItems)

                setValues({
                    ...values, menuItems: response.data.menutree.menuItems, menuTree: tree, prototype: response.data.prototype
                })
            }

        }).catch(error => {
            console.log('Error loading menu items', error.response.data);
            error.response.data.errors.forEach((error) => {
                toast.error(error.message)
            })
        })
    }, [])


    $('document').ready(function () {
        loadRowText()
    });

    useEffect(() => {
        loadRowText();
    })

    const loadRowText = () => {
        var nestedItems = document.querySelectorAll(".nestable-item-name");
        if (menuItems && nestedItems) {
            nestedItems.forEach((nestedItem) => {
                menuItems.forEach((menuItem) => {
                    if (nestedItem.textContent == menuItem.id) {
                        nestedItem.id = nestedItem.textContent
                        nestedItem.textContent = "";

                        // depth
                        let div0 = document.createElement("div")
                        div0.textContent = `${menuItem.depth}`
                        nestedItem.append(div0)


                        // title
                        let div = document.createElement("div")
                        div.textContent = `Title: ${menuItem.title}`
                        nestedItem.append(div)

                        // url
                        let div2 = document.createElement("div")
                        div2.textContent = `URL: ~/${menuItem.url}`
                        nestedItem.append(div2)


                        // edit/delete buttons
                        let div3 = document.createElement("div")
                        let editButton = document.createElement("button")
                        editButton.addEventListener("click", handleEditClick)
                        editButton.textContent = "Edit"
                        let deleteButton = document.createElement("button")
                        deleteButton.addEventListener("click", handleDeleteClick)
                        deleteButton.textContent = "Delete"
                        let addButton = document.createElement("button")
                        addButton.addEventListener("click", handleAddClick)
                        addButton.textContent = "Add Child"
                        let hideButton = document.createElement("button")
                        hideButton.className = `hideButton`
                        hideButton.id = `${menuItem.id}`
                        hideButton.addEventListener("click", handleHideClick)
                        hideButton.textContent = "Hide from navigation"
                        div3.append(editButton)
                        div3.append(deleteButton)
                        div3.append(addButton)
                        div3.append(hideButton)
                        nestedItem.append(div3)

                    }
                })
            })
        }
    }

    const onChange = (items, item) => {
        var items;
        var item;
        addDepth(items, menuItems)
        setValues({ ...values, menuTree: items, menuItems })
    
        loadRowText()
    }

    const onConfirmChange = (dragItem, destinationParent) => {
        // var dragItem, destinationParent;
        // setValues({...values, changes: changes.concat[dragItem, destinationParent]})

        if(isEdit()){
            //
        
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/menu/reorder`,
            data: {dragItem, destinationParent},
            headers: {
                Authorization: `Bearer ${getCookie('token')}`
            }
        }).then(response => {
            toast.success(response.data.message);

        }).catch(error => {
            console.log('Error saving to the database', error.response.data);

            error.response.data.errors.forEach((error) => {
                toast.error(error.message)
            })
        })
            return true
        }
    }

    const handleCreateRow = (dbItem) => {

        dbItem.categories = dbItem.categories.map(q => q.toLowerCase())
        dbItem.slug = dbItem.title.toLowerCase();

        var bodyFormData = new FormData();

        // turn all dbitem keys into form data
        for (var key in dbItem) {
            if (key == "pictures") {
                for (var i = 0; i < dbItem.pictures.length; i++) {
                    bodyFormData.append('image[' + i + ']', dbItem.pictures[i]);
                }
            } else {
                bodyFormData.append(key, dbItem[key])
            }
        }

        if (currentTarget) {
            bodyFormData.append('parent', currentTarget)
        }

        axios({
            method: 'POST',
            url: `${getURL}/create`,
            data: bodyFormData,
            headers: {
                Authorization: `Bearer ${getCookie('token')}`,
                ContentType: 'multipart/form-data'
            }
        }).then(response => {
            console.log('Article Successfully created', response)
            window.location.reload();
            toast.success("Article Successfully created")

        }).catch(error => {
            console.log('Error saving article', error);
            // error.response.data.err.forEach((error) => {
            //   toast.error(error)
            // })
        })

    }

    const handleClose = () => {
        setValues({ ...values, dialogOpen: false });
    };

    return (
        <Layout>
            <div className="container">
                <EditableArea pathname="/admin/menu" guid="adminMenu"></EditableArea>
                <div className="menuTableContainer" >
                    <Nestable
                        confirmChange={onConfirmChange}
                        maxDepth={5}
                        threshhold={10}
                        onChange={onChange}
                        items={menuTree}
                        renderItem={renderItem}
                    />
                    {dialogOpen && (
                        <div >
                            <FullScreenDialog
                                name={"Menu"}
                                open={dialogOpen}
                                prototype={prototype}
                                title={"Menu"}
                                getURL={getURL}
                                handleClose={handleClose}
                                handleCreateRow={handleCreateRow}
                                handleDeleteClick
                            />
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}


export default AdminMenu;
