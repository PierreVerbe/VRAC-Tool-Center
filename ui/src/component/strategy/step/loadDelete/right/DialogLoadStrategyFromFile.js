import React from "react"
import { connect } from "react-redux"

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from "@material-ui/core/Button"

import { DropzoneArea } from 'material-ui-dropzone'

import ClearIcon from '@material-ui/icons/Clear'
import PublishIcon from '@material-ui/icons/Publish'

import { setStrategyLoaderActionCreator, insertStrategyActionCreator, setStrategyActionCreator, setOpenDialogStrategyActionCreator } from "../../../../../action/strategyAction"


const DialogLoadStrategyFromFile = ({ strategyLoader, setStrategyLoader, strategyCreator, setStrategy, insertStrategy, openDialogStrategy, setOpenDialogStrategy }) => {

    const handleCancel = () => {
        setOpenDialogStrategy(false)
    }

    const handleSubmit = () => {
        setOpenDialogStrategy(false)
    }

    const LoadJsonFile = (files) => {
        let updatedStrategyLoader = strategyLoader

        files.forEach(file => {
            let fileReader = new FileReader()

            fileReader.onload = function (progressEvent) {
                const stringData = progressEvent.target.result
                const obj = JSON.parse(stringData)

                if (file.path === "strategy.json") {
                    updatedStrategyLoader = { ...updatedStrategyLoader, strategy: obj }
                    setStrategyLoader(updatedStrategyLoader)
                }
                else {
                    const metaActions = updatedStrategyLoader.metaActions === undefined ? [] : updatedStrategyLoader.metaActions
                    const updatedMetaActions = metaActions.concat([obj])
                    updatedStrategyLoader = { ...updatedStrategyLoader, metaActions: updatedMetaActions }
                    setStrategyLoader(updatedStrategyLoader)
                }

            }
            fileReader.readAsText(file, "UTF-8")
        })
    }

    return (
        <Dialog open={openDialogStrategy} onClose={handleCancel}>
            <DialogTitle>Load VRAC strategy from files</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To load strategy, please drag and drop files.
                </DialogContentText>

                <DropzoneArea onChange={LoadJsonFile.bind(this)} showAlerts={false} />

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
    strategyLoader: state.strategyLoader,
    openDialogStrategy: state.openDialogStrategy
})

const mapDispatchToProps = dispatch => ({
    setStrategyLoader: strategyLoader => dispatch(setStrategyLoaderActionCreator(strategyLoader)),
    setOpenDialogStrategy: openDialogStrategy => dispatch(setOpenDialogStrategyActionCreator(openDialogStrategy))
})

export default connect(mapStateToProps, mapDispatchToProps)(DialogLoadStrategyFromFile)
