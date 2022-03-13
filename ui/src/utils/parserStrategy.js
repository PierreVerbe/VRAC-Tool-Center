class parserStrategy {
  static parse = (strategyGraph, metaActionArrayGraph) => {
    const strategyCreator = parserGraph.parseStrategyCreator(strategyGraph)
    const metaActionArray = parserGraph.parseMetaActionArray(metaActionArrayGraph)

    return { strategyCreator: strategyCreator, metaActionArray: metaActionArray }
  }

  static parseStrategyCreator = (strategyGraph) => {
    let nodeIdNumber = 0
    let edgeIdNumber = 0
    let metaActionIdNumber = 0
    const nodeTagIdMap = new Map()
    const transitionMap = new Map()

    const flowNode = strategyGraph.actions.map((action) => {
      const position = { x: 100, y: nodeIdNumber * 100 }
      const nodeId = `Node_${nodeIdNumber++}`
      const type = action.transitions.length === 0 ? "output" : "default"
      const metaActionId = `MetaAction_${metaActionIdNumber++}`
      const data = { label: action.tag, id: metaActionId }

      nodeTagIdMap.set(action.tag, nodeId)
      action.transitions.map((transition) => {
        const numberSource = transitionMap.get(action.tag)
        if (numberSource === undefined) transitionMap.set(action.tag, 0)

        const numberTarget = transitionMap.get(transition.destination)
        if (numberTarget === undefined) transitionMap.set(transition.destination, 1)
        else transitionMap.set(transition.destination, numberTarget + 1)
      })

      return { id: nodeId, type: type, position: position, data: data, isSelected: false }
    })
      .map((action) => {
        const numberTarget = transitionMap.get(action.data.label)
        if (numberTarget === 0) return { ...action, type: "input" }
        else return action
      })

    const flowEdge = strategyGraph.actions.flatMap((action) => {
      const sourdeId = nodeTagIdMap.get(action.tag)

      const edges = action.transitions.map((transition) => {
        const edgeId = `Edge_${edgeIdNumber++}`
        const targetId = nodeTagIdMap.get(transition.destination)

        return { id: edgeId, source: sourdeId, target: targetId, type: "smart", arrowHeadType: "arrow", label: transition.type, isSelected: false }
      })

      if (action.transitions.length !== 0) return edges

    })
      .filter(action => action !== undefined)

    const flow = flowNode.concat(flowEdge)

    return { name: strategyGraph.strategyName, flow: flow, reactFlowInstance: {} }
  }

  static parseMetaActionArray = (metaActionArrayGraph) => {
    let metaActionNumber = 0

    const metaActionArray = metaActionArrayGraph.map((metaAction) => {
      const metaActionId = `MetaAction_${metaActionNumber++}`

      let nodeIdNumber = 0
      let edgeIdNumber = 0
      const nodeTagIdMap = new Map()
      const transitionMap = new Map()
      const flowNode = metaAction.actions.map((action) => {
        const position = { x: 100, y: nodeIdNumber * 100 }
        const nodeId = `Node_${nodeIdNumber++}`
        const type2 = action.transitions.length === 0 ? "output" : "default"
        const data = { label: action.tag }
        const { ['action']: removedProperty, ...partialActionData } = action.parameters
        const actionData = { ...partialActionData, type: action.parameters.action }

        nodeTagIdMap.set(action.tag, nodeId)
        action.transitions.map((transition) => {
          const numberSource = transitionMap.get(action.tag)
          if (numberSource === undefined) transitionMap.set(action.tag, 0)

          const numberTarget = transitionMap.get(transition.destination)
          if (numberTarget === undefined) transitionMap.set(transition.destination, 1)
          else transitionMap.set(transition.destination, numberTarget + 1)
        })

        return { id: nodeId, type: type2, position: position, data: data, actionData: actionData, isSelected: false }
      })
        .map((action) => {
          const numberTarget = transitionMap.get(action.data.label)
          if (numberTarget === 0) return { ...action, type: "input" }
          else return action
        })

      const flowEdge = metaAction.actions.flatMap((action) => {
        const sourdeId = nodeTagIdMap.get(action.tag)

        const edges = action.transitions.map((transition) => {
          const edgeId = `Edge_${edgeIdNumber++}`
          const targetId = nodeTagIdMap.get(transition.destination)

          return { id: edgeId, source: sourdeId, target: targetId, type: "smart", arrowHeadType: "arrow", label: transition.type, isSelected: false }
        })

        if (action.transitions.length !== 0) return edges
      })
        .filter(action => action !== undefined)

      const flow = flowNode.concat(flowEdge)

      return { id: metaActionId, name: metaAction.metaActionName, flow: flow, reactFlowInstance: {}, isSelected: false }
    })

    return metaActionArray
  }
}

export default parserStrategy
