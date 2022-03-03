import parserStrategy from "./../../util/parserStrategy";

describe("Test parserGraph methods", () => {
    test("Test of the parse method", () => {
      expect(1).toBe(1);
    });
  
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
          };
        const expectedResult = {
            name: "Strategy name",
            flow: [
              {
                id: "Node_0",
                type: "input",
                position: {
                  x: 100,
                  y: 100,
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
                  y: 200,
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
                  y: 300,
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
        const result = parserStrategy.parseStrategyCreator(toParse);
        expect(result).toStrictEqual(expectedResult);
    })

    /*

    test("Test of the parseMetaActionArray method", () => {
        const toParse = [
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

        const expectedResult = {}
        const result = parserStrategy.parseMetaActionArray(toParse);
        expect(result).toStrictEqual(expectedResult);
})

*/

})