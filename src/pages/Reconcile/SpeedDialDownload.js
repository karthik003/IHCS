import React, {useState} from 'react';

import AWS from 'aws-sdk'
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import Modal from '@mui/material/Modal';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { UploadFile } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// import Typography from '@mui/material/Typography';


const S3_BUCKET ='preprod-ihcs';
const REGION ='ap-south-1';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
})

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

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign:'center'
};

export default function PlaygroundSpeedDial() {
  const [direction] = React.useState('up');
  const [hidden] = React.useState(false);
  const [progress , setProgress] = useState(0);
  const [selectedFile,setSelectedFile] = useState(null);
  const [openModal,setOpenModal] = useState(false)
  const [uploadClicked, setUploadClicked] = useState(false)
  const [uploadFailed,setUploadFailed] = useState(false)
  const actions = [
    { icon: <UploadFile />, name: 'Upload', func:()=>openUploadModal() },
    { icon: <DownloadIcon />, name: 'Download', func:()=>handleDownload() },
  ];
  
  const openUploadModal = () =>{
    setOpenModal(true)
  }

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
    
  const handleFileInput = (e) => {
      setSelectedFile(e.target.files[0]);
  }

  const handleUpload = (file) => {
    console.log('upload')
    setUploadClicked(true)
      const params = {
          ACL: 'public-read',
          Body: file,
          Bucket: S3_BUCKET,
          Key: file.name
      };

      myBucket.putObject(params)
          .on('httpUploadProgress', (evt) => {
              setProgress(Math.round((evt.loaded / evt.total) * 100))
          })
          .send((err) => {
              setUploadFailed(true)
              handleClose()
              if (err) console.log(err)
          })
      }

  const handleClose = () => {
    setUploadClicked(false)
    setSelectedFile(null)
    // setUploadFailed(false)
    setOpenModal(false)
  }

  const myBucket = new AWS.S3({
      params: { Bucket: S3_BUCKET},
      region: REGION,
  })

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
              onClick={action.func}
             />

          ))}
        </StyledSpeedDial>
      </Box>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
        <h2>Upload File</h2><br />
        <input type="file" onChange={handleFileInput}/><br />
        <div style={{justifyContent:"center", textAlign:"center"}}><br />
          <Button onClick={() => handleUpload(selectedFile)} disabled={(!selectedFile) || (selectedFile && uploadClicked)}> Upload to S3</Button>
          {uploadClicked && 
          (!uploadFailed ?
            (<div style={{color:"green"}}>{progress}%</div>)
            :
            (<div style={{color:"red"}}>Upload Failed</div>)
            )
          }
          {/* {uploadClicked && !uploadFailed && (<div style={{color:"green"}}>{progress}%</div>)}
          {uploadClicked && uploadFailed && (<div style={{color:"red"}}>Upload Failed</div>)} */}
        </div>
        </Box>
      </Modal>
    </Box>
  );
}