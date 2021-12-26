import React, { useRef, useEffect } from 'react'
import { connect } from "react-redux"
import ReactFlow, { ReactFlowProvider, Controls, MiniMap } from 'react-flow-renderer'

import SideBar from "./SideBar"
import DialogUpdateNode from "./DialogUpdateNode"
import { setReactFlowInstanceActionCreator, setFlowStrategyActionCreator, setOpenDialogNodeStrategyActionCreator } from "../../../../../action/strategyAction"
import { SmartEdge } from '@tisoap/react-flow-smart-edge'
import './dnd.css'

import { ArrowHeadType } from 'react-flow-renderer'

let idNode = 0
let idEdge = 0
const getIdNode = () => `Node_${idNode++}`
const getIdEdge = () => `Edge_${idEdge++}`

const GraphCreator = ({ reactFlowInstance, flowStrategy, openDialogNodeStrategy, setOpenDialogNodeStrategy, setReactFlowInstance, setFlowStrategy }) => {
  useEffect(() => {
    const startNode = flowStrategy.filter(item => item.id.startsWith('Node')).pop()
    const startEdge = flowStrategy.filter(item => item.id.startsWith('Edge')).pop()
   
    idNode = startNode === undefined ? 0 : parseInt(startNode.id.split("_")[1]) + 1
    idEdge = startEdge === undefined ? 0 : parseInt(startEdge.id.split("_")[1]) + 1
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    console.log("hello1")
  },[openDialogNodeStrategy])
  
  const arrowHeadType = ArrowHeadType.Arrow
  
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
      type: 'smart',
      arrowHeadType
    }
    console.log(flowStrategy)
    setFlowStrategy(flowStrategy.concat([newEdge]))
  }

  const onElementClick = (event, element) => {
    
    setOpenDialogNodeStrategy({ open: true, node: element })
 
    console.log(flowStrategy) // https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
    console.log(openDialogNodeStrategy)

    event.preventDefault()
  }

  const graphStyles = { width: "100%", height: "500px" }

  return (
    <div className="dndflow">
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
            edgeTypes={{
              smart: SmartEdge,
            }}
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

      <DialogUpdateNode isOpen={openDialogNodeStrategy.open}/>
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
