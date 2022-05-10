export const searchInputStrategy = (strategyToSimulate, metaActionArrayToSimulate) => {
    // Check if there is input node in strategy
    const strategyInputNodes = strategyToSimulate.flow.filter(nodeStrategy => nodeStrategy.type === "input")

    if (strategyInputNodes.length === 0) {
        throw new Error("No input node found in strategy graph")
    }
    else {
        const strategyInputNode = strategyInputNodes[0]

        // Check if input node as been completed
        if (strategyInputNode.data.id === undefined) throw new Error("Input node in strategy graph need to be completed")

        const metaAction = metaActionArrayToSimulate.filter(itemMetaAction => itemMetaAction.name === strategyInputNode.data.label)[0]
        const metaActionInputNodes = metaAction.flow.filter(nodeMetaAction => nodeMetaAction.type === "input")

        // Check if there is input node in metaAction
        if (metaActionInputNodes.length === 0) {
            throw new Error(`No input node in ${strategyInputNode.data.label} meta action graph`)
        }
        else {
            const metaActionInputNode = metaActionInputNodes[0]
            const nextAction = { strategyNode: { id: strategyInputNode.id, name: strategyInputNode.data.label }, metaActionNode: { id: metaActionInputNode.id, name: metaActionInputNode.data.label } }

            return { actionData: metaActionInputNode.actionData, nextAction: nextAction }
        }
    }
}

export const searchNextStrategy = (strategyToSimulate, metaActionArrayToSimulate, simulatedRobot, nextStrategyNodeId, nextMetaActionNodeId) => {
    console.log("actualStrategyNode")
    //console.log(strategyToSimulate)
    //console.log(metaActionArrayToSimulate)
    console.log(simulatedRobot)

    console.log("nextMetaActionNodeId")
    console.log(nextMetaActionNodeId)

    const actualStrategyNode = strategyToSimulate.flow.filter(nodeStrategy => nodeStrategy.id === simulatedRobot.actual.strategyNode.id)[0]
    const actualMetaAction = metaActionArrayToSimulate.filter(itemMetaAction => itemMetaAction.name === simulatedRobot.actual.strategyNode.name)[0]
    const actualMetaActionNode = actualMetaAction.flow.filter(nodeMetaAction => nodeMetaAction.id === simulatedRobot.actual.metaActionNode.id)[0]

    console.log("actualStrategyNode")
    console.log(actualStrategyNode)
    console.log(actualMetaAction)
    console.log(actualMetaActionNode)

    // Check if End node in metaAction
    if (actualStrategyNode.type === "output" && actualMetaActionNode.type === "output") {
        console.log("A")
        return { actionData: undefined, nextAction: undefined }
    }
    else if (actualMetaActionNode.type === "output") {
        console.log("B")
        //const actualStrategyEdge = strategyToSimulate.flow.filter(edgeStrategy => edgeStrategy.source === actualStrategyNode.id)[0] // select one

        const nextStrategyNode = strategyToSimulate.flow.filter(nodeStrategy => nodeStrategy.id === nextStrategyNodeId)[0]
        const nextMetaActionNode = metaActionArrayToSimulate
            .filter(itemMetaAction => itemMetaAction.name === nextStrategyNode.data.label)[0]
            .flow.filter(nodeMetaAction => nodeMetaAction.type === "input")[0]// complete with not input

        if (nextMetaActionNode === undefined) throw new Error(`No input node found in ${nextStrategyNode.data.label}`) // No input node metaAction

        console.log("nextStrategyNode")
        console.log(nextStrategyNode)
        console.log("nextMetaActionNode")
        console.log(nextMetaActionNode)

        const nextAction = { strategyNode: { id: nextStrategyNode.id, name: nextStrategyNode.data.label }, metaActionNode: { id: nextMetaActionNode.id, name: nextMetaActionNode.data.label } }

        return { actionData: nextMetaActionNode.actionData, nextAction: nextAction }
    }
    else {
        console.log("C")
        //const nextMetaActionEdge = actualMetaAction.flow.filter(edgeMetaAction => edgeMetaAction.source === simulatedRobot.actual.metaActionNode.id)[0] // select one
        const nextMetaActionNode = actualMetaAction.flow.filter(nodeMetaAction => nodeMetaAction.id === nextMetaActionNodeId)[0]

        //console.log("nextMetaActionEdge")
        //console.log(nextMetaActionEdge)
        console.log("nextMetaActionNode")
        console.log(nextMetaActionNode)

        const nextAction = { strategyNode: { id: actualStrategyNode.id, name: actualStrategyNode.data.label }, metaActionNode: { id: nextMetaActionNode.id, name: nextMetaActionNode.data.label } }
        const actionData = nextMetaActionNode.actionData

        return { actionData: actionData, nextAction: nextAction }
    }
}
