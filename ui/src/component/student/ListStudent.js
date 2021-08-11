import React from "react"
import PropTypes from "prop-types"

import Student from "./Student"

const ListStudent = ({students}) => {

    const renderStudent = () => {
        return students.map((student, i) => (
            <li key={i}>
                <Student student={student} />
            </li>
        )
        )
    }

    return (
        students.length === 0 ? <div><span>Empty</span></div> : <ul>{renderStudent()}</ul>
    )

}

ListStudent.propTypes = {
    students: PropTypes.array.isRequired
}

export default ListStudent