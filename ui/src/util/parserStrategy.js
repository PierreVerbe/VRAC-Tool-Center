class parserStrategy {
    static parse = (strategyCreator, metaActionArray) => {
        console.log(strategyCreator)
        console.log(metaActionArray)

        const strategyParsed = parserStrategy.parseStrategyCreator(strategyCreator)
        const metaActionParsed =  parserStrategy.parseMetaActionArray(metaActionArray)
       
        const parsedContent = {strategy: strategyParsed, meta: metaActionParsed}

        return parsedContent
    }

    static parseStrategyCreator = (strategyCreator) => {
        const edges = strategyCreator.flow.filter(item => item.id.startsWith('Edge'))
        const nodes = strategyCreator.flow.filter(item => item.id.startsWith('Node'))

        const nodesParsed = nodes.map(node => {
            const edge = edges.filter(item => item.source === node.id).map(item => {
                const target = nodes.filter(findItem => item.target === findItem.id)[0]

                return {type: item.label, dest:target.data.label} 
            })

            return ({Tag: node.data.label, Transitions: edge})
        })

        const reuslt = {StrategyName: strategyCreator.name, Actions: nodesParsed}
        return reuslt
    }

    static parseMetaActionArray = (metaActionArray) => {
        const metaActionParsed = metaActionArray.map( metaAction => {
            const edges = metaAction.flow.filter(item => item.id.startsWith('Edge'))
            const nodes = metaAction.flow.filter(item => item.id.startsWith('Node'))

            const nodesParsed = nodes.map(node => {
                    const edge = edges.filter(item => item.source === node.id).map(item => {
                        const target = nodes.filter(findItem => item.target === findItem.id)[0]
    
                        return {type: item.label, dest:target.data.label} 
                    }
                        )
                    const {type, ...params} = node.actionData
                    return ({Tag: node.data.label, Action: node.actionData.type, Params: params, Transitions: edge})
                })

            
            return ({MetaActionName: metaAction.id, Actions: nodesParsed})
            }    
        )

        return metaActionParsed

    }
}

export default parserStrategy