import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { GlobalContext } from "../../contexts/GlobalContext";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "0px 5px 0 0px",
    minWidth: 150,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
};

function getStyles(name, content, theme) {
  return {
    fontWeight:
      content.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({
  title,
  menuitems = [],
  value,
  onChange = null,
  loadMenuItems = null,
}) {
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const [values, setValues] = React.useState({
    content: [],
    selected: [],
  });


  useEffect(() => {
    setValues({ ...values, selected: value });
  }, [value]);

  
  let globalContext = useContext(GlobalContext);
  useEffect(() => {
    if (loadMenuItems) {
      let { categories } = globalContext;
      if (categories && categories.length > 0) {
        function fetchData() {
          // You can await here
          let items;
          if (loadMenuItems) {
            items = categories
              .filter((q) => q.type === loadMenuItems)
              .map((q) => q.slug);
            if (items) {
              setValues({ ...values, content: [...items] });
            }
          }
        }
        fetchData();
      }
    }
  }, [globalContext]);

  useEffect(() => {
    if(menuitems && menuitems.length > 0){
      setValues({ ...values, content: [...menuitems].filter((v, i, a) => a.indexOf(v) === i)});
    }
  }, [menuitems])

  let { content, selected } = values;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setValues({ ...values, selected: [...value] });

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <React.Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">{title}</InputLabel>
        {content && (
          <Select
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple
            value={selected}
            onChange={(event) => {
              handleChange(event);
            }}
            input={<Input />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {content &&
              content.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, content, theme)}
                >
                  {name}
                </MenuItem>
              ))}
          </Select>
        )}
      </FormControl>
    </React.Fragment>
  );
}
