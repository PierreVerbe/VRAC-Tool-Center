import parserStrategy from "./../../utils/parserStrategy"

describe("Test parserStrategy methods", () => {
  test("Test of the parseStrategyCreator method", () => {
    const toParse = {
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
    }

    const expectedResult = {
      name: "Strategy name",
      flow: [
        {
          id: "Node_0",
          type: "input",
          position: {
            x: 100,
            y: 0,
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
            x: 100,
            y: 100,
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
            x: 100,
            y: 200,
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
    }

    const result = parserStrategy.parseStrategyCreator(toParse)
    expect(result).toStrictEqual(expectedResult)
  })

  test("Test of the parseMetaActionArray method", () => {
    const toParse = [
      {
        metaActionName: "New meta Action MetaAction_0",
        actions: [
          {
            parameters: {
              action: "Bezier",
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
            parameters: { action: "Homing", forward: true, side: true },
            tag: "World",
            transitions: [{ destination: "!", type: "AckServo" }],
          },
          { parameters: { action: "End" }, tag: "!", transitions: [] },
        ],
      },
      {
        metaActionName: "New meta Action MetaAction_1",
        actions: [
          {
            parameters: { action: "Line", distance: 300, forward: true, speed: "VERY_SLOW" },
            tag: "This",
            transitions: [{ destination: "Is", type: "" }],
          },
          {

            parameters: { action: "End" },
            tag: "Is",
            transitions: [{ destination: "A test", type: "" }],
          },
          { parameters: { action: "End" }, tag: "A test", transitions: [] },
        ],
      },
      {
        metaActionName: "New meta Action MetaAction_2",
        actions: [
          {
            parameters: { action: "CalculateOdometry" },
            tag: "Start",
            transitions: [{ destination: "Stop", type: "Timeout" }],
          },
          { parameters: { action: "End" }, tag: "Stop", transitions: [] },
        ],
      },
    ]

    const expectedResult = [
      {
        id: "MetaAction_0",
        name: "New meta Action MetaAction_0",
        flow: [
          {
            id: "Node_0",
            type: "input",
            position: {
              x: 100,
              y: 0,
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
              x: 100,
              y: 100,
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
              x: 100,
              y: 200,
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
              x: 100,
              y: 0,
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
              x: 100,
              y: 100,
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
              x: 100,
              y: 200,
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
              x: 100,
              y: 0,
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
              x: 100,
              y: 100,
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
    ]

    const result = parserStrategy.parseMetaActionArray(toParse)
    expect(result).toStrictEqual(expectedResult)
  })
})
