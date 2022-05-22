import React from "react"
import { connect } from "react-redux"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"
import Checkbox from "@material-ui/core/Checkbox"

import { columns, TableStrategyHead } from "./TableStrategyHead"
import TableStrategySearchBar from "./TableStrategySearchBar"
import { setIdRowStrategyTableActionCreator, setStrategyLoaderActionCreator } from "../../../../../action/strategyAction"

import { useStyles } from "../../../../Style"

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

const TableStrategy = ({ idRowStrategyTable, setIdRowStrategyTable, allStrategies, setStrategyLoader }) => {
  const classes = useStyles()

  const rows = allStrategies

  const isSelected = (id) => id === idRowStrategyTable

  const handleClick = (event, id) => {
    if (idRowStrategyTable === null) {
      setIdRowStrategyTable(id)
      setStrategyLoader(allStrategies.filter(row => row.id === id)[0])
    }

    else if (idRowStrategyTable === id) {
      setIdRowStrategyTable(null)
      setStrategyLoader({})
    }
  }

  return (
    <div>
      <TableStrategySearchBar />

      <TableContainer className={classes.loadTable}>
        <Table stickyHeader aria-label="sticky table">
          <TableStrategyHead isAnyRowSelected={idRowStrategyTable !== null} />

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
                    if (column.id === "name") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? column.format(value) : row["strategy"].name}
                        </TableCell>
                      )
                    }
                    else {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? column.format(value) : value}
                        </TableCell>
                      )
                    }
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
  idRowStrategyTable: state.idRowStrategyTable,
  allStrategies: state.allStrategies
})

const mapDispatchToProps = dispatch => ({
  setIdRowStrategyTable: idRowStrategyTable => dispatch(setIdRowStrategyTableActionCreator(idRowStrategyTable)),
  setStrategyLoader: strategy => dispatch(setStrategyLoaderActionCreator(strategy))
})

export default connect(mapStateToProps, mapDispatchToProps)(TableStrategy)
