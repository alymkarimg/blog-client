import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
        maxWidth: 250,
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

export default function MultipleSelect({ title, menuitems, value, onChange = null }) {
    const classes = useStyles();
    const theme = useTheme();
    const [values, setValues] = React.useState({ content: menuitems, selected: value});

    let { content, selected } = values;

    const handleChange = (e) => {
        const {
            target: { value },
          } = e;
          setValues({...values, selected: value})
    }

    return (
        <React.Fragment>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-checkbox-label">{title}</InputLabel>
                <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={selected}
                    onChange={(e) => {
                        onChange ? onChange() : handleChange(e)
                    }}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
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

