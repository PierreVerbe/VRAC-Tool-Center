import React, { useRef, useEffect } from 'react'
import { connect } from "react-redux"
import ReactFlow, { ReactFlowProvider, Controls } from 'react-flow-renderer'

import SideBar from "../Sidebar"
import DialogUpdateNode from "./StrategyDialog"
import { setOpenDialogNodeStrategyActionCreator, setStrategyCreatorActionCreator } from "../../../../../../action/strategyAction"
import { SmartEdge } from '@tisoap/react-flow-smart-edge'
import TextField from '@material-ui/core/TextField'
import './../dnd.css'

import { ArrowHeadType } from 'react-flow-renderer'

let idNode = 0
let idEdge = 0
const getIdNode = () => `Node_${idNode++}`
const getIdEdge = () => `Edge_${idEdge++}`

const StrategyCreator = ({ strategyCreator, openDialogNodeStrategy, setStrategyCreator, setOpenDialogNodeStrategy }) => {
  useEffect(() => {
    const startNode = strategyCreator.flow.filter(item => item.id.startsWith('Node')).pop()
    const startEdge = strategyCreator.flow.filter(item => item.id.startsWith('Edge')).pop()
   
    idNode = startNode === undefined ? 0 : parseInt(startNode.id.split("_")[1]) + 1
    idEdge = startEdge === undefined ? 0 : parseInt(startEdge.id.split("_")[1]) + 1
    // eslint-disable-next-line
  }, [])
  
  const arrowHeadType = ArrowHeadType.Arrow
  
  const reactFlowWrapper = useRef(null)

  const onLoad = (_reactFlowInstance) => {
    const updatedStrategyCreator = {...strategyCreator, reactFlowInstance: _reactFlowInstance}
    setStrategyCreator(updatedStrategyCreator)
  }

  const onDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const onDrop = (event) => {
    event.preventDefault()

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const idNode = getIdNode()
    const type = event.dataTransfer.getData('application/reactflow')
    const position = strategyCreator.reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    })

    const newNode = {
      id: idNode,
      type,
      position,
      data: { label: `${idNode} node`, id: undefined },
      isSelected: false,
    }

    const updatedStrategyCreator = {...strategyCreator, flow: strategyCreator.flow.concat([newNode])}
    setStrategyCreator(updatedStrategyCreator)
  }

  const onConnect = (params) => {
    const newEdge = {
      id: getIdEdge(),
      source: params.source,
      target: params.target,
      type: 'smart',
      arrowHeadType,
      label: "",
      isSelected: false
    }

    const updatedStrategyCreator = {...strategyCreator, flow: strategyCreator.flow.concat([newEdge])}
    setStrategyCreator(updatedStrategyCreator)
  }

  const onElementClick = (event, element) => {
    const updatedStrategyCreatorFlow = strategyCreator.flow.map(nodeOrEdge => ({...nodeOrEdge, isSelected: false}))
      .map(nodeOrEdge => (nodeOrEdge.id === element.id ? {...nodeOrEdge, isSelected: true} : nodeOrEdge))
    const updatedStrategyCreator = {...strategyCreator, flow: updatedStrategyCreatorFlow}

    setOpenDialogNodeStrategy(true)
    setStrategyCreator(updatedStrategyCreator)
    event.preventDefault()
  }

  const onNodeMove = (event, element) => {
    const updatedStrategyCreatorFlow = strategyCreator.flow.map(nodeOrEdge => (nodeOrEdge.id === element.id ? {...nodeOrEdge, position: element.position} : nodeOrEdge))
    const updatedStrategyCreator = {...strategyCreator, flow: updatedStrategyCreatorFlow}

    setStrategyCreator(updatedStrategyCreator)
    event.preventDefault()
  }

  const onPanCLick = (event) => {
    const updatedStrategyCreatorFlow = strategyCreator.flow.map(nodeOrEdge => ({...nodeOrEdge, isSelected: false}))
    const updatedStrategyCreator = {...strategyCreator, flow: updatedStrategyCreatorFlow}
    
    setStrategyCreator(updatedStrategyCreator)
    event.preventDefault()
}

  const onChangeStrategyCreatorName = (event) => {
    const updatedStrategyCreator = {...strategyCreator, name: event.target.value}
    setStrategyCreator(updatedStrategyCreator)
}

  const graphStyles = { width: "100%", height: "500px" }

  return (
    <div>

      <form >
        <TextField
          autoFocus
          margin="dense"
          onChange={onChangeStrategyCreatorName}
          id="strategyName"
          label="Strategy name"
          value={strategyCreator.name}
          fullWidth
          variant="standard"
        />
      </form>

    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={strategyCreator.flow}
            onConnect={onConnect}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={graphStyles}
            onElementClick={onElementClick}
            onNodeDragStop={onNodeMove}
            onPaneClick={onPanCLick}
            edgeTypes={{
              smart: SmartEdge,
            }}
          >
            <Controls />
          </ReactFlow>
        </div>
        <SideBar />

      </ReactFlowProvider>

      <DialogUpdateNode isOpen={openDialogNodeStrategy}/>
    </div>
    </div>
  )
}

const mapStateToProps = state => ({
  strategyCreator: state.strategyCreator,
  openDialogNodeStrategy: state.openDialogNodeStrategy
})

const mapDispatchToProps = dispatch => ({
  setStrategyCreator: strategyCreator => dispatch(setStrategyCreatorActionCreator(strategyCreator)),
  setOpenDialogNodeStrategy: openDialogNodeStrategy => dispatch(setOpenDialogNodeStrategyActionCreator(openDialogNodeStrategy))
})

export default connect(mapStateToProps, mapDispatchToProps)(StrategyCreator)
