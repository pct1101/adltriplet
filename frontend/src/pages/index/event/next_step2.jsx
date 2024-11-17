import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = [" Xác nhận và điền thông tin", "Thanh toán & hoàn tất"];

export default function Next_step2() {
  const [activeStep, setActiveStep] = React.useState(1);

  return (
    <Box sx={{ width: "100%", padding: "15px 75px 10px 75px" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
