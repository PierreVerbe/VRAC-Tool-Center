export const searchInputStrategy = (strategyToSimulate, metaActionArrayToSimulate) => {
    const strategyInputNode = strategyToSimulate.flow.filter(nodeStrategy => nodeStrategy.type === "input")[0]
    const metaAction = metaActionArrayToSimulate.filter(itemMetaAction => itemMetaAction.name === strategyInputNode.data.label)[0]
    const metaActionInputNode = metaAction.flow.filter(nodeMetaAction => nodeMetaAction.type === "input")[0]

    const nextAction = {strategyNode: {id: strategyInputNode.id, name: strategyInputNode.data.label}, metaActionNode: {id: metaActionInputNode.id, name: metaActionInputNode.data.label}}
    
    return {actionData: metaActionInputNode.actionData, nextAction: nextAction}
}

export const searchNextStrategy = (strategyToSimulate, metaActionArrayToSimulate, simulatedRobot) => {
    console.log("actualStrategyNode")
    console.log(strategyToSimulate)
    console.log(metaActionArrayToSimulate)
    console.log(simulatedRobot)

    const actualStrategyNode = strategyToSimulate.flow.filter(nodeStrategy => nodeStrategy.id === simulatedRobot.actual.strategyNode.id)[0]
    const actualMetaActionNode = metaActionArrayToSimulate.filter(itemMetaAction => itemMetaAction.name === simulatedRobot.actual.strategyNode.name)[0]

            console.log("actualStrategyNode")
            console.log(actualStrategyNode)
            
            console.log(actualMetaActionNode)

            // Check if End node in metaAction
            if (actualStrategyNode.type === "output" && actualMetaActionNode.type === "output") {
                console.log("A")
                return {actionData: undefined, nextAction: undefined}
            }
            else if (actualMetaActionNode.type === "output") {
                console.log("B")
                const actualStrategyEdge = strategyToSimulate.flow.filter(edgeStrategy => edgeStrategy.source === actualStrategyNode.id)[0] // select one
                
                const nextStrategyNode = strategyToSimulate.flow.filter(nodeStrategy => nodeStrategy.id === actualStrategyEdge.target)[0]
                const nextMetaActionNode = metaActionArrayToSimulate
                    .filter(itemMetaAction => itemMetaAction.name === nextStrategyNode.data.label)[0]
                    .flow
                    .filter(nodeMetaAction => nodeMetaAction.type === "input")

                    console.log("nextMetaActionNode")
                    console.log(nextMetaActionNode)
                    return {actionData: nextMetaActionNode.actionData, nextAction: undefined}
                
            }
            else {
                console.log("C")
                const nextMetaActionEdge = actualMetaActionNode.flow.filter(edgeMetaAction => edgeMetaAction.source === simulatedRobot.actual.metaActionNode.id)[0] // select one
                const nextMetaActionNode = actualMetaActionNode.flow.filter(nodeMetaAction => nodeMetaAction.id === nextMetaActionEdge.target)[0]
                    
                    console.log("nextMetaActionEdge")
                    console.log(nextMetaActionEdge)
                    console.log("nextMetaActionNode")
                    console.log(nextMetaActionNode)

                    const nextAction = {strategyNode: {id: actualStrategyNode.id, name: actualStrategyNode.data.label}, metaActionNode: {id: nextMetaActionNode.id, name: nextMetaActionNode.data.label}}
                    const actionData = nextMetaActionNode.actionData
                    return {actionData: actionData, nextAction: nextAction}
            }

}

