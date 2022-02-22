import { Typography } from "@material-ui/core"
import Avatar from "@material-ui/core/Avatar"
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from "@material-ui/core/FormControl"
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import MenuItem from "@material-ui/core/MenuItem"
import Paper from '@material-ui/core/Paper'
import Select from "@material-ui/core/Select"
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from "@material-ui/icons/Delete"
import LinearScaleIcon from '@material-ui/icons/LinearScale'
import PropTypes from 'prop-types'
import React from "react"
import { connect } from "react-redux"
import { setStrategyCreatorActionCreator, setMetaActionArrayActionCreator, setOpenDialogMetaActionActionCreator } from "../../../../../../action/strategyAction"
import ActionFactory from '../../../../../general/actionFactory/ActionFactory'
import MetaActionGraph from "./MetaActionGraph"
import ClearIcon from '@material-ui/icons/Clear'
import PublishIcon from '@material-ui/icons/Publish'

import configData from "./../../../../../../resources/config.json";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },

    actionFactoryPaper: {
        display: 'flex',
        '& > *': {
            padding: theme.spacing(3)
        },
    }
}))

const metaActionActionType = ["BackGrippersDropCenter", "BackGrippersDropLeft", "BackGrippersDropRight", "BackGrippersGrabCenter", "BackGrippersGrabLeft",
    "BackGrippersGrabRight", "BackGrippersIn", "BackGrippersOut", "Bezier", "BottomArmsIn_double",
    "BottomArmsIn_single", "BottomArmsOut_double", "BottomArmsOut_single", "CalculateOdo", "End",
    "Homing", "Line", "Rotate", "TopArmGaleryBottom", "TopArmGaleryTop",
    "TopArmGetSamples", "TopArmGetSingleSample", "TopArmSingleStockage", "TopArmStockage", "Wait",
    "XYT"]

const configMetaActionTransition = configData.metaAction.transition

const MetaActionDialog = ({ open, strategyCreator, metaActionArray, setStrategyCreator, setMetaActionArray, setOpenDialogMetaAction }) => {
    const classes = useStyles()

    //const nodes = useStoreState((store) => store.nodes);

    const handleCancel = (event) => {
        const deselectedMetaAction = metaActionArray.map(metaAction => ({ ...metaAction, isSelected: false }))
        const deselectedMetaActionAction = deselectedMetaAction.map(metaAction => (
            {...metaAction, flow: metaAction.flow.map(nodeOrEdge => ({...nodeOrEdge, isSelected: false}))}
        ))

        setMetaActionArray(deselectedMetaActionAction)
        setOpenDialogMetaAction(false)
    }

    const handleDelete = (event) => {
        const updatedMetaActionArray = metaActionArray.filter(metaAction => metaAction.isSelected === false)
        setMetaActionArray(updatedMetaActionArray)
        setOpenDialogMetaAction(false)
    }

    const handleSubmit = (event) => {
        //nodes.forEach(node => console.log(node))
        // TODO

        handleCancel(event)
    }
    const selectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)
    const getSelectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)[0]
    //const getSelectedAction = getSelectedMetaAction.flow.filter(action => action.isSelected === true)[0]

    const deleteEdge = (event, id) => {
        event.preventDefault()

        const filteredEdge = getSelectedMetaAction.flow.filter(edge => edge.id === id).at(-1)

        console.log(filteredEdge)


        const updatedMetaActionArray = metaActionArray.map(metaAction => metaAction.isSelected === true ? 
            {...metaAction, flow :metaAction.flow.filter(nodeOrEdge => nodeOrEdge.id !== filteredEdge.id)} :
             metaAction)

             console.log(updatedMetaActionArray)
        setMetaActionArray(updatedMetaActionArray)
    }

    const listEdgesToDelete = () => {
        const metaActionActionSelected = getSelectedMetaAction.flow.filter(element => element.isSelected === true).at(-1)

        const edges = getSelectedMetaAction.flow.filter(element => element.id.startsWith("Edge"))
        const filteredEdges = edges.filter(element => metaActionActionSelected.id === element.source || metaActionActionSelected.id === element.target)

        return (filteredEdges.length === 0 ? 
            <Typography>There are no edges</Typography> :
            filteredEdges.map((value) => (
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <LinearScaleIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={value.id}
                    secondary={`Source : ${value.source} Target : ${value.target}`}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={(event) => deleteEdge(event, value.id)}>
                        <DeleteIcon style={{ color: "red" }}/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>)

        )
        )
    }
    
    const onTextNameChange = (name) => {
        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ? { ...metaAction, name: name.target.value } : metaAction))
        const updatedStrategyCreator = strategyCreator.flow.map(nodeOrEdge => (nodeOrEdge.data.id === getSelectedMetaAction.id ? {...nodeOrEdge, data : {label: name.target.value, id: getSelectedMetaAction.id}} : nodeOrEdge))
        
        setStrategyCreator({...strategyCreator, flow:  updatedStrategyCreator})
        setMetaActionArray(updatedMetaActionArray)
    }

    const onLabelNode = (event) => {
        console.log(metaActionArray)
        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.isSelected === true ? 
            { ...metaAction, flow: metaAction.flow.map(action => (action.isSelected === true ? {...action, data: {label: event.target.value}} : action)) } : metaAction))
        console.log(updatedMetaActionArray)
        setMetaActionArray(updatedMetaActionArray)
    }

    const handleChange = (event) => {
        const updatedMetaActionArray = metaActionArray.map(metaAction => metaAction.isSelected === true ? 
            {...metaAction, flow :metaAction.flow.map(action => (action.isSelected === true ? {...action, actionData: {...action.actionData, type: event.target.value}} : 
                action))} :
             metaAction)
      
        setMetaActionArray(updatedMetaActionArray)
    }

    const truc = (event, id) => {
        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ? 
            { ...metaAction, flow: getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.id === id ? { ...nodeOrEdge, label: event.target.value } : nodeOrEdge) } :
             metaAction))

        setMetaActionArray(updatedMetaActionArray)        
    }

    const dialogNodeOrEdge = () => {
        const nodeOrEdge = selectedMetaAction.length === 0 || ! getSelectedMetaAction.flow.map(nodeOrEdge => nodeOrEdge.isSelected) ? undefined : getSelectedMetaAction.flow.filter(action => action.isSelected === true)[0]
    
        if (nodeOrEdge === undefined)
            return <Typography>Click on a node or an edge</Typography>
        else if (nodeOrEdge.id.startsWith('Node'))
            return (
                <div>
                    
                    <FormControl className={classes.formControl}>
                        <FormGroup>
                            <FormLabel color='primary'>Node information</FormLabel>
                            <TextField
                                autoFocus
                                margin="dense"
                                onChange={onLabelNode}
                                id="name"
                                label="Name"
                                value={selectedMetaAction.length === 0 ? "Undefined" : getSelectedMetaAction.flow.filter(action => action.isSelected === true)[0].data.label}
                                fullWidth
                                variant="standard"
                            />
                            <List dense={true}>
                                {listEdgesToDelete()}
                            </List>
                        </FormGroup>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <FormGroup>
                            <FormLabel color='primary'>Action Type</FormLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedMetaAction.length === 0 ? "Undefined" : getSelectedMetaAction.flow.filter(action => action.isSelected === true)[0].actionData.type}
                                onChange={handleChange}
                            >
                                {metaActionActionType.map(actionType => 
                                    <MenuItem value={actionType}>{actionType}</MenuItem>
                                )}
                            </Select>

                            <Paper variant="outlined" className={classes.actionFactoryPaper}>
                                <ActionFactory action={selectedMetaAction.length === 0 ? "Undefined" : getSelectedMetaAction.flow.filter(action => action.isSelected === true)[0]} />
                            </Paper>
                        </FormGroup>

                    </FormControl>

                    </div>

            )

        else if (nodeOrEdge.id.startsWith('Edge'))
            return (
                <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <LinearScaleIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={nodeOrEdge.id}
                        secondary={`ActionName: ${nodeOrEdge.label}`}
                    />
                    
                    <FormControl className={classes.formControl}>
                        <FormGroup>
                            <FormLabel color='primary'>Type transition</FormLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={nodeOrEdge.label}
                                onChange={(event) => truc(event, nodeOrEdge.id)}
                            >
                                {configMetaActionTransition.map(actionType => 
                                    <MenuItem value={actionType}>{actionType}</MenuItem>
                                )}
                            </Select>
                            
                        </FormGroup>
                    </FormControl>

                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={(event) => deleteEdge(event, nodeOrEdge.id)}>
                            <DeleteIcon style={{ color: "red" }}/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                </List>
            )
          
    }

    return (
        <div>
            <Dialog open={open} onClose={event => handleCancel(event)} aria-labelledby="form-dialog-title">
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

                    {dialogNodeOrEdge()}
                
                    
                </DialogContent>
            
                <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => handleCancel(event)}
                    startIcon={<ClearIcon />}
                    //className={classes.button}
                    style={{ backgroundColor: "orange" }}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => handleDelete(event)}
                    startIcon={<ClearIcon />}
                    //className={classes.button}
                    style={{ backgroundColor: "red" }}
                >
                    Delete
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => handleSubmit(event)}
                    // className={classes.button}
                    startIcon={<PublishIcon />}
                    style={{ backgroundColor: "green" }}
                >
                    Submit
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

ActionFactory.propTypes = {
    open: PropTypes.bool
}


const mapStateToProps = state => ({
    strategyCreator: state.strategyCreator,
    metaActionArray: state.metaActionArray
})

const mapDispatchToProps = dispatch => ({
    setStrategyCreator: strategyCreator => dispatch(setStrategyCreatorActionCreator(strategyCreator)),
    setMetaActionArray: metaActionArray => dispatch(setMetaActionArrayActionCreator(metaActionArray)),
    setOpenDialogMetaAction: openDialogMetaAction => dispatch(setOpenDialogMetaActionActionCreator(openDialogMetaAction))
})

export default connect(mapStateToProps, mapDispatchToProps)(MetaActionDialog)
