import React from "react"

const Student = ({ student }) => {
    return (
        <div className="student">
            <p>Name : {student.name}</p>
            <p>Age : {student.age}</p>
            <p>Grade : {student.grade}</p>
        </div>
    )
}
export default Student