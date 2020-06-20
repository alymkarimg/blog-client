import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
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
    }
};

function getStyles(name, content, theme) {
    return {
        fontWeight:
            content.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect({ title, menuitems }) {
    const classes = useStyles();
    const theme = useTheme();
    const [values, setValues] = React.useState({ content: menuitems, selected: [] });

    let { content, selected } = values;

    const handleChange = (event) => {
        setValues({ ...values, selected: event.target.value });
    };

    return (
        <React.Fragment>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">{title}</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={selected}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={ select => (
                        <div className={classes.chips}>
                            {select.map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}>
                    {content.map((name) => (
                        <MenuItem key={name} value={name} style={getStyles(name, content, theme)}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </React.Fragment>
    )
}