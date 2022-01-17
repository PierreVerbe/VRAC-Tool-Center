import React from "react"

import Select from "@material-ui/core/Select";


import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

export const HomingAction = () => {

    const [state, setState] = React.useState({
        Forward: false,
        Axis: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

    return (
        <div>
            <FormGroup>
                <FormControlLabel
                control={<Switch checked={state.Forward} onChange={handleChange} color="primary" name="Forward" />}
                label="Enable forward"
                />
                <FormControlLabel
                control={<Switch checked={state.Axis} onChange={handleChange} color="primary" name="Axis" />}
                label="Enable axis"
                />
            </FormGroup> 

            <TextField id="standard-basic" label="New value" />

            <Typography >TODO transition</Typography >
        </div>
    )
}

export default HomingAction
