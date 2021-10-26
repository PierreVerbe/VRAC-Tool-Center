import React from "react"
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'

const columns = [
  { id: 'id', label: 'Id', minWidth: 10 },
  { id: 'name', label: 'Name', minWidth: 10 },
  { id: 'date', label: 'Date', minWidth: 10 },
  { id: 'description', label: 'Description', minWidth: 10 },
  { id: 'version', label: 'Version', minWidth: 10 }
]

function createData(id, name, date, description, version) {
  return { id, name, date, description, version }
}

const rows = [
  createData(0, 'First monitoring', "dd-MM-yyyy HH:mm:ss", "my first monitoring desc", "v1.0"),
  createData(1, 'Second monitoring', "dd-MM-yyyy HH:mm:ss", "my second monitoring desc", "v1.0.3"),
  createData(101, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
  createData(102, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
  createData(103, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
  createData(104, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
  createData(105, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
  createData(106, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
  createData(107, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
  createData(108, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
  createData(109, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
  createData(999, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
]

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 500,
  },
})

function rowCounter(rows) {
  switch (rows) {
    case 0:
      return "Empty table"
    case 1:
      return "1 row"
    default:
      return rows + " rows"
  }
}


const TableMonitoringHead = (props) => {
  const { classes, numSelected, rowCount } = props
 
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

TableMonitoringHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
}

const TableMonitoring = () => {
  const [selected, setSelected] = React.useState([])

  
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableMonitoringHead
            classes={classes}
            numSelected={selected.length}
            rowCount={rows.length}
          />
          
          <TableBody>
            {rows.map((row, index) => {
              const isItemSelected = isSelected(row.id)
              const labelId = `enhanced-table-checkbox-${index}`
              
              return (
                <TableRow 
                  hover 
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
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

export default TableMonitoring
