import React from "react"
import { connect } from "react-redux"

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from "@material-ui/core/Button"

import ClearIcon from '@material-ui/icons/Clear'
import PublishIcon from '@material-ui/icons/Publish'

import { insertStrategyActionCreator, setStrategyActionCreator, setOpenDialogStrategyActionCreator } from "../../../../../action/strategyAction"

const DialogSaveStrategy = ({ strategy, setStrategy, insertStrategy, openDialogStrategy, setOpenDialogStrategy }) => {
    const handleCancel = () => {
        setOpenDialogStrategy(false)
    }

    const handleSubmit = () => {
        insertStrategy(strategy)
        setOpenDialogStrategy(false)
    }

    // Text field in dialog
    const onTextNameChange = (name) => {
        const strategyUpdated = { ...strategy, name: name.target.value }
        setStrategy(strategyUpdated)
    }

    const onTextDescriptionChange = (description) => {
        const strategyUpdated = { ...strategy, description: description.target.value }
        setStrategy(strategyUpdated)
    }

    const onTextSenderChange = (sender) => {
        const strategyUpdated = { ...strategy, sender: sender.target.value }
        setStrategy(strategyUpdated)
    }

    const onTextVersionChange = (version) => {
        const strategyUpdated = { ...strategy, version: version.target.value }
        setStrategy(strategyUpdated)
    }

    return (
        <Dialog open={openDialogStrategy} onClose={handleCancel}>
            <DialogTitle>Save VRAC strategy</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To save strategy, please enter the fields below.
                </DialogContentText>

                <TextField
                    autoFocus
                    margin="dense"
                    onChange={onTextNameChange}
                    id="name"
                    label="Name"
                    defaultValue={strategy.name}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    onChange={onTextDescriptionChange}
                    id="description"
                    label="Description"
                    defaultValue={strategy.description}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    onChange={onTextSenderChange}
                    id="sender"
                    label="Sender"
                    defaultValue={strategy.sender}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    onChange={onTextVersionChange}
                    id="version"
                    label="Version"
                    defaultValue={strategy.version}
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
    strategy: state.strategy,
    openDialogStrategy: state.openDialogStrategy
})

const mapDispatchToProps = dispatch => ({
    insertStrategy: strategyToInsert => dispatch(insertStrategyActionCreator(strategyToInsert)),
    setStrategy: strategy => dispatch(setStrategyActionCreator(strategy)),
    setOpenDialogStrategy: openDialogStrategy => dispatch(setOpenDialogStrategyActionCreator(openDialogStrategy))
})

export default connect(mapStateToProps, mapDispatchToProps)(DialogSaveStrategy)
