import React from "react"
import { connect } from "react-redux"
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ActionFactory from '../../../../../general/actionFactory/ActionFactory'

import MenuItem from "@material-ui/core/MenuItem";
import MetaActionGraph from "./MetaActionGraph";
import { setMetaActionArrayActionCreator, setOpenDialogMetaActionActionCreator } from "../../../../../../action/strategyAction"

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },

    actionFactoryPaper: {
        display: 'flex',
        '& > *': {

            padding: theme.spacing(3),


        },
    }
}));

const MetaActionDialog = ({ open, metaActionArray, setMetaActionArray, setOpenDialogMetaAction }) => {
    const classes = useStyles();

    const handleClose = () => {
        const updatedMetaAction = metaActionArray.map(metaAction => ({ ...metaAction, isSelected: false }))

        setMetaActionArray(updatedMetaAction)
        setOpenDialogMetaAction(false);
    };

    const handleSubmit = () => {
        // TODO

        handleClose()
    }
    const selectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)
    const getSelectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)[0]
    
    const onTextNameChange = (name) => {
        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ? { ...metaAction, name: name.target.value } : metaAction));
        setMetaActionArray(updatedMetaActionArray)
    }

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [age, setAge] = React.useState("");

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Dialog edit meta action</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill in the form and the graph.
                    </DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        onChange={onTextNameChange}
                        id="name"
                        label="Name"
                        defaultValue={selectedMetaAction.length === 0 ? "Undefined" : getSelectedMetaAction.name}
                        fullWidth
                        variant="standard"
                    />

                    <MetaActionGraph />

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Action Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={handleChange}
                        >
                            <MenuItem value={"Homing"}>Homing</MenuItem>
                            <MenuItem value={"Line"}>Line</MenuItem>
                            <MenuItem value={"Top arm get storage"}>Top arm get storage</MenuItem>
                            <MenuItem value={"XYT"}>XYT</MenuItem>
                            <MenuItem value={"End"}>End</MenuItem>
                        </Select>

                        {console.log(age)}

                        <Paper variant="outlined" className={classes.actionFactoryPaper}>
                            <ActionFactory action={age} />
                        </Paper>


                    </FormControl>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

ActionFactory.propTypes = {
    open: PropTypes.bool
};


const mapStateToProps = state => ({
    metaActionArray: state.metaActionArray
})

const mapDispatchToProps = dispatch => ({
    setMetaActionArray: metaActionArray => dispatch(setMetaActionArrayActionCreator(metaActionArray)),
    setOpenDialogMetaAction: openDialogMetaAction => dispatch(setOpenDialogMetaActionActionCreator(openDialogMetaAction))
})

export default connect(mapStateToProps, mapDispatchToProps)(MetaActionDialog)
