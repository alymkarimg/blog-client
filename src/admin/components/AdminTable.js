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

export default function EnhancedTable({ title, deletepathname, getURL }) {

  const classes = useStyles();
  const size = { width: "300px", height: "300px" }

  const handleCreateRow = () => {

    if (prototype.hasOwnProperty('slug')) {
      prototype.slug = prototype.title.toLowerCase();
    }

    // save row to db
    axios({
      method: 'POST',
      url: `${getURL}/create`,
      data: prototype,
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    }).then(response => {
      console.log('Article Successfully created', response)
      toast.success(response.data.message)
      // redirect to account
    }).catch(error => {
      console.log('Error saving blog article', error.response.data);
      error.response.data.errors.forEach((error) => {
        toast.error(error.message)
      })
    })
  };

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [scroll, setScroll] = useState('paper');
  const [values, setValues] = useState({
    rows: [],
    prototype: null
  })

  const { rows, prototype } = values;

  useEffect(function () {
    axios({
      method: 'GET',
      url: getURL,
    }).then(response => {

      setValues({
        ...values, prototype: response.data.prototype
      })

    }).catch(error => {
      console.log('Error loading blog articles', error.response.data);
      error.response.data.errors.forEach((error) => {
        toast.error(error.message)
      })
    })
}, [])

const handleRequestSort = (event, property) => {
  const isAsc = orderBy === property && order === 'asc';
  setOrder(isAsc ? 'desc' : 'asc');
  setOrderBy(property);
};

const handleSelectAllClick = (event) => {
  if (event.target.checked) {
    const newSelecteds = rows.map((n) => { return { name: n.name, id: n.id } });
    setSelected(newSelecteds);
    return;
  }
  setSelected([]);
};

const handleClick = (event, { name, id }) => {
  const selectedNames = selected.map(selectedItem => { return selectedItem.name })
  const selectedIndex = selectedNames.indexOf(name);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, { name, id });
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

const selectedNames = selected.map(selectedItem => { return selectedItem.name })
const isSelected = (name) => selectedNames.indexOf(name) !== -1;

const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

const rowsToMap = stableSort(rows, getComparator(order, orderBy))
  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

if (prototype != null) {
  return (
    <div className={classes.root}>
      {open && <FullScreenDialog
        open={open}
        prototype={prototype}
        getURL={getURL}
        handleClose={handleClose}
        handleCreateRow={handleCreateRow}
      />}
      <Paper className={classes.paper}>
        <EnhancedTableToolbar setOpen={setOpen} open={open} title={title} numSelected={selected.length} selected={selected} deletepathname={deletepathname} />
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
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, { name: row.name, id: row.id })}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                        <TableCell align="right"><Link to={`/admin/blog/edit/${row.title}/${row.id}`}>Edit</Link></TableCell>
                      </TableRow>
                    );
                  })}
                  {rowsToMap.length == 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell style={{ textAlign: "center", verticalAlign: "top" }} colSpan={6}>
                        <h1> No blogs to display, please create one</h1>
                        <Button onClick={() => {
                          handleOpen()
                          setValues({ ...values, open: true })
                        }}
                          className="btn btn-primary" > Create blog</Button>
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

EnhancedTable.propTypes = {
  title: PropTypes.string.isRequired,
  getURL: PropTypes.string.isRequired,
  deletepathname: PropTypes.string.isRequired
}