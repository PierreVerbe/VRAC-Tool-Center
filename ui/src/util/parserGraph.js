class parserGraph {
  static parse = (strategyCreator, metaActionArray) => {
    console.log(strategyCreator);
    console.log(metaActionArray);

    const strategyParsed = parserGraph.parseStrategyGraph(strategyCreator);
    const metaActionParsed = parserGraph.parseMetaActionGraph(metaActionArray);

    const parsedContent = { strategy: strategyParsed, meta: metaActionParsed };

    return parsedContent;
  };

  static parseStrategyGraph = (strategyCreator) => {
    const edges = strategyCreator.flow.filter((item) =>
      item.id.startsWith("Edge")
    );
    const nodes = strategyCreator.flow.filter((item) =>
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

    const result = { strategyName: strategyCreator.name, actions: nodesParsed };
    return result;
  };

  static parseMetaActionGraph = (metaActionArray) => {
    const metaActionParsed = metaActionArray.map((metaAction) => {
      const edges = metaAction.flow.filter((item) =>
        item.id.startsWith("Edge")
      );
      const nodes = metaAction.flow.filter((item) =>
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
        const { type, ...params } = node.actionData;
        return {
          tag: node.data.label,
          action: node.actionData.type,
          parameters: params,
          transitions: edge,
        };
      });

      return { metaActionName: metaAction.id, actions: nodesParsed };
    });

    return metaActionParsed;
  };
}

export default parserGraph;
