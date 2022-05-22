import React from "react"
import { connect } from "react-redux"

import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Button from "@material-ui/core/Button"
import { DropzoneArea } from "material-ui-dropzone"
import ClearIcon from "@material-ui/icons/Clear"
import PublishIcon from "@material-ui/icons/Publish"

import { useStyles } from "./../../../../Style"

import { setStrategyLoaderActionCreator, setFileUploadedActionCreator, setOpenDialogStrategyActionCreator } from "../../../../../action/strategyAction"

const DialogLoadStrategyFromFile = ({ fileUploaded, setFileUploaded, strategyLoader, setStrategyLoader, openDialogStrategy, setOpenDialogStrategy }) => {
    const classes = useStyles()
    
    const handleCancel = (event) => {
        setOpenDialogStrategy(false)

        //event.preventDefault()
    }

    const handleSubmit = () => {
        setOpenDialogStrategy(false)
    }

    const LoadJsonFile = (files) => {
        let updatedStrategyLoader = strategyLoader
        let updatedFileUploaded = fileUploaded

        files.forEach(file => {
            const fileName = file.path.replace(".json", "")
            let fileReader = new FileReader()

            fileReader.onload = function (progressEvent) {
                const stringData = progressEvent.target.result
                const obj = JSON.parse(stringData)

                if (fileName === "strategy") {
                    if (updatedStrategyLoader.strategy === undefined) {
                        updatedFileUploaded.push(file)

                        updatedStrategyLoader = { ...updatedStrategyLoader, strategy: obj }

                        setFileUploaded(updatedFileUploaded)
                        setStrategyLoader(updatedStrategyLoader)
                    }
                }
                else {
                    if (updatedStrategyLoader.metaActions === undefined || !updatedStrategyLoader.metaActions.some(metaAction => metaAction.name === fileName)) {
                        updatedFileUploaded.push(file)

                        const metaActions = updatedStrategyLoader.metaActions === undefined ? [] : updatedStrategyLoader.metaActions
                        const updatedMetaActions = metaActions.concat([obj])
                        updatedStrategyLoader = { ...updatedStrategyLoader, metaActions: updatedMetaActions }

                        setFileUploaded(updatedFileUploaded)
                        setStrategyLoader(updatedStrategyLoader)
                    }
                }
            }
            fileReader.readAsText(file, "UTF-8")
        })
    }

    const DeleteJsonFile = (file) => {
        let updatedStrategyLoader = strategyLoader
        let updatedFileUploaded = fileUploaded

        const fileName = file.path.replace(".json", "")

        if (fileName === "strategy") {
            const { strategy, ...EndStrategyLoader } = updatedStrategyLoader
            updatedStrategyLoader = EndStrategyLoader

            setStrategyLoader(updatedStrategyLoader)
            setFileUploaded(updatedFileUploaded.filter(item => item.path !== "strategy.json"))
        }
        else {
            updatedFileUploaded = updatedFileUploaded.filter(item => item.path !== file.path)

            const updatedMetaActions = updatedStrategyLoader.metaActions.filter(metaAction => metaAction.name !== fileName)
            if (updatedMetaActions.length === 0) {
                const { metaActions, ...EndStrategyLoader } = updatedStrategyLoader
                updatedStrategyLoader = EndStrategyLoader
            }
            else updatedStrategyLoader = { ...updatedStrategyLoader, metaActions: updatedMetaActions }

            setFileUploaded(updatedFileUploaded)
            setStrategyLoader(updatedStrategyLoader)
        }
    }

    return (
        <Dialog open={openDialogStrategy} onClose={(event) => handleCancel(event)}>
            <DialogTitle>Load VRAC strategy from files</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To load strategy, please drag and drop files.
                </DialogContentText>

                <DropzoneArea  useChipsForPreview initialFiles={fileUploaded} onChange={LoadJsonFile.bind(this)} onDelete={DeleteJsonFile.bind(this)} showAlerts={false} />

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
    strategyLoader: state.strategyLoader,
    openDialogStrategy: state.openDialogStrategy,
    fileUploaded: state.fileUploaded
})

const mapDispatchToProps = dispatch => ({
    setStrategyLoader: strategyLoader => dispatch(setStrategyLoaderActionCreator(strategyLoader)),
    setOpenDialogStrategy: openDialogStrategy => dispatch(setOpenDialogStrategyActionCreator(openDialogStrategy)),
    setFileUploaded: fileUploaded => dispatch(setFileUploadedActionCreator(fileUploaded))
})

export default connect(mapStateToProps, mapDispatchToProps)(DialogLoadStrategyFromFile)
