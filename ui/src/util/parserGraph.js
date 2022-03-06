class parserGraph {
  static parse = (strategyCreator, metaActionArray) => {
    const strategyParsed = parserGraph.parseStrategyGraph(strategyCreator)
    const metaActionParsed = parserGraph.parseMetaActionGraph(metaActionArray)

    return { strategy: strategyParsed, meta: metaActionParsed }
  }

  static parseStrategyGraph = (strategyCreator) => {
    const edges = strategyCreator.flow.filter((item) =>
      item.id.startsWith("Edge"))
    const nodes = strategyCreator.flow.filter((item) =>
      item.id.startsWith("Node"))

    const nodesParsed = nodes.map((node) => {
      const edge = edges
        .filter((item) => item.source === node.id)
        .map((item) => {
          const target = nodes.filter(
            (findItem) => item.target === findItem.id)[0]

          return { type: item.label, destination: target.data.label }
        })

      return { tag: node.data.label, transitions: edge }
    })

    return { strategyName: strategyCreator.name, actions: nodesParsed }
  }

  static parseMetaActionGraph = (metaActionArray) => {
    const metaActionParsed = metaActionArray.map((metaAction) => {
      const edges = metaAction.flow.filter((item) =>
        item.id.startsWith("Edge")
      )
      const nodes = metaAction.flow.filter((item) =>
        item.id.startsWith("Node")
      )

      const nodesParsed = nodes.map((node) => {
        const edge = edges
          .filter((item) => item.source === node.id)
          .map((item) => {
            const target = nodes.filter(
              (findItem) => item.target === findItem.id)[0]

            return { type: item.label, destination: target.data.label }
          })
        const { type, ...params } = node.actionData

        return { tag: node.data.label, action: node.actionData.type, parameters: params, transitions: edge }
      })

      return { metaActionName: metaAction.name, actions: nodesParsed }
    })

    return metaActionParsed
  }
}

export default parserGraph
