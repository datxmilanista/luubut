import React from 'react';
import { Skeleton, Card, CardContent, Box, useTheme } from "@mui/material";

const Loading = ({ variant = 'default' }) => {
  const theme = useTheme();

  if (variant === 'music') {
    return (
      <Card sx={{ 
        mb: 2, 
        borderRadius: "16px",
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
      }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          <Skeleton 
            variant="rectangular" 
            width={{ xs: '100%', md: 300 }} 
            height={200} 
            sx={{ borderRadius: '16px 16px 0 0' }}
          />
          <CardContent sx={{ flex: 1 }}>
            <Skeleton variant="text" height={40} width="70%" sx={{ mb: 1 }} />
            <Skeleton variant="text" height={24} width="50%" sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
            </Box>
            <Skeleton variant="rectangular" height={8} sx={{ borderRadius: 1 }} />
          </CardContent>
        </Box>
      </Card>
    );
  }

  if (variant === 'form') {
    return (
      <Card sx={{ 
        mb: 2, 
        borderRadius: "16px",
        p: 2,
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
      }}>
        <Skeleton variant="text" height={32} width="60%" sx={{ mb: 2 }} />
        <Skeleton variant="text" height={20} width="80%" sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" height={56} sx={{ mb: 2, borderRadius: 2 }} />
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: 2 }} />
          <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 2 }} />
        </Box>
      </Card>
    );
  }

  return (
    <Card sx={{ 
      mb: 2, 
      borderRadius: "16px",
      overflow: 'hidden',
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
    }}>
      <Skeleton 
        variant="rectangular" 
        height={200} 
        sx={{ 
          animation: 'wave',
          '&::after': {
            background: `linear-gradient(90deg, transparent, ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)'}, transparent)`
          }
        }}
      />
      <CardContent>
        <Skeleton 
          variant="text" 
          height={40} 
          width="75%" 
          sx={{ 
            mb: 1,
            borderRadius: 1,
          }} 
        />
        <Skeleton 
          variant="text" 
          height={20} 
          width="60%" 
          sx={{ 
            mb: 2,
            borderRadius: 1,
          }} 
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 2 }} />
          <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: 2 }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Loading; 