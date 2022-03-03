class parserStrategy {
    static parse = (strategyCreator, metaActionArray) => {
     
    }

    static parseStrategyCreator = (strategyGraph) => {
        let nodeId = 0
        let edgeId = 0
        let metaActionId = 0
        const idMap = new Map()
        const actionMap = new Map();
    
        const flowNode = strategyGraph.actions.map((action) => {
            const id = `Node_${nodeId++}`
            const type = action.transitions.length === 0 ? "output" : "default" // TODO input
            const dataId = `MetaAction_${metaActionId++}`
            const position = {x: 100, y: nodeId * 100}
            const data = {label: action.tag, id: dataId}

            // Define id mapping
            idMap.set(action.tag, id) 

            // Define type node input
            action.transitions.map((transition) => {
              const numberSource = actionMap.get(action.tag)
              if (numberSource === undefined) actionMap.set(action.tag, 0)

              const numberTarget = actionMap.get(transition.destination)
              if (numberTarget === undefined) actionMap.set(transition.destination, 1)
              else actionMap.set(transition.destination, numberTarget +1 )
            })

            return {id: id, type: type, position: position, data: data, isSelected: false}
        }
        )


        const flowNode2 = flowNode.map((action) => {
          const numberTarget = actionMap.get(action.data.label)
          if (numberTarget === 0) return {...action, type: "input"}
          else return action
        })

        // node travailler type
        //data.id

        const flowEdge = strategyGraph.actions.flatMap((action) => {
            const sourdeId = idMap.get(action.tag)

            const edges = action.transitions.map((transition) => {
              const id = `Edge_${edgeId++}`
              const targetId = idMap.get(transition.destination)

              return {id: id, source: sourdeId, target: targetId, type: "smart", arrowHeadType: "arrow", label: transition.type, isSelected: false}
            })

            if (action.transitions.length !== 0) return edges

        }).filter(x => x !== undefined)

        const flow = flowNode2.concat(flowEdge)

        /*

        const edges = strategyGraph.flow.filter((item) =>
          item.id.startsWith("Edge")
        );
        const nodes = strategyGraph.flow.filter((item) =>
          item.id.startsWith("Node")
        );
    
        const nodesParsed = nodes.map((node) => {
          const edge = edges
            .filter((item) => item.source === node.id)
            .map((item) => {
              const target = nodes.filter(
                (findItem) => item.target === findItem.id
              )[0];
    
              return { type: item.label, destination: target.data.label };
            });
    
          return { tag: node.data.label, transitions: edge };
        });
    
        const result = { strategyName: strategyGraph.name, actions: nodesParsed };
        return result;
        */

        console.log({name: strategyGraph.strategyName, flow: flow, reactFlowInstance: {} })
        return {name: strategyGraph.strategyName, flow: flow, reactFlowInstance: {} }
      };
      

      static parseMetaActionArray = (t) => {

      }
}

export default parserStrategy;