import parserStrategy from './../../util/parserStrategy'

describe("Test parserStrategy methods", () => {

    test("Test of the parse method", () => {
        expect(1).toBe(1)
    })

    test("Test of the parseStrategyCreator method", () => {
        const toParse = {
            "name": "Strategy name",
            "flow": [
              {
                "id": "Node_0",
                "type": "input",
                "position": {
                  "x": 190,
                  "y": 30.98333740234375
                },
                "data": {
                  "label": "New meta Action MetaAction_0",
                  "id": "MetaAction_0"
                },
                "isSelected": false
              },
              {
                "id": "Node_1",
                "type": "default",
                "position": {
                  "x": 62,
                  "y": 132.98333740234375
                },
                "data": {
                  "label": "New meta Action MetaAction_1",
                  "id": "MetaAction_1"
                },
                "isSelected": false
              },
              {
                "id": "Node_2",
                "type": "output",
                "position": {
                  "x": 251,
                  "y": 227.98333740234375
                },
                "data": {
                  "label": "New meta Action MetaAction_2",
                  "id": "MetaAction_2"
                },
                "isSelected": false
              },
              {
                "id": "Edge_0",
                "source": "Node_0",
                "target": "Node_1",
                "type": "smart",
                "arrowHeadType": "arrow",
                "label": "Jack",
                "isSelected": false
              },
              {
                "id": "Edge_1",
                "source": "Node_1",
                "target": "Node_2",
                "type": "smart",
                "arrowHeadType": "arrow",
                "label": "Failed",
                "isSelected": false
              }
            ],
            "reactFlowInstance": {}
          }

        const result = parserStrategy.parseStrategyCreator(toParse)
        expect(result).toBe(1)
    })

    test("Test of the parseMetaActionArray method", () => {
        const toParse = [
            {
              "id": "MetaAction_0",
              "name": "New meta Action MetaAction_0",
              "flow": [
                {
                  "id": "Node_0",
                  "type": "input",
                  "position": {
                    "x": 116,
                    "y": 67.25
                  },
                  "data": {
                    "label": "Hello"
                  },
                  "actionData": {
                    "type": "Bezier",
                    "Chained": true,
                    "Radius": 999,
                    "X": 99,
                    "Y": 9,
                    "Speed": "FUCKING_SLOW"
                  },
                  "isSelected": false
                },
                {
                  "id": "Node_1",
                  "type": "default",
                  "position": {
                    "x": 141,
                    "y": 191.25
                  },
                  "data": {
                    "label": "World"
                  },
                  "actionData": {
                    "type": "Homing",
                    "Forward": true,
                    "Side": true
                  },
                  "isSelected": false
                },
                {
                  "id": "Node_2",
                  "type": "output",
                  "position": {
                    "x": 144,
                    "y": 303.25
                  },
                  "data": {
                    "label": "!"
                  },
                  "actionData": {
                    "type": "End"
                  },
                  "isSelected": false
                },
                {
                  "id": "Edge_0",
                  "source": "Node_0",
                  "target": "Node_1",
                  "type": "smart",
                  "arrowHeadType": "arrow",
                  "label": "NoEvent",
                  "isSelected": false
                },
                {
                  "id": "Edge_1",
                  "source": "Node_1",
                  "target": "Node_2",
                  "type": "smart",
                  "arrowHeadType": "arrow",
                  "label": "AckServo",
                  "isSelected": false
                }
              ],
              "reactFlowInstance": {},
              "isSelected": false
            },
            {
              "id": "MetaAction_1",
              "name": "New meta Action MetaAction_1",
              "flow": [
                {
                  "id": "Node_0",
                  "type": "input",
                  "position": {
                    "x": 140,
                    "y": 89.25
                  },
                  "data": {
                    "label": "This"
                  },
                  "actionData": {
                    "type": "Line",
                    "Forward": true,
                    "Distance": 300,
                    "Speed": "VERY_SLOW"
                  },
                  "isSelected": false
                },
                {
                  "id": "Node_1",
                  "type": "default",
                  "position": {
                    "x": 187,
                    "y": 206.25
                  },
                  "data": {
                    "label": "Is"
                  },
                  "actionData": {
                    "type": "End"
                  },
                  "isSelected": false
                },
                {
                  "id": "Node_2",
                  "type": "output",
                  "position": {
                    "x": 170,
                    "y": 307.25
                  },
                  "data": {
                    "label": "A test"
                  },
                  "actionData": {
                    "type": "End"
                  },
                  "isSelected": false
                },
                {
                  "id": "Edge_0",
                  "source": "Node_0",
                  "target": "Node_1",
                  "type": "smart",
                  "arrowHeadType": "arrow",
                  "label": "",
                  "isSelected": false
                },
                {
                  "id": "Edge_1",
                  "source": "Node_1",
                  "target": "Node_2",
                  "type": "smart",
                  "arrowHeadType": "arrow",
                  "label": "",
                  "isSelected": false
                }
              ],
              "reactFlowInstance": {},
              "isSelected": false
            },
            {
              "id": "MetaAction_2",
              "name": "New meta Action MetaAction_2",
              "flow": [
                {
                  "id": "Node_0",
                  "type": "input",
                  "position": {
                    "x": 174,
                    "y": 163.25
                  },
                  "data": {
                    "label": "Start"
                  },
                  "actionData": {
                    "type": "CalculateOdometry"
                  },
                  "isSelected": false
                },
                {
                  "id": "Node_1",
                  "type": "output",
                  "position": {
                    "x": 167,
                    "y": 261.25
                  },
                  "data": {
                    "label": "Stop"
                  },
                  "actionData": {
                    "type": "End"
                  },
                  "isSelected": false
                },
                {
                  "id": "Edge_0",
                  "source": "Node_0",
                  "target": "Node_1",
                  "type": "smart",
                  "arrowHeadType": "arrow",
                  "label": "Timeout",
                  "isSelected": false
                }
              ],
              "reactFlowInstance": {},
              "isSelected": false
            }
          ]
        const result = parserStrategy.parseMetaActionArray(toParse)
        expect(result).toBe(1)
    })
    
})

/*
{
  "name": "Strategy name",
  "flow": [
    {
      "id": "Node_0",
      "type": "input",
      "position": {
        "x": 190,
        "y": 30.98333740234375
      },
      "data": {
        "label": "New meta Action MetaAction_0",
        "id": "MetaAction_0"
      },
      "isSelected": false
    },
    {
      "id": "Node_1",
      "type": "default",
      "position": {
        "x": 62,
        "y": 132.98333740234375
      },
      "data": {
        "label": "New meta Action MetaAction_1",
        "id": "MetaAction_1"
      },
      "isSelected": false
    },
    {
      "id": "Node_2",
      "type": "output",
      "position": {
        "x": 251,
        "y": 227.98333740234375
      },
      "data": {
        "label": "New meta Action MetaAction_2",
        "id": "MetaAction_2"
      },
      "isSelected": false
    },
    {
      "id": "Edge_0",
      "source": "Node_0",
      "target": "Node_1",
      "type": "smart",
      "arrowHeadType": "arrow",
      "label": "Jack",
      "isSelected": false
    },
    {
      "id": "Edge_1",
      "source": "Node_1",
      "target": "Node_2",
      "type": "smart",
      "arrowHeadType": "arrow",
      "label": "Failed",
      "isSelected": false
    }
  ],
  "reactFlowInstance": {}
}
*/






/*
[
  {
    "id": "MetaAction_0",
    "name": "New meta Action MetaAction_0",
    "flow": [
      {
        "id": "Node_0",
        "type": "input",
        "position": {
          "x": 116,
          "y": 67.25
        },
        "data": {
          "label": "Hello"
        },
        "actionData": {
          "type": "Bezier",
          "Chained": true,
          "Radius": 999,
          "X": 99,
          "Y": 9,
          "Speed": "FUCKING_SLOW"
        },
        "isSelected": false
      },
      {
        "id": "Node_1",
        "type": "default",
        "position": {
          "x": 141,
          "y": 191.25
        },
        "data": {
          "label": "World"
        },
        "actionData": {
          "type": "Homing",
          "Forward": true,
          "Side": true
        },
        "isSelected": false
      },
      {
        "id": "Node_2",
        "type": "output",
        "position": {
          "x": 144,
          "y": 303.25
        },
        "data": {
          "label": "!"
        },
        "actionData": {
          "type": "End"
        },
        "isSelected": false
      },
      {
        "id": "Edge_0",
        "source": "Node_0",
        "target": "Node_1",
        "type": "smart",
        "arrowHeadType": "arrow",
        "label": "NoEvent",
        "isSelected": false
      },
      {
        "id": "Edge_1",
        "source": "Node_1",
        "target": "Node_2",
        "type": "smart",
        "arrowHeadType": "arrow",
        "label": "AckServo",
        "isSelected": false
      }
    ],
    "reactFlowInstance": {},
    "isSelected": false
  },
  {
    "id": "MetaAction_1",
    "name": "New meta Action MetaAction_1",
    "flow": [
      {
        "id": "Node_0",
        "type": "input",
        "position": {
          "x": 140,
          "y": 89.25
        },
        "data": {
          "label": "This"
        },
        "actionData": {
          "type": "Line",
          "Forward": true,
          "Distance": 300,
          "Speed": "VERY_SLOW"
        },
        "isSelected": false
      },
      {
        "id": "Node_1",
        "type": "default",
        "position": {
          "x": 187,
          "y": 206.25
        },
        "data": {
          "label": "Is"
        },
        "actionData": {
          "type": "End"
        },
        "isSelected": false
      },
      {
        "id": "Node_2",
        "type": "output",
        "position": {
          "x": 170,
          "y": 307.25
        },
        "data": {
          "label": "A test"
        },
        "actionData": {
          "type": "End"
        },
        "isSelected": false
      },
      {
        "id": "Edge_0",
        "source": "Node_0",
        "target": "Node_1",
        "type": "smart",
        "arrowHeadType": "arrow",
        "label": "",
        "isSelected": false
      },
      {
        "id": "Edge_1",
        "source": "Node_1",
        "target": "Node_2",
        "type": "smart",
        "arrowHeadType": "arrow",
        "label": "",
        "isSelected": false
      }
    ],
    "reactFlowInstance": {},
    "isSelected": false
  },
  {
    "id": "MetaAction_2",
    "name": "New meta Action MetaAction_2",
    "flow": [
      {
        "id": "Node_0",
        "type": "input",
        "position": {
          "x": 174,
          "y": 163.25
        },
        "data": {
          "label": "Start"
        },
        "actionData": {
          "type": "CalculateOdometry"
        },
        "isSelected": false
      },
      {
        "id": "Node_1",
        "type": "output",
        "position": {
          "x": 167,
          "y": 261.25
        },
        "data": {
          "label": "Stop"
        },
        "actionData": {
          "type": "End"
        },
        "isSelected": false
      },
      {
        "id": "Edge_0",
        "source": "Node_0",
        "target": "Node_1",
        "type": "smart",
        "arrowHeadType": "arrow",
        "label": "Timeout",
        "isSelected": false
      }
    ],
    "reactFlowInstance": {},
    "isSelected": false
  }
]




*/