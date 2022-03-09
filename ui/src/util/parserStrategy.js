class parserStrategy {
  static parse = (strategyCreator, metaActionArray) => {
    console.log(strategyCreator);
    console.log(metaActionArray);

    const strategyParsed = parserStrategy.parseStrategyCreator(strategyCreator);
    const metaActionParsed =
      parserStrategy.parseMetaActionArray(metaActionArray);

    const parsedContent = { strategy: strategyParsed, metaActions: metaActionParsed };

    return parsedContent;
  };

  static parseStrategyCreator = (strategyCreator) => {
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

    const result = { name: strategyCreator.name, actions: nodesParsed };
    return result;
  };

  static parseMetaActionArray = (metaActionArray) => {
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

      return { name: metaAction.name, actions: nodesParsed };
    });

    return metaActionParsed;
  };
}

export default parserStrategy;
