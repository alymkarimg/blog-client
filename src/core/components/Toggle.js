import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { ToggleButton } from 'react-bootstrap';

const Toggle = ({label, name, color, onToggle, labelPlacement="right"}) => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });



  return (
    <FormGroup row>
      {/* <FormControlLabel
        control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
        label="Secondary"
      /> */}
      <FormControlLabel
        control={
          <Switch
            checked={state.checkedB}
            onChange={onToggle}
            name={name}
            color={color}
            labelPlacement={labelPlacement}
          />
        }
        label={label}
      />
      {/* <FormControlLabel control={<Switch />} label="Uncontrolled" />
      <FormControlLabel disabled control={<Switch />} label="Disabled" />
      <FormControlLabel disabled control={<Switch checked />} label="Disabled" /> */}
    </FormGroup>
  );
}

export default Toggle