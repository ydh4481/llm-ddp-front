'use client';

import { DatabaseStep1 } from '@/modules/database/components/steps/DatabaseStep1';
import { DatabaseStep2 } from '@/modules/database/components/steps/DatabaseStep2';
import { DatabaseStep3 } from '@/modules/database/components/steps/DatabaseStep3';
import { useDatabaseStep } from '@/store/useDatabaseStep';
import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useEffect } from 'react';

const steps = ['접속 정보 입력', '테이블 추출', '메타 정보 등록'];

export default function DatabaseCreatePage() {
  const { step, reset } = useDatabaseStep();

  useEffect(() => {
    reset();
  }, [reset]);

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <DatabaseStep1 />;
      case 1:
        return <DatabaseStep2 />;
      case 2:
        return <DatabaseStep3 />;

      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '95%', mx: 'auto', mt: 4 }}>
      <Typography mb={4} variant="h5">
        데이터베이스 등록
      </Typography>

      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={6}>{renderStepContent()}</Box>
    </Box>
  );
}
