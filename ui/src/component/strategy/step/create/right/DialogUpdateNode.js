import React from "react"
import { connect } from "react-redux"

import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from "@material-ui/core/Button"

import ClearIcon from '@material-ui/icons/Clear'
import PublishIcon from '@material-ui/icons/Publish'

import { insertMonitoringActionCreator, setMonitoringActionCreator, setOpenDialogMonitoringActionCreator } from "../../../../../action/monitoringAction"

const DialogUpdateNode = ( { openDialogMonitoring, monitoring, setMonitoring, insertMonitoring, setOpenDialogMonitoring }) => {
    const handleCancel = () => {
        setOpenDialogMonitoring(false)
    }

    const handleSubmit = () => {
        insertMonitoring(monitoring)
        setOpenDialogMonitoring(false)
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
        <Dialog open={openDialogMonitoring} onClose={handleCancel}>
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
                    defaultValue={monitoring.name}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    onChange={onTextDescriptionChange}
                    id="description"
                    label="Description"
                    defaultValue={monitoring.description}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    onChange={onTextVersionChange}
                    id="version"
                    label="Version"
                    defaultValue={monitoring.version}
                    fullWidth
                    variant="standard"
                />
            </DialogContent>

            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCancel}
                    startIcon={<ClearIcon />}
                    //className={classes.button}
                    style={{ backgroundColor: "orange" }}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    // className={classes.button}
                    startIcon={<PublishIcon />}
                    style={{ backgroundColor: "green" }}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

DialogUpdateNode.propTypes = {
    openDialogMonitoring: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    monitoring: state.monitoring,
  
})

const mapDispatchToProps = dispatch => ({
    insertMonitoring: monitoringToInsert => dispatch(insertMonitoringActionCreator(monitoringToInsert)),
    setMonitoring: monitoring => dispatch(setMonitoringActionCreator(monitoring)),
  
})

export default connect(mapStateToProps, mapDispatchToProps)(DialogUpdateNode)
