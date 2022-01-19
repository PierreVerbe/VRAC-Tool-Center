import React from "react"

import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography'

import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import GraphCreator from "./strategy/StrategyCreator"
import MetaActionCreator from "./metaAction/MetaActionCreator"


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
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
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };


const StratCreator = () => {
   
    
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <div>
            <AppBar position="static" color="default">
            <Tabs
                value={value}
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
            
      
        <TabPanel value={value} index={0} >
          <GraphCreator/>
        </TabPanel>
        <TabPanel value={value} index={1} >
          <MetaActionCreator/>
        </TabPanel>
        
      
        </div>
    )
}

export default StratCreator
