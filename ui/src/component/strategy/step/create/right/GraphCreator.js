import React, { useRef, useEffect } from 'react'
import { connect } from "react-redux"
import ReactFlow, { ReactFlowProvider, Controls, MiniMap } from 'react-flow-renderer'

import SideBar from "./SideBar"
import DialogUpdateNode from "./DialogUpdateNode"
import { setReactFlowInstanceActionCreator, setFlowStrategyActionCreator, setOpenDialogNodeStrategyActionCreator } from "../../../../../action/strategyAction"

import './dnd.css'

let idNode = 0
let idEdge = 0
const getIdNode = () => `dndnode_${idNode++}`
const getIdEdge = () => `dndedge_${idEdge++}`

const GraphCreator = ({ reactFlowInstance, flowStrategy, openDialogNodeStrategy, setOpenDialogNodeStrategy, setReactFlowInstance, setFlowStrategy }) => {
  /*
  useEffect(() => {
    
  },[flowStrategy])
  */
  
  const reactFlowWrapper = useRef(null)

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance)

  const onDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const onDrop = (event) => {
    event.preventDefault()

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const type = event.dataTransfer.getData('application/reactflow')
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    })
    const newNode = {
      id: getIdNode(),
      type,
      position,
      data: { label: `${type} node` },
    }

    setFlowStrategy(flowStrategy.concat([newNode]))
  }

  const onConnect = (params) => {
    const newEdge = {
      id: getIdEdge(),
      source: params.source,
      target: params.target,
    }
    console.log(flowStrategy)
    setFlowStrategy(flowStrategy.concat([newEdge]))
  }

  const onElementClick = (event, element) => {
    setOpenDialogNodeStrategy({ open: true, node: element })
  }

  const graphStyles = { width: "100%", height: "500px" }

  return (
    <div className="dndflow">
      <DialogUpdateNode />
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={flowStrategy}
            onConnect={onConnect}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={graphStyles}
            onElementClick={onElementClick}
          >
            <MiniMap
              nodeStrokeColor={(n) => {
                if (n.type === 'input') return '#0041d0'
                if (n.type === 'default') return '#ff0072'
                if (n.type === 'output') return '#ff0072'
              }}
              nodeColor={(n) => {
                if (n.type === 'selectorNode') return '#1A192B'
                return '#fff'
              }}
            />
            <Controls />
          </ReactFlow>
        </div>
        <SideBar />
      </ReactFlowProvider>
    </div>
  )
}

const mapStateToProps = state => ({
  reactFlowInstance: state.reactFlowInstance,
  flowStrategy: state.flowStrategy,
  openDialogNodeStrategy: state.openDialogNodeStrategy
})

const mapDispatchToProps = dispatch => ({
  setReactFlowInstance: reactFlowInstance => dispatch(setReactFlowInstanceActionCreator(reactFlowInstance)),
  setFlowStrategy: flowStrategy => dispatch(setFlowStrategyActionCreator(flowStrategy)),
  setOpenDialogNodeStrategy: openDialogNodeStrategy => dispatch(setOpenDialogNodeStrategyActionCreator(openDialogNodeStrategy))
})

export default connect(mapStateToProps, mapDispatchToProps)(GraphCreator)
