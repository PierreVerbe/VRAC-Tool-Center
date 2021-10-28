import React from "react"
import { connect } from "react-redux"
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
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'

import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'

import { setIdRowMonitoringTableActionCreator, setMonitoringActionCreator } from "../../../../action/monitoringAction"

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

const SearchBar = () => {
  const classes = useStyles()

  return (
    <div>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      
      <InputBase
          className={classes.input}
          placeholder="Search VRAC Monitoring"
          inputProps={{ 'aria-label': 'search vrac monitoring' }}
      />

      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  )
}

const TableMonitoringHead = (props) => {
  const {isAnyRowSelected} = props
 
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={isAnyRowSelected}
            checked={false}
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
  isAnyRowSelected: PropTypes.bool.isRequired
}

const TableMonitoring = ({idRowMonitoringTable, setIdRowMonitoringTable, allMonitorings, setMonitoring}) => {
  const rows = allMonitorings
  
  const classes = useStyles()
  
  const isSelected = (id) => id === idRowMonitoringTable

  const handleClick = (event, id) => {
    if (idRowMonitoringTable === null){
      setIdRowMonitoringTable(id)
      setMonitoring(allMonitorings.filter(row => row.id === id)[0])
    }
    else if (idRowMonitoringTable === id){
      setIdRowMonitoringTable(null)
      setMonitoring({})
    }
  }

  return (
    <Paper className={classes.root}>
      <SearchBar/>

      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableMonitoringHead isAnyRowSelected={idRowMonitoringTable !== null}/>
          
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
  idRowMonitoringTable: state.idRowMonitoringTable,
  allMonitorings: state.allMonitorings
})

const mapDispatchToProps = dispatch => ({
  setIdRowMonitoringTable: idRowMonitoringTable => dispatch(setIdRowMonitoringTableActionCreator(idRowMonitoringTable)),
  setMonitoring: monitoring => dispatch(setMonitoringActionCreator(monitoring))
})

export default connect(mapStateToProps, mapDispatchToProps)(TableMonitoring)
