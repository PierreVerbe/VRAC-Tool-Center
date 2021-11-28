import React from "react"
import ReactJson from 'react-json-view'
import { DropzoneArea } from 'material-ui-dropzone'
import PropTypes from 'prop-types'

const DropzoneOrReactJson = (props) => {
    const { isSelected, strategy, setIdRowStrategyTable, setStrategy } = props

    const LoadJsonFile = (files) => {
        if (files.length > 0) {
            var file = files[0]
            var fileReader = new FileReader()

            fileReader.onload = function (progressEvent) {
                var stringData = progressEvent.target.result
                const obj = JSON.parse(stringData)
                setIdRowStrategyTable(-1)
                setStrategy(obj)
            }
            fileReader.readAsText(file, "UTF-8")
        }
    }

    setIdRowStrategyTable.bind(this)
    if (isSelected === false) {
        return <DropzoneArea onChange={LoadJsonFile.bind(this)} />
    }

    else {
        return (
            <div>
                <ReactJson src={strategy} collapsed={1} />
            </div>
        )
    }
}

DropzoneOrReactJson.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    strategy: PropTypes.object.isRequired,
    setIdRowStrategyTable: PropTypes.func.isRequired,
    setStrategy: PropTypes.func.isRequired
}

export default DropzoneOrReactJson
