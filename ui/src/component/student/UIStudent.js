import React, { useEffect } from "react"
import { connect } from "react-redux"

import Paper from '@material-ui/core/Paper'

import ListStudent from "./ListStudent"
import { ELEVATION_PAGE_CONTENT } from "../Style"
import { getAllStudentsActionCreator, insertStudentActionCreator } from "./../../action/studentAction"

import "./../Style.css"

const UIStudent = ({students, getStudents, insertStudent}) => {

    useEffect(getStudents, []) // eslint-disable-line react-hooks/exhaustive-deps

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
        <div className="rootPage">
            <Paper className="paperPage" elevation={ELEVATION_PAGE_CONTENT}>
                <form onSubmit={onSubmit}>
                    <input id="example" type="number" name="id"></input>
                    <input id="example" type="text" name="name"></input>
                    <input id="example" type="number" step="any" name="age"></input>
                    <input id="example" type="number" name="grade"></input>
                    <input type="submit" value="Created student" />
                </form>
                <ListStudent students={students} />
            </Paper>
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
