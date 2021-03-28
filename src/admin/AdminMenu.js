import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import AdminTable from './components/AdminTable';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Button, IconButton, TableCell, TableHead, TableRow } from '@material-ui/core'
import { getCookie } from '../helpers/Default'
import Tree from 'rc-tree';
import { generateData, gData } from './utils/dataUtils';
import Nestable from 'react-nestable';
import EditableArea from '../core/components/EditableArea';
import $ from 'jquery'

const AdminMenu = () => {

    const [values, setValues] = useState({
        menuItems: [],
        autoExpandParent: true,
        expandedKeys: ['0-0-key', '0-0-0-key', '0-0-0-0-key'],
        menuTree: []
    });

    const { menuItems, autoExpandParent, expandedKeys, menuTree } = values

    const renderItem = ({ item }) => item.id;

    function addDepth(arr, unfilteredArray, depth = 1) {
        arr.forEach((obj, index) => {

            obj.depth = depth

            function romanize(num) {
                if (isNaN(num))
                    return NaN;
                var digits = String(+num).split(""),
                    key = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX",
                        "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX",
                        "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
                    roman = "",
                    i = 3;
                while (i--)
                    roman = (key[+digits.pop() + (i * 10)] || "") + roman;
                return Array(+digits.join("") + 1).join("I") + roman;
            }

            if (unfilteredArray) {
                unfilteredArray.forEach(q => {
                    if (q.id == obj.id) {
                        q.depth = romanize(obj.depth)
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
        })
    }


    useEffect(function () {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/menu/`,
        }).then(response => {

            if (response.data) {

                var tree = response.data.menuTree

                addDepth(response.data.menuTree, response.data.menuItems)

                setValues({
                    ...values, menuItems: response.data.menuItems, menuTree: tree
                })
            }
        }).catch(error => {
            console.log('Error loading blog articles', error.response.data);
            error.response.data.errors.forEach((error) => {
                toast.error(error.message)
            })
        })
    }, [])


    $('document').ready(function () {
        loadRowText()
    });

    const loadRowText = () => {
        var nestedItems = document.querySelectorAll(".nestable-item-name");
        if (menuItems && nestedItems) {
            nestedItems.forEach((nestedItem) => {
                menuItems.forEach((menuItem) => {
                    if (nestedItem.textContent == menuItem.id) {
                        nestedItem.textContent = "";

                        // title
                        let div0 = document.createElement("div")
                        div0.textContent = `${menuItem.depth}.`
                        nestedItem.append(div0)


                        // title
                        let div = document.createElement("div")
                        div.textContent = `Title: ${menuItem.title}`
                        nestedItem.append(div)

                        // url
                        let div2 = document.createElement("div")
                        div2.textContent = `URL: \"\~${menuItem.url}\"`
                        nestedItem.append(div2)


                        // edit/delete buttons
                        let div3 = document.createElement("div")
                        let editButton = document.createElement("button")
                        editButton.textContent = "Edit"
                        let deleteButton = document.createElement("button")
                        deleteButton.textContent = "Delete"
                        div3.append(editButton)
                        div3.append(deleteButton)
                        nestedItem.append(div3)
                    }
                })
            })
        }
    }

    const onChange = (items, item) => {
        var items;
        addDepth(items, menuItems)
        setValues({ ...values, menuTree: items, menuItems })
        loadRowText()
    }

    return (
        <Layout>
            <div className="container">
                <EditableArea pathname="/admin/menu" guid="adminMenu"></EditableArea>
                <div className="menuTableContainer" >
                    <Nestable
                        threshhold={10}
                        onChange={onChange}
                        items={menuTree}
                        renderItem={renderItem}
                    />
                </div>
            </div>
        </Layout>
    );
}


export default AdminMenu;
