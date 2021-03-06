import React, { useState, useEffect } from 'react'
import { getCookie } from '../../helpers/Default'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { Button } from 'react-bootstrap';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios'
import '../../assets/css/Style.css'
import FullScreenDialog from './AdminCreateEditDialog'
import EnhancedTableToolbar from './AdminTableToolbar'
import EnhancedTableHead from './AdminTableHead'
import { getFieldsFromPrototype, toHumanString } from '../../helpers/Default'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({ name, deletepathname, getURL }) {

  const classes = useStyles();
  const size = { width: "300px", height: "300px" }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('publishedDate');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [scroll, setScroll] = useState('paper');
  const [values, setValues] = useState({
    prototype: null,
    rows: []
  })

  const { prototype, rows } = values;

  useEffect(function () {
    axios({
      method: 'GET',
      url: `${getURL}`,
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    }).then(response => {

      setValues({
        ...values, prototype: response.data.prototype, rows: response.data[`${name.toLowerCase()}s`]
      })

    }).catch(error => {
      console.log('Error loading articles', error.response.data);
      error.response.data.errors.forEach((error) => {
        toast.error(error.message)
      })
    })
  }, [open])

  const handleRequestSort = (event, property) => {
    const isAsc = (orderBy === property && order === 'asc');
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => { return { title: n.title, id: n.id } });
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, { title, id }) => {
    const selectedTitles = selected.map(selectedItem => { return selectedItem.title })
    const selectedIndex = selectedTitles.indexOf(title);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, { title, id });
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  const selectedTitles = selected.map(selectedItem => { return selectedItem.title })
  const isSelected = (title) => selectedTitles.indexOf(title) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const rowsToMap = stableSort(rows, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  if (prototype != null) {
    return (
      <div className={classes.root}>
        {open && <FullScreenDialog
          name={name}
          open={open}
          prototype={prototype}
          title={rows.length - 1}
          getURL={getURL}
          handleClose={handleClose}
          handleCreateRow={handleCreateRow}
        />}
        <Paper className={classes.paper}>
          <EnhancedTableToolbar setOpen={setOpen} open={open} name={`Manage ${name}`} numSelected={selected.length} selected={selected} deletepathname={deletepathname} />
          <div className="row">
            <div className="col-md-12">
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size='medium'
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    prototype={prototype}
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {rowsToMap.map((row, index) => {
                      const isItemSelected = isSelected(row.title);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, { title: row.title, id: row.id })}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.title}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </TableCell>
                          { createRow(row, prototype)}
                        </TableRow>
                      );
                    })}
                    {rowsToMap.length == 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell style={{ textAlign: "center", verticalAlign: "top" }} colSpan={6}>
                          <h1> No {name}s to display, please create one</h1>
                          <Button onClick={() => {
                            handleOpen()
                            setValues({ ...values, open: true })
                          }}
                            className="btn btn-primary" > Create {name.toLowerCase()}</Button>
                        </TableCell>
                      </TableRow>
                    )}
                    {rowsToMap.length > 0 && emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </Paper >
      </div >
    )
  }
  else {
    return (
      <div style={size} className={`loading loader`} >
        <div className="loader-wheel"></div>
        <div className="loader-text"></div>
      </div>
    );
  }
}

const createRow = (row, prototype) => {
  const form = [];
  getFieldsFromPrototype(prototype).map((q) => {

    if (q == "categories") {

      const categories = row[q].map(q => q.title);

      return form.push(<TableCell component="td" id={row.id} scope="row" padding="none">
        {toHumanString(categories)}
      </TableCell>
      )
    }

    if (q == "publishedDate" && q) {

      if (q != undefined) {
        var testDate = row[q].slice(0, 10);
      }

      return form.push(<TableCell component="td" id={row.id} scope="row" padding="none">
        {testDate}
      </TableCell>
      )
    }

    form.push(<TableCell component="td" id={row.id} scope="row" padding="none">
      {row[q]}
    </TableCell>
    )
  })

  return form;
}

EnhancedTable.propTypes = {
  title: PropTypes.string.isRequired,
  getURL: PropTypes.string.isRequired,
  deletepathname: PropTypes.string.isRequired
}