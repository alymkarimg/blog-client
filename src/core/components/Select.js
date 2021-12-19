import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: "10px 0 0 0",
        minWidth: 144,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect({ title, menuitems, nonefirst = false, nonelast = false, sort = null }) {
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

    const classes = useStyles();
    const [values, setValues] = useState({
        sortBy: sort
    });

    const { sortBy } = values

    const handleChange = (event) => {
        setValues({ ...values, sortBy: event.target.value });
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">{title}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id={`select_${title}`}
                    value={sortBy || ""}
                    MenuProps={MenuProps}
                    onChange={handleChange}
                    label={title}
                >
                    {
                        nonefirst &&
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                    }
                    {
                        menuitems.length > 0 && (
                            menuitems.map((item, i) => {
                                return <MenuItem value={item || ""} key={`menuitem${i}`}>{item}</MenuItem>
                            })
                        )
                    }
                    {
                        nonelast &&
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                    }
                </Select>
            </FormControl>
        </div>
    )
}