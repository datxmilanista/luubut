import React from 'react';
import { Box, LinearProgress, Typography, useTheme } from '@mui/material';

const ProgressIndicator = ({ currentStep = 1, totalSteps = 6, stepName = '' }) => {
  const theme = useTheme();
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    'Tên của bạn',
    'Đánh giá về tôi', 
    'Chấm điểm',
    'Kỷ niệm chung',
    'Lời nhắn',
    'Hoàn thành'
  ];

  return (
    <Box sx={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(30, 30, 30, 0.95)' 
        : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      padding: theme.spacing(1, 2),
      borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
      transition: 'all 0.3s ease'
    }}>
      <Box sx={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Typography 
          variant="body2" 
          sx={{ 
            minWidth: '120px',
            fontWeight: 500,
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333'
          }}
        >
          Bước {currentStep}/{totalSteps}
        </Typography>
        
        <Box sx={{ flex: 1 }}>
          <LinearProgress 
            variant="determinate" 
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(255,255,255,0.1)' 
                : 'rgba(0,0,0,0.1)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 3,
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                transition: 'transform 0.4s ease'
              }
            }}
          />
        </Box>

        <Typography 
          variant="body2" 
          sx={{ 
            minWidth: '140px',
            textAlign: 'right',
            fontWeight: 500,
            color: theme.palette.mode === 'dark' ? '#aaaaaa' : '#666666'
          }}
        >
          {stepName || steps[currentStep - 1] || ''}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressIndicator;
