import React from "react"
import PropTypes from "prop-types"

import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import Checkbox from "@material-ui/core/Checkbox"

export const columns = [
    { id: "id", label: "Id", minWidth: 10 },
    { id: "name", label: "Name", minWidth: 10 },
    { id: "date", label: "Date", minWidth: 10 },
    { id: "description", label: "Description", minWidth: 10 },
    { id: "version", label: "Version", minWidth: 10 }
]

export const TableMonitoringHead = (props) => {
    const { isAnyRowSelected } = props

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
