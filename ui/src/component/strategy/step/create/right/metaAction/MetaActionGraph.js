import React, { useRef, useEffect } from 'react'
import { connect } from "react-redux"
import ReactFlow, { ReactFlowProvider, Controls, MiniMap } from 'react-flow-renderer'

import SideBar from "./../Sidebar"

import { setOpenDialogNodeStrategyActionCreator, setMetaActionArrayActionCreator } from "../../../../../../action/strategyAction"
import { SmartEdge } from '@tisoap/react-flow-smart-edge'
import './../dnd.css'

import { ArrowHeadType } from 'react-flow-renderer'

let idNode = 0
let idEdge = 0
const getIdNode = () => `Node_${idNode++}`
const getIdEdge = () => `Edge_${idEdge++}`

const MetaActionGraph = ({ metaActionArray, openDialogNodeStrategy, setOpenDialogNodeStrategy, setMetaActionArray }) => {
    const selectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)
    const getSelectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)[0]

    useEffect(() => {
        const startNode = getSelectedMetaAction.flow.filter(item => item.id.startsWith('Node')).at(-1)
        const startEdge = getSelectedMetaAction.flow.filter(item => item.id.startsWith('Edge')).at(-1)

        idNode = startNode === undefined ? 0 : parseInt(startNode.id.split("_")[1]) + 1
        idEdge = startEdge === undefined ? 0 : parseInt(startEdge.id.split("_")[1]) + 1
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log("hello1")
    }, [openDialogNodeStrategy])

    const arrowHeadType = ArrowHeadType.Arrow

    const reactFlowWrapper = useRef(null)

    const onLoad = (_reactFlowInstance) => {
        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ? { ...metaAction, reactFlowInstance: _reactFlowInstance } : metaAction))
        setMetaActionArray(updatedMetaActionArray)
    }

    const onDragOver = (event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
    }

    const onDrop = (event) => {
        event.preventDefault()

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
        const type = event.dataTransfer.getData('application/reactflow')
        const position = getSelectedMetaAction.reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        })
        const newNode = {
            id: getIdNode(),
            type,
            position,
            data: { label: `${type} node` },
            actionData: {},
            isSelected: false
        }

        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ? { ...metaAction, flow: getSelectedMetaAction.flow.concat([newNode]) } : metaAction))
        setMetaActionArray(updatedMetaActionArray)
    }

    const onConnect = (params) => {
        const newEdge = {
            id: getIdEdge(),
            source: params.source,
            target: params.target,
            type: 'smart',
            arrowHeadType,
            isSelected: false
        }

        const updatedMetaActionArray = metaActionArray.map(metaAction => (metaAction.name === getSelectedMetaAction.name ? { ...metaAction, flow: getSelectedMetaAction.flow.concat([newEdge]) } : metaAction))
        setMetaActionArray(updatedMetaActionArray)
    }

    const onElementClick = (event, element) => {
        
        console.log(element)
        const updatedSelectedMetaAction = getSelectedMetaAction.flow.map(nodeOrEdge => ({...nodeOrEdge, isSelected: false}))
            .map(nodeOrEdge => (nodeOrEdge.id === element.id ? {...nodeOrEdge, isSelected: true} : nodeOrEdge))
        
        //console.log(updatedSelectedMetaAction) 
        const updatedMetaActionArray = metaActionArray.map(metaAction => (
            metaAction.name === getSelectedMetaAction.name ? {...metaAction, flow :  updatedSelectedMetaAction} : metaAction)
        )

        console.log(updatedMetaActionArray)
        
        setMetaActionArray(updatedMetaActionArray)

        //setOpenDialogNodeStrategy({ open: true, node: element })

        //console.log(flowStrategy) // https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
        //console.log(openDialogNodeStrategy)

        event.preventDefault()
    }

    const graphStyles = { width: "500px", height: "500px" }

    return (
        <div className="dndflow">

            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        elements={selectedMetaAction.length === 0 ? [] : getSelectedMetaAction.flow}
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


        </div>
    )
}

const mapStateToProps = state => ({
    metaActionArray: state.metaActionArray,
    openDialogNodeStrategy: state.openDialogNodeStrategy
})

const mapDispatchToProps = dispatch => ({
    setOpenDialogNodeStrategy: openDialogNodeStrategy => dispatch(setOpenDialogNodeStrategyActionCreator(openDialogNodeStrategy)),
    setMetaActionArray: metaActionArray => dispatch(setMetaActionArrayActionCreator(metaActionArray))
})

export default connect(mapStateToProps, mapDispatchToProps)(MetaActionGraph)

/*

ray(4) [ {…}, {…}, {…}, {…} ]
​
0: Object { id: "Node_0", type: "input", position: {…}, … }
​
1: Object { id: "Node_1", type: "default", position: {…}, … }
​
2: Object { id: "Edge_0", source: "Node_0", target: "Node_1", … }
​
3: Object { id: "Node_2", type: "default", position: {…}, … }
​
length: 4
​
<prototype>: Array []



0: Object { id: "Node_0", type: "input", position: {…}, … }
 ​
data: Object { label: "input node" }
 ​
id: "Node_0"
 ​
position: Object { x: 85.9666748046875, y: 127 }
 ​
type: "input"
*/
