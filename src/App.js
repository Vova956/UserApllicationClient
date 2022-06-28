import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import * as React from 'react';

import AddingForm from "./AddingForm";
import ViewingForm from "./ViewingForm";
import GetUserID from "./getUserID"

function App() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Add user" value="1" />
          <Tab label="View users" value="2" />
          <Tab label="Get user by ID" value="3" />
        </TabList>
      </Box>
      <TabPanel value="1"><AddingForm/></TabPanel>
      <TabPanel value="2"><ViewingForm/></TabPanel>
      <TabPanel value="3"><GetUserID/></TabPanel>
    </TabContext>
  );
}

export default App;
