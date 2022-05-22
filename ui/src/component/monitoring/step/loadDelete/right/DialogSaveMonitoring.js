import React from "react"
import { connect } from "react-redux"

import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Button from "@material-ui/core/Button"
import ClearIcon from "@material-ui/icons/Clear"
import PublishIcon from "@material-ui/icons/Publish"

import { useStyles } from "./../../../../Style"

import { insertMonitoringActionCreator, setMonitoringActionCreator, setOpenDialogMonitoringActionCreator } from "../../../../../action/monitoringAction"

const DialogSaveMonitoring = ({ monitoring, setMonitoring, insertMonitoring, openDialogMonitoring, setOpenDialogMonitoring }) => {
    const classes = useStyles()
    
    const handleCancel = (event) => {
        setOpenDialogMonitoring(false)

        //event.preventDefault()
    }

    const handleSubmit = (event) => {
        insertMonitoring(monitoring)
        setOpenDialogMonitoring(false)
        
        //event.preventDefault()
    }

    // Text field in dialog
    const onTextNameChange = (name) => {
        const monitoringUpdated = { ...monitoring, name: name.target.value }
        setMonitoring(monitoringUpdated)
    }

    const onTextDescriptionChange = (description) => {
        const monitoringUpdated = { ...monitoring, description: description.target.value }
        setMonitoring(monitoringUpdated)
    }

    const onTextVersionChange = (version) => {
        const monitoringUpdated = { ...monitoring, version: version.target.value }
        setMonitoring(monitoringUpdated)
    }

    return (
        <Dialog open={openDialogMonitoring} onClose={(event) => handleCancel(event)}>
            <DialogTitle>Save VRAC monitoring</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To save monitoring, please enter the fields below.
                </DialogContentText>

                <TextField
                    autoFocus
                    margin="dense"
                    onChange={onTextNameChange}
                    id="name"
                    label="Name"
                    value={monitoring.name}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    onChange={onTextDescriptionChange}
                    id="description"
                    label="Description"
                    value={monitoring.description}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    onChange={onTextVersionChange}
                    id="version"
                    label="Version"
                    value={monitoring.version}
                    fullWidth
                    variant="standard"
                />
            </DialogContent>

            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.commonButton}
                    onClick={(event) => handleCancel(event)}
                    startIcon={<ClearIcon />}
                    style={{ backgroundColor: "orange" }}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.commonButton}
                    onClick={(event) => handleSubmit(event)}
                    startIcon={<PublishIcon />}
                    style={{ backgroundColor: "green" }}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = state => ({
    monitoring: state.monitoring,
    openDialogMonitoring: state.openDialogMonitoring
})

const mapDispatchToProps = dispatch => ({
    insertMonitoring: monitoringToInsert => dispatch(insertMonitoringActionCreator(monitoringToInsert)),
    setMonitoring: monitoring => dispatch(setMonitoringActionCreator(monitoring)),
    setOpenDialogMonitoring: openDialogMonitoring => dispatch(setOpenDialogMonitoringActionCreator(openDialogMonitoring))
})

export default connect(mapStateToProps, mapDispatchToProps)(DialogSaveMonitoring)
