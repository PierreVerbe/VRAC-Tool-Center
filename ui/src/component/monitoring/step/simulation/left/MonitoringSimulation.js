import React from "react"
import { connect } from "react-redux"

import RobotSimulator from "../../../../general/robotSimulator/RobotSimulator"

const MonitoringSimulation = ({ monitoring, activeStepMonitoring }) => {
    const noStrategy = { name: "Strategy name", flow: [], reactFlowInstance: null }
    const noMetaActionArray = []

    return (
        <div>
            <RobotSimulator strategyToSimulate={noStrategy} metaActionArrayToSimulate={noMetaActionArray} />
        </div>
    )
}

const mapStateToProps = state => ({
    monitoring: state.monitoring,
    activeStepMonitoring: state.activeStepMonitoring
})

export default connect(mapStateToProps)(MonitoringSimulation)