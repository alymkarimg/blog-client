import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { render } from 'react-dom';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect({ title, menuitems, nonefirst = false, nonelast = false }) {
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
    <InputLabel id="demo-simple-select-outlined-label">{title}</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id={`select_${title}`}
                    value={age}
                    onChange={handleChange}
                    label={title}
                >
                    {
                        nonefirst &&
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                    }
                    }
                    {
                        menuitems.length > 0 && (
                            menuitems.map(item => {
                                return <MenuItem value={item}>{item}</MenuItem>
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