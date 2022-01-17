import React from "react"

import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

export const LineAction = () => {
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
            </FormGroup> 

            <TextField id="standard-basic" label="Dist" />
            <TextField id="standard-basic" label="Speed" />
            <TextField id="standard-basic" label="Accel" />

            <Typography >TODO transition</Typography >
        </div>
        
    )
}

export default LineAction
