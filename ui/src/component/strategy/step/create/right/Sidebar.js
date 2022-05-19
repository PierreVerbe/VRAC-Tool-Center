import React from "react"

const SideBar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"

    //event.preventDefault()
  }

  return (
    <aside>
      <div className="react-flow__node-input" onDragStart={(event) => onDragStart(event, "input")} draggable>
        Start Node
      </div>
      <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, "default")} draggable>
        Default Node
      </div>
      <div className="react-flow__node-output" onDragStart={(event) => onDragStart(event, "output")} draggable>
        End Node
      </div>
    </aside>
  )
}

export default SideBar
