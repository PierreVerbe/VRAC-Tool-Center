import React from "react"
import ReactJson from 'react-json-view'
import { connect } from "react-redux"
import PropTypes from 'prop-types'

import Button from "@material-ui/core/Button"
//import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import { DropzoneArea } from 'material-ui-dropzone'
import GetAppIcon from '@material-ui/icons/GetApp';
import ClearIcon from '@material-ui/icons/Clear';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'

import { insertMonitoringActionCreator, deleteMonitoringActionCreator, setIdRowMonitoringTableActionCreator, setMonitoringActionCreator } from "../../../../action/monitoringAction"

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

const DropzoneOrReactJson = (props) => {
    const { isSelected, monitoring, setIdRowMonitoringTable, setMonitoring } = props

    const LoadJsonFile = (files) => {
        if (files.length > 0) {
            var file = files[0]
            var fileReader = new FileReader()
    
            fileReader.onload = function(progressEvent) {
                var stringData = progressEvent.target.result
                const obj = JSON.parse(stringData)
                setIdRowMonitoringTable(-1)
                setMonitoring(obj)
            }
            fileReader.readAsText(file, "UTF-8")
        }
    }
    
    setIdRowMonitoringTable.bind(this)
    if (isSelected === false) {
        return <DropzoneArea onChange={LoadJsonFile.bind(this)}/>
    }
    else {
       return (
           <div>
            <ReactJson src={monitoring} collapsed={1}/>
           </div>
       )
   }
}

DropzoneOrReactJson.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    monitoring: PropTypes.object.isRequired,
    setIdRowMonitoringTable: PropTypes.func.isRequired,
    setMonitoring: PropTypes.func.isRequired
  }

const SelectedMonitoring = ({insertMonitoring, deleteMonitoring, idRowMonitoringTable, monitoring, setIdRowMonitoringTable, setMonitoring}) => {
    const [open, setOpen] = React.useState(false);

    const onTextIdChange = (id) => {
        const monitoringUpdated = {...monitoring, id: id.target.value}
        setMonitoring(monitoringUpdated);
    }
  
    const onTextNameChange = (name) => {
        const monitoringUpdated = {...monitoring, name: name.target.value}
        setMonitoring(monitoringUpdated);
    }

    const onTextDescriptionChange = (description) => {
        const monitoringUpdated = {...monitoring, description: description.target.value}
        setMonitoring(monitoringUpdated);
    }

    const onTextVersionChange = (version) => {
        const monitoringUpdated = {...monitoring, version: version.target.value}
        setMonitoring(monitoringUpdated);
    }
    //const classes = useStyles()

const isSaveButtonDisabled = () => {
    return (idRowMonitoringTable !== null && idRowMonitoringTable !== -1)  || Object.entries(monitoring).length === 0
}

const handleSave = () => {
    setOpen(true);
}
const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    
         console.log(monitoring)
         insertMonitoring(monitoring)
        

        /*
        insertStudent({ id: id.value, name: name.value, age: age.value, grade: grade.value })
        id.value = null
        name.value = null
        age.value = null
        grade.value = null
        */

       
    
    setOpen(false);
  };

const isDeleteButtonDisabled = () => {
    return (idRowMonitoringTable === null || idRowMonitoringTable === -1) || Object.entries(monitoring).length === 0
}

const handleDelete = () => {
    if (idRowMonitoringTable !== -1) {
        const body = {id: idRowMonitoringTable}
        deleteMonitoring(body)
        setIdRowMonitoringTable(null)
        setMonitoring({})
    }
}

const isExportButtonDisabled = () => {
    return Object.entries(monitoring).length === 0
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

const isClearButtonDisabled = () => {
    return Object.entries(monitoring).length === 0
}

const handleClear = () => {
    setIdRowMonitoringTable(null)
    setMonitoring({})
}

    return (
        <div>
            <Typography > Id : {monitoring.id ? monitoring.id : "none"}</Typography>
            <Typography > Name : {monitoring.name ? monitoring.name : "none"}</Typography>
            <Typography > Date : {monitoring.date ? monitoring.date : "none"}</Typography>
            <Typography > Description : {monitoring.description ? monitoring.description : "none"}</Typography>
            <Typography > Version : {monitoring.version ? monitoring.version : "none"}</Typography>

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

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save VRAC monitoring</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To save monitoring, please enter the fields below.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        onChange={onTextIdChange}
                        value={monitoring.id}
                        id="id"
                        label="Id"
                        fullWidth
                        variant="standard"
                    />
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
                    onClick={handleClose}
                    startIcon={<ClearIcon />}
                    //className={classes.button}
                    style={{backgroundColor: "orange"}} >
                    Cancel
                </Button>
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    // className={classes.button}
                    startIcon={<SaveIcon />}
                    style={{backgroundColor: "green"}}
                    >
                    
                
                    Save
                </Button>
                </DialogActions>
            </Dialog>

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
    insertMonitoring: monitoringToInsert => dispatch(insertMonitoringActionCreator(monitoringToInsert)),
    deleteMonitoring: monitoringToDelete => dispatch(deleteMonitoringActionCreator(monitoringToDelete)),
    setIdRowMonitoringTable: idRowMonitoringTable => dispatch(setIdRowMonitoringTableActionCreator(idRowMonitoringTable)),
    setMonitoring: monitoring => dispatch(setMonitoringActionCreator(monitoring))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(SelectedMonitoring)
