import React, { useState, useRef, useEffect } from 'react'
import ReactFlow, {ReactFlowProvider, addEdge, removeElements, Controls,MiniMap,isEdge} from 'react-flow-renderer'

import SideBar from "./SideBar"


import DialogUpdateNode from "./DialogUpdateNode"

import './dnd.css'



let id = 0
const getId = () => `dndnode_${id++}`

const GraphCreator = () => {
  const reactFlowWrapper = useRef(null)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [elements, setElements] = useState([])
  const [openDialogMonitoring, setOpenDialogMonitoring] = useState(false)



  useEffect(() => {


    setElements([
      {
        id: '1',
        type: 'input',
        data: { label: 'input node' },
        position: { x: 250, y: 5 },
      },
    ]);
  }, []);







  const handleUpdateElement = () => {
    setOpenDialogMonitoring(true)
}





  const onConnect = (params) => setElements((els) => addEdge(params, els))
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els))


    
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
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    }

    setElements((es) => es.concat(newNode))
  }

  const onElementClick = (event, element) => {
    console.log('click', element);
    setOpenDialogMonitoring(true)
  }

  const graphStyles = { width: "100%", height: "500px" };

  return (
    <div className="dndflow">
      <DialogUpdateNode openDialogMonitoring={openDialogMonitoring}/>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={graphStyles}
            onElementClick={onElementClick}
          >
            <MiniMap
        nodeStrokeColor={(n) => {
          if (n.type === 'input') return '#0041d0';
          if (n.type === 'default') return '#ff0072';
          if (n.type === 'output') return '#ff0072';
        }}
        nodeColor={(n) => {
          if (n.type === 'selectorNode') return '#1A192B';
          return '#fff';
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

export default GraphCreator
