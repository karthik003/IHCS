import * as React from 'react';

import Box from '@mui/material/Box';
import DownloadIcon from '@mui/icons-material/Download';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { styled } from '@mui/material/styles';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const actions = [
  { icon: <DownloadIcon />, name: 'Download' },
];

const handleDownload = () =>{
  fetch('https://nlp-demp-platform.s3.ap-south-1.amazonaws.com/downloads.csv').then(response => {
    response.blob()
    .then(blob => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = 'downloads-bots.csv';
        alink.click();
    })
    .catch(()=>{
      console.log('download ')
    })
})
}
export default function PlaygroundSpeedDial() {
  const [direction] = React.useState('up');
  const [hidden] = React.useState(false);
  return (
    <Box sx={{ }}>
      <Box sx={{ position: 'fixed',bottom:0, right:0 }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          hidden={hidden}
          icon={<SpeedDialIcon />}
          direction={direction}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleDownload}
            />
          ))}
        </StyledSpeedDial>
      </Box>
    </Box>
  );
}