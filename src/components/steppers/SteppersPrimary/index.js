/* eslint-disable no-unused-vars */
import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const SteppersPrimary = (props) => {
  const { data } = props;

  return (
    <div className="steppers-primary">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={data.activeStep}>
          {data.steps.map((item, index) => {
            const labelProps = {};
            if (item.error) {
              labelProps.optional = (
                <Typography variant="caption" color="error">
                  {item.error}
                </Typography>
              );

              labelProps.error = true;
            }

            return (
              <Step key={index}>
                <StepLabel {...labelProps}>{item.name}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    </div>
  );
};

SteppersPrimary.propTypes = {
  data: PropTypes.object,
};

export default SteppersPrimary;
