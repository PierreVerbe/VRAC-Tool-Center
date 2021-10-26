import React, { useEffect } from "react"
import { connect } from "react-redux"

import ListStudent from "./ListStudent"
import { getAllStudentsActionCreator, insertStudentActionCreator } from "./../../action/studentAction"

const UIStudent = ({students, getStudents, insertStudent}) => {

    useEffect(getStudents, [])

    const onSubmit = (event) => {
        const { id, name, age, grade } = event.target.elements
        insertStudent({ id: id.value, name: name.value, age: age.value, grade: grade.value })
        id.value = null
        name.value = null
        age.value = null
        grade.value = null
        event.preventDefault()
    }

    return (
        <div className="marginWrapper">
            <div className="jobInput">
                <form onSubmit={onSubmit}>
                    <input id="example" type="number" name="id"></input>
                    <input id="example" type="text" name="name"></input>
                    <input id="example" type="number" step="any" name="age"></input>
                    <input id="example" type="number" name="grade"></input>
                    <input type="submit" value="Created student" />
                </form>
            </div>
            <ListStudent students={students} />
        </div>
    )
}

const mapStateToProps = state => ({
    students: state.students
})

const mapDispatchToProps = dispatch => ({
    getStudents: () => dispatch(getAllStudentsActionCreator()),
    insertStudent: studentInserted => dispatch(insertStudentActionCreator(studentInserted))
})

export default connect(mapStateToProps, mapDispatchToProps)(UIStudent)
