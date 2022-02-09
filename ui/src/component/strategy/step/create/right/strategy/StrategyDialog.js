import React, { useEffect } from "react"
import { connect } from "react-redux"
import { setStrategyCreatorActionCreator, setOpenDialogNodeStrategyActionCreator } from "../../../../../../action/strategyAction"
import PropTypes from 'prop-types'

import Button from "@material-ui/core/Button"
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import ClearIcon from '@material-ui/icons/Clear'
import PublishIcon from '@material-ui/icons/Publish'
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"

import FormControl from "@material-ui/core/FormControl"
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import MenuItem from "@material-ui/core/MenuItem"

import Select from "@material-ui/core/Select"
import DeleteIcon from "@material-ui/icons/Delete"
import LinearScaleIcon from '@material-ui/icons/LinearScale'

import configData from "./../../../../../../resources/config.json"

const configMetaActionTransition = configData.strategy.transition

const DialogUpdateNode = ({ isOpen, strategyCreator, openDialogNodeStrategy, setStrategyCreator, setOpenDialogNodeStrategy }) => {
    const deleteEdge = (event, id) => {
        event.preventDefault()

        const filteredEdge = strategyCreator.flow.filter(edge => edge.id !== id)
        setStrategyCreator({...strategyCreator, flow: filteredEdge})
    }

    const listEdgesToDelete = () => {
        const selectedStrategyNode= strategyCreator.flow.filter(nodeOrEdge => nodeOrEdge.isSelected === true).at(-1)

        const edges = strategyCreator.flow.filter(element => element.id.startsWith("Edge"))
        const filteredEdges = edges.filter(edge => selectedStrategyNode.id === edge.source || selectedStrategyNode.id === edge.target)
        
        return filteredEdges.map((value) => (
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
    }

    const handleCancel = (event) => {
        event.preventDefault()

        const updatedStrategyCreatorFlow = strategyCreator.flow.map(nodeOrEdge => ({...nodeOrEdge, isSelected: false}))
        const updatedStrategyCreator = {...strategyCreator, flow: updatedStrategyCreatorFlow}
        
        setStrategyCreator(updatedStrategyCreator)
        setOpenDialogNodeStrategy(false)
    }

    const handleDelete = (event) => {
        event.preventDefault()

        const selectedNodeOrEdge = strategyCreator.flow.filter(nodeOrEdge => nodeOrEdge.isSelected === true)[0]

        if (selectedNodeOrEdge.id.startsWith('Node')) {
            const updatedStrategyCreatorFlow = strategyCreator.flow.filter(node => node.isSelected === false && node.source !== selectedNodeOrEdge.id && node.target !== selectedNodeOrEdge.id)
            const updatedStrategyCreator = {...strategyCreator, flow: updatedStrategyCreatorFlow}
        
            setStrategyCreator(updatedStrategyCreator)
        }
        else if (selectedNodeOrEdge.id.startsWith('Edge')) {
            const updatedStrategyCreatorFlow = strategyCreator.flow.filter(edge => edge.isSelected === false)
            const updatedStrategyCreator = {...strategyCreator, flow: updatedStrategyCreatorFlow}

            setStrategyCreator(updatedStrategyCreator)
        }

        setOpenDialogNodeStrategy(false)
    }

    const handleSubmit = (event) => {
        handleCancel(event)

        // TODO

        event.preventDefault()
    }

    const truc = (event, id) => {
        const updatedStrategyCreatorFlow = strategyCreator.flow.map(nodeOrEdge => nodeOrEdge.id === id ? { ...nodeOrEdge, label: event.target.value } : nodeOrEdge)

        setStrategyCreator({...strategyCreator, flow: updatedStrategyCreatorFlow})
    }

    const onTextLabelChange = (event) => {
        const updatedStrategyCreatorFlow = strategyCreator.flow.map(nodeOrEdge => nodeOrEdge.isSelected === true ? {...nodeOrEdge, data: {label: event.target.value}} : nodeOrEdge)
        const updatedStrategyCreator = { ...strategyCreator, flow: updatedStrategyCreatorFlow }
        setStrategyCreator(updatedStrategyCreator)
    }

    const dialogNodeOrEdge = () => {
        const nodeOrEdge = strategyCreator.flow.filter(nodeOrEdge => nodeOrEdge.isSelected === true)[0]
        
        if (nodeOrEdge === undefined)
            return <Typography>Click on a node or an edge</Typography>
        else if (nodeOrEdge.id.startsWith('Node'))
            return (
                <div>
                <TextField
                    autoFocus
                    margin="dense"
                    onChange={onTextLabelChange}
                    id="name"
                    label="Name"
                    defaultValue={nodeOrEdge.data.label}
                    fullWidth
                    variant="standard"
                />
            
                <Typography variant="h6" >
                    List of edge to delete
                </Typography>
                <div >
                    <List dense={true}>
                        {listEdgesToDelete()}
                    </List>
                </div>
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
                    
                    <FormControl>
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
        <Dialog open={isOpen} onClose={handleCancel}>
            <DialogTitle>Dialog edit strategy node or edge</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill in the form.
                </DialogContentText>

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
    )
}

DialogUpdateNode.propTypes = {
    isOpen: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    strategyCreator: state.strategyCreator,
    openDialogNodeStrategy: state.openDialogNodeStrategy
})

const mapDispatchToProps = dispatch => ({
    setStrategyCreator: strategyCreator => dispatch(setStrategyCreatorActionCreator(strategyCreator)),
    setOpenDialogNodeStrategy: openDialogNodeStrategy => dispatch(setOpenDialogNodeStrategyActionCreator(openDialogNodeStrategy)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DialogUpdateNode)
