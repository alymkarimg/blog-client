import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import 'react-toastify/dist/ReactToastify.min.css';
import '../../assets/css/Style.css'
import { getFieldsFromPrototype } from '../../helpers/Default'

const EnhancedTableHead = ({ prototype, classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) => {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    
    var headCells = getFieldsFromPrototype(prototype).map((property) => {

        let column = {
            title: property,
            numeric: false,
            disablePadding: false,
            label: property.capitalize()
        }

        if (property == "title"){
            column.disablePadding = true
        }

        if (property == "publishedDate"){
            column.label = 'Published Date'
        }

        if (property == "edit"){
            column.label = ''
        }
        
        return column;
    }) 

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                         checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.title}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;