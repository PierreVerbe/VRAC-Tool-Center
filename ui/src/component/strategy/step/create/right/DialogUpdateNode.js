import Button from "@material-ui/core/Button"
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import ClearIcon from '@material-ui/icons/Clear'
import PublishIcon from '@material-ui/icons/Publish'
import React from "react"
import { connect } from "react-redux"
import { setFlowStrategyActionCreator, setOpenDialogNodeStrategyActionCreator } from "../../../../../action/strategyAction"




/*
Remove node and edge
const onElementsRemove = (elementsToRemove) =>
setFlowStrategy((els) => removeElements(elementsToRemove, els))
*/

const DialogUpdateNode = ({ openDialogNodeStrategy, flowStrategy, setOpenDialogNodeStrategy, setFlowStrategy }) => {
    const handleCancel = () => {
        setOpenDialogNodeStrategy({ open: false, node: {} })
    }

    const handleSubmit = () => {
        setOpenDialogNodeStrategy({ open: false, node: {} })
    }

    // Text field in dialog
    const onTextNameChange = (name) => {
        //const monitoringUpdated = { ...monitoring, name: name.target.value }
        //setMonitoring(monitoringUpdated)
    }

    const onTextDescriptionChange = (description) => {
        //const monitoringUpdated = { ...monitoring, description: description.target.value }
        //setMonitoring(monitoringUpdated)
    }

    const onTextVersionChange = (version) => {
        //const monitoringUpdated = { ...monitoring, version: version.target.value }
        //setMonitoring(monitoringUpdated)
    }

    return (
        <Dialog open={openDialogNodeStrategy.open} onClose={handleCancel}>
            <DialogTitle>Update Node id</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To save node, please enter the fields below.
                </DialogContentText>

                <TextField
                    autoFocus
                    margin="dense"
                    onChange={onTextNameChange}
                    id="name"
                    label="Name"
                    defaultValue={openDialogNodeStrategy.node.id}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    onChange={onTextDescriptionChange}
                    id="description"
                    label="Description"
                    defaultValue={openDialogNodeStrategy.node.id}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    onChange={onTextVersionChange}
                    id="version"
                    label="Version"
                    defaultValue={openDialogNodeStrategy.node.id}
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

const mapStateToProps = state => ({
    openDialogNodeStrategy: state.openDialogNodeStrategy,
    flowStrategy: state.flowStrategy
})

const mapDispatchToProps = dispatch => ({
    setOpenDialogNodeStrategy: openDialogNodeStrategy => dispatch(setOpenDialogNodeStrategyActionCreator(openDialogNodeStrategy)),
    setFlowStrategy: flowStrategy => dispatch(setFlowStrategyActionCreator(flowStrategy))
})

export default connect(mapStateToProps, mapDispatchToProps)(DialogUpdateNode)
