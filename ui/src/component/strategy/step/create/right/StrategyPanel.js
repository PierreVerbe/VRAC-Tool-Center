import React from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

import Tabs from '@material-ui/core/Tabs'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'

import StrategyCreator from './strategy/StrategyCreator'
import MetaActionCreator from './metaAction/MetaActionCreator'

import { setStrategyAppBarActionCreator } from './../../../../../action/strategyAction'

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

const StrategyPanel = ({strategyAppBar, setStrategyAppBar}) => {

    const handleChange = (event, newValue) => {
        setStrategyAppBar(newValue)
    }

    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={strategyAppBar}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    centered
                >
                    <Tab label="Strategy Graph" />
                    <Tab label="Meta Action" />
                </Tabs>
            </AppBar>

            <TabPanel value={strategyAppBar} index={0}>
                <StrategyCreator />
            </TabPanel>
            <TabPanel value={strategyAppBar} index={1}>
                <MetaActionCreator />
            </TabPanel>
        </div>
    )
}

const mapStateToProps = (state) => ({
    strategyAppBar: state.strategyAppBar
})

const mapDispatchToProps = (dispatch) => ({
    setStrategyAppBar: (appBar) => dispatch(setStrategyAppBarActionCreator(appBar))
})

export default connect(mapStateToProps, mapDispatchToProps)(StrategyPanel)
