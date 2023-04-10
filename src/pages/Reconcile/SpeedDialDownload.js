import React, {useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import Modal from '@mui/material/Modal';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { UploadFile } from '@mui/icons-material';
import axios from "axios";
import { styled } from '@mui/material/styles';

// import AWS from 'aws-sdk'











// import S3Uploader from 'react-s3-uploader';







// import Typography from '@mui/material/Typography';


const S3_BUCKET ='preprod-ihcs';
// const REGION ='ap-south-1';

// AWS.config.update({
//   accessKeyId: "AKIAVCB27Q2HJUVFWF4G",
//   secretAccessKey: "q4QbJs3aTzMmx7pCq4wrEkzL8F8NSgvg5tezsY"
// })

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
  // const [progress , setProgress] = useState(0);
  const [selectedFile,setSelectedFile] = useState(null);
  const [openModal,setOpenModal] = useState(false)
  const [uploadClicked, setUploadClicked] = useState(false)
  const [uploadFailed,setUploadFailed] = useState(false)
  const [uploadSuccess,setUploadSuccess] = useState(false)
  // const [presignedUrl, setPresignedUrl] = useState()
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

  // const getPresignedUrl = async (callback) => {
  //   if (!selectedFile) {
  //     console.log('Please select a file.');
  //     return;
  //   }
  //   const s3 = new AWS.S3({
  //     accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  //     secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  //     region: 'ap-south-1',
  //   });

  //   const params = {
  //     Bucket: S3_BUCKET,
  //     Key: selectedFile.name,
  //     ContentType: selectedFile.type,
  //   };

  //   try {
  //     const response = await s3.getSignedUrlPromise('putObject', params);
  //     callback(response)
  //     // setPresignedUrl(response);
  //   } catch (err) {
  //     console.log('Error occurred while generating presigned URL.', err);
  //   }
  // };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log('Please select a file.');
      return;
    }

    try {
      let url = 'https://v884u19ky0.execute-api.ap-south-1.amazonaws.com/preprod/preprod-ihch-upload?filename=' + selectedFile.name
      const fileRes = await axios.get(url);
      const res = fileRes.data;
      var formdata = new FormData();

      Object.entries(res["presigned_url"]["fields"]).forEach(([key, value]) => {
        formdata.append(key, value);
      });
      console.log('res',res)
      formdata.append("bucket", S3_BUCKET);
      formdata.append("file", selectedFile);
      console.log('formdata',formdata)
      await axios.post(res.presigned_url.url, formdata).then(response => {
        console.log("File uploaded successfully.",response);
        setUploadSuccess(true)
        setUploadClicked(true)
      });

  } catch (error) {
    console.log(error);
    setUploadFailed(true)
  }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 1500);
    return () => clearTimeout(timer);
  }, [uploadSuccess, uploadFailed]);
  

  const handleClose = () => {
    setUploadClicked(false)
    setSelectedFile(null)
    setUploadFailed(false)
    setUploadSuccess(false)
    setOpenModal(false)
  }



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
          <Button onClick={handleUpload} disabled={(!selectedFile) || (selectedFile && uploadClicked)}>Upload</Button>
          {uploadSuccess && <div style={{color:"green"}}><b>File uploaded successfully</b></div>}
          {uploadFailed && <div style={{color:"red"}}><b>Upload Failed</b></div>}
        </div>
        </Box>
      </Modal>
    </Box>
  );
}