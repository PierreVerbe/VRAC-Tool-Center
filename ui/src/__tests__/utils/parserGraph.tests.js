import parserGraph from "./../../util/parserGraph";

describe("Test parserGraph methods", () => {
  test("Test of the parse method", () => {
    expect(1).toBe(1);
  });

  test("Test of the parseStrategyGraph method", () => {
    const toParse = {
      name: "Strategy name",
      flow: [
        {
          id: "Node_0",
          type: "input",
          position: {
            x: 190,
            y: 30.98333740234375,
          },
          data: {
            label: "New meta Action MetaAction_0",
            id: "MetaAction_0",
          },
          isSelected: false,
        },
        {
          id: "Node_1",
          type: "default",
          position: {
            x: 62,
            y: 132.98333740234375,
          },
          data: {
            label: "New meta Action MetaAction_1",
            id: "MetaAction_1",
          },
          isSelected: false,
        },
        {
          id: "Node_2",
          type: "output",
          position: {
            x: 251,
            y: 227.98333740234375,
          },
          data: {
            label: "New meta Action MetaAction_2",
            id: "MetaAction_2",
          },
          isSelected: false,
        },
        {
          id: "Edge_0",
          source: "Node_0",
          target: "Node_1",
          type: "smart",
          arrowHeadType: "arrow",
          label: "Jack",
          isSelected: false,
        },
        {
          id: "Edge_1",
          source: "Node_1",
          target: "Node_2",
          type: "smart",
          arrowHeadType: "arrow",
          label: "Failed",
          isSelected: false,
        },
      ],
      reactFlowInstance: {},
    };

    const expectedResult = {
      strategyName: "Strategy name",
      actions: [
        {
          tag: "New meta Action MetaAction_0",
          transitions: [
            { destination: "New meta Action MetaAction_1", type: "Jack" },
          ],
        },
        {
          tag: "New meta Action MetaAction_1",
          transitions: [
            { destination: "New meta Action MetaAction_2", type: "Failed" },
          ],
        },
        { tag: "New meta Action MetaAction_2", transitions: [] },
      ],
    };

    const result = parserGraph.parseStrategyGraph(toParse);
    expect(result).toStrictEqual(expectedResult);
  });

  test("Test of the parseMetaActionGraph method", () => {
    const toParse = [
      {
        id: "MetaAction_0",
        name: "New meta Action MetaAction_0",
        flow: [
          {
            id: "Node_0",
            type: "input",
            position: {
              x: 116,
              y: 67.25,
            },
            data: {
              label: "Hello",
            },
            actionData: {
              type: "Bezier",
              chained: true,
              radius: 999,
              x: 99,
              y: 9,
              speed: "FUCKING_SLOW",
            },
            isSelected: false,
          },
          {
            id: "Node_1",
            type: "default",
            position: {
              x: 141,
              y: 191.25,
            },
            data: {
              label: "World",
            },
            actionData: {
              type: "Homing",
              forward: true,
              side: true,
            },
            isSelected: false,
          },
          {
            id: "Node_2",
            type: "output",
            position: {
              x: 144,
              y: 303.25,
            },
            data: {
              label: "!",
            },
            actionData: {
              type: "End",
            },
            isSelected: false,
          },
          {
            id: "Edge_0",
            source: "Node_0",
            target: "Node_1",
            type: "smart",
            arrowHeadType: "arrow",
            label: "NoEvent",
            isSelected: false,
          },
          {
            id: "Edge_1",
            source: "Node_1",
            target: "Node_2",
            type: "smart",
            arrowHeadType: "arrow",
            label: "AckServo",
            isSelected: false,
          },
        ],
        reactFlowInstance: {},
        isSelected: false,
      },
      {
        id: "MetaAction_1",
        name: "New meta Action MetaAction_1",
        flow: [
          {
            id: "Node_0",
            type: "input",
            position: {
              x: 140,
              y: 89.25,
            },
            data: {
              label: "This",
            },
            actionData: {
              type: "Line",
              forward: true,
              distance: 300,
              speed: "VERY_SLOW",
            },
            isSelected: false,
          },
          {
            id: "Node_1",
            type: "default",
            position: {
              x: 187,
              y: 206.25,
            },
            data: {
              label: "Is",
            },
            actionData: {
              type: "End",
            },
            isSelected: false,
          },
          {
            id: "Node_2",
            type: "output",
            position: {
              x: 170,
              y: 307.25,
            },
            data: {
              label: "A test",
            },
            actionData: {
              type: "End",
            },
            isSelected: false,
          },
          {
            id: "Edge_0",
            source: "Node_0",
            target: "Node_1",
            type: "smart",
            arrowHeadType: "arrow",
            label: "",
            isSelected: false,
          },
          {
            id: "Edge_1",
            source: "Node_1",
            target: "Node_2",
            type: "smart",
            arrowHeadType: "arrow",
            label: "",
            isSelected: false,
          },
        ],
        reactFlowInstance: {},
        isSelected: false,
      },
      {
        id: "MetaAction_2",
        name: "New meta Action MetaAction_2",
        flow: [
          {
            id: "Node_0",
            type: "input",
            position: {
              x: 174,
              y: 163.25,
            },
            data: {
              label: "Start",
            },
            actionData: {
              type: "CalculateOdometry",
            },
            isSelected: false,
          },
          {
            id: "Node_1",
            type: "output",
            position: {
              x: 167,
              y: 261.25,
            },
            data: {
              label: "Stop",
            },
            actionData: {
              type: "End",
            },
            isSelected: false,
          },
          {
            id: "Edge_0",
            source: "Node_0",
            target: "Node_1",
            type: "smart",
            arrowHeadType: "arrow",
            label: "Timeout",
            isSelected: false,
          },
        ],
        reactFlowInstance: {},
        isSelected: false,
      },
    ];

    const expectedResult = [
      {
        metaActionName: "MetaAction_0",
        actions: [
          {
            action: "Bezier",
            parameters: {
              chained: true,
              radius: 999,
              speed: "FUCKING_SLOW",
              x: 99,
              y: 9,
            },
            tag: "Hello",
            transitions: [{ destination: "World", type: "NoEvent" }],
          },
          {
            action: "Homing",
            parameters: { forward: true, side: true },
            tag: "World",
            transitions: [{ destination: "!", type: "AckServo" }],
          },
          { action: "End", parameters: {}, tag: "!", transitions: [] },
        ],
      },
      {
        metaActionName: "MetaAction_1",
        actions: [
          {
            action: "Line",
            parameters: { distance: 300, forward: true, speed: "VERY_SLOW" },
            tag: "This",
            transitions: [{ destination: "Is", type: "" }],
          },
          {
            action: "End",
            parameters: {},
            tag: "Is",
            transitions: [{ destination: "A test", type: "" }],
          },
          { action: "End", parameters: {}, tag: "A test", transitions: [] },
        ],
      },
      {
        metaActionName: "MetaAction_2",
        actions: [
          {
            action: "CalculateOdometry",
            parameters: {},
            tag: "Start",
            transitions: [{ destination: "Stop", type: "Timeout" }],
          },
          { action: "End", parameters: {}, tag: "Stop", transitions: [] },
        ],
      },
    ];

    const result = parserGraph.parseMetaActionGraph(toParse);
    expect(result).toStrictEqual(expectedResult);
  });
});
