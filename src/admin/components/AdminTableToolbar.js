import React, { useState, useEffect } from "react";
import { getCookie } from "../../helpers/Default";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import "../../assets/css/Style.css";

const EnhancedTableToolbar = ({
  setOpen,
  setRow,
  numSelected,
  name,
  deletepathname,
  editpathname,
  selected
}) => {
  const useToolbarStyles = makeStyles((theme) => ({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      fontFamily: "Lobster, sans-serif",
      flex: "1 1 100%",
      fontSize: "2em",
    },
  }));

  const classes = useToolbarStyles();

  const handleDeleteToggle = (event, selected, deletepathname) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/${deletepathname}`,
      data: { selected },
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((response) => {
        console.log("Items successfully deleted", response);
        toast.success(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error deleting items", error.response.data);
        error.response.data.errors.forEach((error) => {
          toast.error(error.message);
        });
      });
  };

  const handleEditToggle = (event, selected, editpathname) => {
    event.preventDefault();

    // open the dialog, set the row selected
    setRow(selected)
    setOpen(true);

  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {`${name}`}
        </Typography>
      )}
      {numSelected == 0 && (
        <Tooltip title="Add">
          <IconButton
            onClick={(e) => {
                setRow();
              setOpen(true);
            }}
            aria-label={`Add ${name}`}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}

      {numSelected > 0 ? (
        <React.Fragment>
          <Tooltip title="Delete">
            <IconButton
              onClick={(e) => {
                handleDeleteToggle(e, selected, deletepathname);
              }}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          {numSelected < 2 && (
            <Tooltip  title="Edit">
            <IconButton
              onClick={(e) => {
                handleEditToggle(e, selected, editpathname);
              }}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>   
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
        </React.Fragment>
        // <Tooltip title="Filter list">
        //   <IconButton aria-label="filter list">
        //     <FilterListIcon />
        //   </IconButton>
        // </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default EnhancedTableToolbar;
