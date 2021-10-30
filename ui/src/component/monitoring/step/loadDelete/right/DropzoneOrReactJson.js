import React from "react"
import ReactJson from 'react-json-view'
import { DropzoneArea } from 'material-ui-dropzone'
import PropTypes from 'prop-types'

const DropzoneOrReactJson = (props) => {
    const { isSelected, monitoring, setIdRowMonitoringTable, setMonitoring } = props

    const LoadJsonFile = (files) => {
        if (files.length > 0) {
            var file = files[0]
            var fileReader = new FileReader()
    
            fileReader.onload = function(progressEvent) {
                var stringData = progressEvent.target.result
                const obj = JSON.parse(stringData)
                setIdRowMonitoringTable(-1)
                setMonitoring(obj)
            }
            fileReader.readAsText(file, "UTF-8")
        }
    }
    
    setIdRowMonitoringTable.bind(this)
    if (isSelected === false) {
        return <DropzoneArea onChange={LoadJsonFile.bind(this)}/>
    }

    else {
       return (
           <div>
            <ReactJson src={monitoring} collapsed={1}/>
           </div>
       )
    }
}

DropzoneOrReactJson.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    monitoring: PropTypes.object.isRequired,
    setIdRowMonitoringTable: PropTypes.func.isRequired,
    setMonitoring: PropTypes.func.isRequired
}

export default DropzoneOrReactJson
