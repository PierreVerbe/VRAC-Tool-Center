import React from "react"

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography';
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
    createData(999, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
    createData(999, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
    createData(999, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
    createData(999, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
    createData(999, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
    createData(999, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
    createData(999, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
    createData(999, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
    createData(999, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
    createData(999, 'Third monitoring', "dd-MM-yyyy HH:mm:ss", "my third monitoring desc", "v1.0.0"),
  ]

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
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

const TableMonitoring = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
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
          
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
