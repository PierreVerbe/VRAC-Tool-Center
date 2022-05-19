import React from "react"
import { connect } from "react-redux"

import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"

import SaveIcon from "@material-ui/icons/Save"
import DeleteIcon from "@material-ui/icons/Delete"
import GetAppIcon from "@material-ui/icons/GetApp"
import ClearIcon from "@material-ui/icons/Clear"

import DropzoneOrReactJson from "./DropzoneOrReactJson"
import DialogSaveMonitoring from "./DialogSaveMonitoring"
import { insertMonitoringActionCreator, deleteMonitoringActionCreator, setIdRowMonitoringTableActionCreator, setMonitoringActionCreator, setOpenDialogMonitoringActionCreator } from "../../../../../action/monitoringAction"

import "./../LoadDelete.css"

const SelectedMonitoring = ({ deleteMonitoring, idRowMonitoringTable, monitoring, setIdRowMonitoringTable, setMonitoring, setOpenDialogMonitoring }) => {
    // Is button disabled
    const isSaveButtonDisabled = () => {
        return (idRowMonitoringTable !== null && idRowMonitoringTable !== -1) || Object.entries(monitoring).length === 0
    }

    const isDeleteButtonDisabled = () => {
        return (idRowMonitoringTable === null || idRowMonitoringTable === -1) || Object.entries(monitoring).length === 0
    }

    const isExportButtonDisabled = () => {
        return Object.entries(monitoring).length === 0
    }

    const isClearButtonDisabled = () => {
        return Object.entries(monitoring).length === 0
    }

    // OnClick function for button
    const handleSave = (event) => {
        setOpenDialogMonitoring(true)
        //event.preventDefault()
    }

    const handleDelete = (event) => {
        if (idRowMonitoringTable !== -1) {
            const body = { id: idRowMonitoringTable }
            deleteMonitoring(body)
            setIdRowMonitoringTable(null)
            setMonitoring({})
        }

        //event.preventDefault()
    }

    const handleExport = async (event) => {
        const fileName = monitoring.name ? monitoring.name : "exported_file"
        const json = JSON.stringify(monitoring)
        const blob = new Blob([json], { type: "application/json" })
        const href = await URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = href
        link.download = fileName + ".json"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        //event.preventDefault()
    }

    const handleClear = (event) => {
        setIdRowMonitoringTable(null)
        setMonitoring({})

        //event.preventDefault()
    }

    return (
        <div>
            <Box id="topButtonGroupMonitoring" display="flex" flexDirection="row">
                <Box className="buttonMonitoring">
                    <Button
                        className="buttonMonitoring"
                        variant="contained"
                        color="primary"
                        onClick={(event) => handleSave(event)}
                        startIcon={<SaveIcon />}
                        style={{ backgroundColor: "green" }}
                        disabled={isSaveButtonDisabled()}
                    >
                        Save
                    </Button>
                </Box>

                <DialogSaveMonitoring />

                <Box className="buttonMonitoring">
                    <Button
                        className="buttonMonitoring"
                        variant="contained"
                        color="primary"
                        onClick={(event) => handleDelete(event)}
                        startIcon={<DeleteIcon />}
                        style={{ backgroundColor: "red" }}
                        disabled={isDeleteButtonDisabled()}
                    >
                        Delete
                    </Button>
                </Box>

                <Box className="buttonMonitoring">
                    <Button
                        className="buttonMonitoring"
                        variant="contained"
                        color="primary"
                        onClick={(event) => handleExport(event)}
                        startIcon={<GetAppIcon />}
                        style={{ backgroundColor: "blue" }}
                        disabled={isExportButtonDisabled()}
                    >
                        Export
                    </Button>
                </Box>
            </Box>

            <DropzoneOrReactJson id="truc" isSelected={idRowMonitoringTable !== null} monitoring={monitoring} setIdRowMonitoringTable={setIdRowMonitoringTable} setMonitoring={setMonitoring} />

            <div id="bottomButtonGroupMonitoring">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => handleClear(event)}
                    startIcon={<ClearIcon />}
                    disabled={isClearButtonDisabled()}
                    style={{ backgroundColor: "orange" }}
                >
                    Clear
                </Button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    idRowMonitoringTable: state.idRowMonitoringTable,
    monitoring: state.monitoring
})

const mapDispatchToProps = dispatch => ({
    setIdRowMonitoringTable: idRowMonitoringTable => dispatch(setIdRowMonitoringTableActionCreator(idRowMonitoringTable)),
    insertMonitoring: monitoringToInsert => dispatch(insertMonitoringActionCreator(monitoringToInsert)),
    deleteMonitoring: monitoringToDelete => dispatch(deleteMonitoringActionCreator(monitoringToDelete)),
    setMonitoring: monitoring => dispatch(setMonitoringActionCreator(monitoring)),
    setOpenDialogMonitoring: openDialogMonitoring => dispatch(setOpenDialogMonitoringActionCreator(openDialogMonitoring))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectedMonitoring)
