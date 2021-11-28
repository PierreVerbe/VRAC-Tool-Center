import React from "react"
import { connect } from "react-redux"

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'

import { columns, TableStrategyHead } from "./TableStrategyHead"
import TableStrategySearchBar from "./TableStrategySearchBar"
import { setIdRowStrategyTableActionCreator, setStrategyActionCreator } from "../../../../../action/strategyAction"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 500,
  },
  iconButton: {
    padding: 10,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
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

const TableStrategy = ({ idRowStrategyTable, setIdRowStrategyTable, allStrategies, setStrategy }) => {
  const classes = useStyles()

  const rows = allStrategies

  const isSelected = (id) => id === idRowStrategyTable

  const handleClick = (event, id) => {
    if (idRowStrategyTable === null) {
      setIdRowStrategyTable(id)
      setStrategy(allStrategies.filter(row => row.id === id)[0])
    }
    else if (idRowStrategyTable === id) {
      setIdRowStrategyTable(null)
      setStrategy({})
    }
  }

  return (
    <Paper className={classes.root}>
      <TableStrategySearchBar />

      <TableContainer className={classes.container}>
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
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>

                  {columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
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
    </Paper>
  )
}

const mapStateToProps = state => ({
  idRowStrategyTable: state.idRowStrategyTable,
  allStrategies: state.allStrategies
})

const mapDispatchToProps = dispatch => ({
  setIdRowStrategyTable: idRowStrategyTable => dispatch(setIdRowStrategyTableActionCreator(idRowStrategyTable)),
  setStrategy: strategy => dispatch(setStrategyActionCreator(strategy))
})

export default connect(mapStateToProps, mapDispatchToProps)(TableStrategy)
