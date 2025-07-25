import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Tooltip,
  Zoom,
  Avatar
} from '@mui/material';
import {
  Facebook,
  Instagram,
  GitHub,
  Email,
  Language
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const ContactAuthor = () => {
  const theme = useTheme();

  const socialLinks = [
    {
      icon: <Facebook />,
      url: "https://www.facebook.com/mrdatdepzai",
      label: "Facebook",
      color: "#1877f2"
    },
    {
      icon: <Instagram />,
      url: "https://www.instagram.com/mrdatdepzai",
      label: "Instagram",
      color: "#e4405f"
    },
    {
      icon: <GitHub />,
      url: "https://github.com/mrdatdepzai",
      label: "GitHub",
      color: "#333"
    },
    {
      icon: <Email />,
      url: "mailto:dat037sk@gmail.com",
      label: "Email",
      color: "#ea4335"
    },
    {
      icon: <Language />,
      url: "https://nguyendat.net",
      label: "Website",
      color: "#2196f3"
    }
  ];

  return (
    <Card 
      className="card-hover"
      sx={{ 
        mt: 2,
        mb: 2,
        borderRadius: '12px',
        bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)'
          : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
      }}
    >
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          mb: 2 
        }}>
          <Avatar
            src="/images/avatar.jpg"
            sx={{ 
              width: 80, 
              height: 80, 
              mb: 2,
              border: `3px solid ${theme.palette.mode === 'dark' ? '#2d2d2d' : '#fff'}`,
              boxShadow: theme.palette.mode === 'dark' 
                ? '0 4px 12px rgba(0,0,0,0.3)'
                : '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              }
            }}
          />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              mb: 0.5
            }}
          >
            Nguyen Huu Dat
          </Typography>
          <Typography 
            variant="subtitle2" 
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            @mrdatdepzai
          </Typography>
        </Box>
        
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap'
          }}
        >
          {socialLinks.map((social, index) => (
            <Tooltip 
              key={index}
              title={social.label}
              TransitionComponent={Zoom}
              arrow
            >
              <IconButton
                onClick={() => window.open(social.url, '_blank')}
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    color: social.color,
                    backgroundColor: 'rgba(0,0,0,0.04)'
                  }
                }}
              >
                {social.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContactAuthor; 