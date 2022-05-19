import React, { useRef, useEffect } from "react"
import { connect } from "react-redux"
import ReactFlow, { ReactFlowProvider, Controls } from "react-flow-renderer"

import SideBar from "./../Sidebar"

import { setMetaActionArrayActionCreator } from "../../../../../../action/strategyAction"
import { SmartEdge } from "@tisoap/react-flow-smart-edge"
import "./../dnd.css"

import configData from "./../../../../../../resources/config.json"

import { ArrowHeadType } from "react-flow-renderer"

const metaActionTransition = configData.metaAction.transition

let idNode = 0
let idEdge = 0
const getIdNode = () => `Node_${idNode++}`
const getIdEdge = () => `Edge_${idEdge++}`

const MetaActionGraph = ({ metaActionArray, setMetaActionArray }) => {
    const selectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)
    const getSelectedMetaAction = metaActionArray.filter((item) => item.isSelected === true)[0]

    useEffect(() => {
        const metaActionFilteredNode = getSelectedMetaAction.flow.filter((item) => item.id.startsWith("Node"))
        const startNode = metaActionFilteredNode[metaActionFilteredNode.length - 1]

        const metaActionFilteredEdge = getSelectedMetaAction.flow.filter((item) => item.id.startsWith("Edge"))
        const startEdge = metaActionFilteredEdge[metaActionFilteredEdge.length - 1]

        idNode = startNode === undefined ? 0 : parseInt(startNode.id.split("_")[1]) + 1
        idEdge = startEdge === undefined ? 0 : parseInt(startEdge.id.split("_")[1]) + 1
        // eslint-disable-next-line
    }, [])

    const arrowHeadType = ArrowHeadType.Arrow

    const reactFlowWrapper = useRef(null)

    const onLoad = (_reactFlowInstance) => {
        const updatedMetaActionArray = metaActionArray.map((metaAction) =>
            metaAction.name === getSelectedMetaAction.name
                ? { ...metaAction, reactFlowInstance: _reactFlowInstance }
                : metaAction
        )
        setMetaActionArray(updatedMetaActionArray)
    }

    const onDragOver = (event) => {
        event.dataTransfer.dropEffect = "move"

        event.preventDefault()
    }

    const onDrop = (event) => {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
        const idNode = getIdNode()
        const type = event.dataTransfer.getData("application/reactflow")
        const position = getSelectedMetaAction.reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        })

        const newNode = {
            id: idNode,
            type,
            position,
            data: { label: `${idNode} node` },
            actionData: {
                type: "",
            },
            isSelected: false,
        }

        const updatedMetaActionArray = metaActionArray.map((metaAction) =>
            metaAction.name === getSelectedMetaAction.name
                ? { ...metaAction, flow: getSelectedMetaAction.flow.concat([newNode]) }
                : metaAction
        )
        setMetaActionArray(updatedMetaActionArray)

        event.preventDefault()
    }

    const onConnect = (params) => {
        const newEdge = {
            id: getIdEdge(),
            source: params.source,
            target: params.target,
            type: "smart",
            arrowHeadType,
            label: metaActionTransition[0],
            isSelected: false,
        }

        const updatedMetaActionArray = metaActionArray.map((metaAction) =>
            metaAction.name === getSelectedMetaAction.name
                ? { ...metaAction, flow: getSelectedMetaAction.flow.concat([newEdge]) }
                : metaAction
        )
        setMetaActionArray(updatedMetaActionArray)
    }

    const onElementClick = (event, element) => {
        const updatedSelectedMetaAction = getSelectedMetaAction.flow
            .map((nodeOrEdge) => ({ ...nodeOrEdge, isSelected: false }))
            .map((nodeOrEdge) => (nodeOrEdge.id === element.id ? { ...nodeOrEdge, isSelected: true } : nodeOrEdge))
        const updatedMetaActionArray = metaActionArray.map((metaAction) =>
            metaAction.name === getSelectedMetaAction.name
                ? { ...metaAction, flow: updatedSelectedMetaAction }
                : metaAction
        )

        setMetaActionArray(updatedMetaActionArray)
        event.preventDefault()
    }

    const onNodeMove = (event, element) => {
        const updatedSelectedMetaAction = getSelectedMetaAction.flow.map((nodeOrEdge) =>
            nodeOrEdge.id === element.id ? { ...nodeOrEdge, position: element.position } : nodeOrEdge
        )
        const updatedMetaActionArray = metaActionArray.map((metaAction) =>
            metaAction.id === getSelectedMetaAction.id ? { ...metaAction, flow: updatedSelectedMetaAction } : metaAction
        )

        setMetaActionArray(updatedMetaActionArray)
        event.preventDefault()
    }

    const onPanCLick = (event) => {
        const updatedSelectedMetaAction = getSelectedMetaAction.flow.map((nodeOrEdge) => ({
            ...nodeOrEdge,
            isSelected: false,
        }))
        const updatedMetaActionArray = metaActionArray.map((metaAction) =>
            metaAction.id === getSelectedMetaAction.id ? { ...metaAction, flow: updatedSelectedMetaAction } : metaAction
        )

        setMetaActionArray(updatedMetaActionArray)
        event.preventDefault()
    }

    const pixelBorderWindow = 32
    const pixelBorderDialog = 20
    const spacingPixel = 3 * 8
    const sideBarPixel = 234
    const dialogPixel = window.innerWidth - 2 * pixelBorderWindow - 2 * pixelBorderDialog - spacingPixel - sideBarPixel
    const widthReactFlow = (dialogPixel * 8) / 12
    const graphStyles = { width: widthReactFlow, height: "500px" }

    return (
        <div>
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
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    metaActionArray: state.metaActionArray,
})

const mapDispatchToProps = (dispatch) => ({
    setMetaActionArray: (metaActionArray) => dispatch(setMetaActionArrayActionCreator(metaActionArray)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MetaActionGraph)
