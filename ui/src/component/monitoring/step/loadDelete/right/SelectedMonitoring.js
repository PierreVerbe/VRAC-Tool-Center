import React from "react"
import { connect } from "react-redux"

import Button from "@material-ui/core/Button"

//import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import GetAppIcon from '@material-ui/icons/GetApp'
import ClearIcon from '@material-ui/icons/Clear'

import DropzoneOrReactJson from "./DropzoneOrReactJson"
import DialogSaveMonitoring from "./DialogSaveMonitoring"
import { insertMonitoringActionCreator, deleteMonitoringActionCreator, setIdRowMonitoringTableActionCreator, setMonitoringActionCreator, setOpenDialogMonitoringActionCreator } from "../../../../../action/monitoringAction"

/*
const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 500,
    },
  })
*/

const SelectedMonitoring = ({deleteMonitoring, idRowMonitoringTable, monitoring, setIdRowMonitoringTable, setMonitoring, setOpenDialogMonitoring}) => {
    //const classes = useStyles()

    // Is button disabled
    const isSaveButtonDisabled = () => {
        return (idRowMonitoringTable !== null && idRowMonitoringTable !== -1)  || Object.entries(monitoring).length === 0
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
    const handleSave = () => {
        setOpenDialogMonitoring(true)
    }

    const handleDelete = () => {
        if (idRowMonitoringTable !== -1) {
            const body = {id: idRowMonitoringTable}
            deleteMonitoring(body)
            setIdRowMonitoringTable(null)
            setMonitoring({})
        }
    }
    
    const handleExport = async () => {
        const fileName = monitoring.name ? monitoring.name : "exported_file"
        const json = JSON.stringify(monitoring)
        const blob = new Blob([json], {type:'application/json'})
        const href = await URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = href
        link.download = fileName + ".json"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
    
    const handleClear = () => {
        setIdRowMonitoringTable(null)
        setMonitoring({})
    }

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                //className={classes.button}
                startIcon={<SaveIcon />}
                style={{backgroundColor: "green"}}
                disabled={isSaveButtonDisabled()}
            >
                Save
            </Button>

            <DialogSaveMonitoring/>

            <Button
                variant="contained"
                color="primary"
                onClick={handleDelete}
                //className={classes.button}
                startIcon={<DeleteIcon />}
                style={{backgroundColor: "red"}}
                disabled={isDeleteButtonDisabled()}
            >
                Delete
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={handleExport}

                startIcon={<GetAppIcon />}
                //className={classes.button}
                style={{backgroundColor: "blue"}}
                disabled={isExportButtonDisabled()}
            >
                Export
            </Button>

            <DropzoneOrReactJson isSelected={idRowMonitoringTable !== null} monitoring={monitoring} setIdRowMonitoringTable={setIdRowMonitoringTable} setMonitoring={setMonitoring} />
        
            <Button
                variant="contained"
                color="primary"
                onClick={handleClear}
                startIcon={<ClearIcon />}
                //className={classes.button}
                disabled={isClearButtonDisabled()}
                style={{backgroundColor: "orange"}}
            >
                Clear
            </Button>
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
