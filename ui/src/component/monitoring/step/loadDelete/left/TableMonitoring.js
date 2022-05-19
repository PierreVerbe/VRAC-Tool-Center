import React from "react"
import { connect } from "react-redux"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"
import Checkbox from "@material-ui/core/Checkbox"
import { makeStyles } from "@material-ui/core/styles"

import { columns, TableMonitoringHead } from "./TableMonitoringHead"
import TableMonitoringSearchBar from "./TableMonitoringSearchBar"
import { setIdRowMonitoringTableActionCreator, setMonitoringActionCreator } from "../../../../../action/monitoringAction"

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: "calc(100vh - 390px)",
  }
}))

const rowCounter = (rows) => {
  switch (rows) {
    case 0:
      return "Empty table"
    case 1:
      return "1 row"
    default:
      return rows + " rows"
  }
}

const TableMonitoring = ({ idRowMonitoringTable, setIdRowMonitoringTable, allMonitorings, setMonitoring }) => {
  const classes = useStyles()

  const rows = allMonitorings

  const isSelected = (id) => id === idRowMonitoringTable

  const handleClick = (event, id) => {
    if (idRowMonitoringTable === null) {
      setIdRowMonitoringTable(id)
      setMonitoring(allMonitorings.filter(row => row.id === id)[0])
    }
    else if (idRowMonitoringTable === id) {
      setIdRowMonitoringTable(null)
      setMonitoring({})
    }
  }

  return (
    <div>
      <TableMonitoringSearchBar />

      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableMonitoringHead isAnyRowSelected={idRowMonitoringTable !== null} />

          <TableBody>
            {rows.map((row, index) => {
              const isRowSelected = isSelected(row.id)
              const labelId = `enhanced-table-checkbox-${index}`

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  selected={isRowSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isRowSelected}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </TableCell>

                  {columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number" ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography >
        {rowCounter(rows.length)}
      </Typography>
    </div>
  )
}

const mapStateToProps = state => ({
  idRowMonitoringTable: state.idRowMonitoringTable,
  allMonitorings: state.allMonitorings
})

const mapDispatchToProps = dispatch => ({
  setIdRowMonitoringTable: idRowMonitoringTable => dispatch(setIdRowMonitoringTableActionCreator(idRowMonitoringTable)),
  setMonitoring: monitoring => dispatch(setMonitoringActionCreator(monitoring))
})

export default connect(mapStateToProps, mapDispatchToProps)(TableMonitoring)
