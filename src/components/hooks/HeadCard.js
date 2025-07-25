import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import dc from "../lib/DataConfig";
import { useTheme } from '@mui/material/styles';

const HeadCard = ({ show, setShow, setData, available, showLetter, setShowLetter }) => {
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();

  const handleStart = () => {
    setShow(true);
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }, 150);
  };

  const handleReadLetter = () => {
    setShowLetter(true);
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight * 0.8,
        behavior: 'smooth'
      });
    }, 200);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90vw',
    maxHeight: '90vh',
    bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
    boxShadow: theme.palette.mode === 'dark' 
      ? '0 4px 12px rgba(0,0,0,0.5)'
      : '0 4px 12px rgba(0,0,0,0.15)',
    p: 1,
    outline: 'none',
    borderRadius: '8px',
    '& img': {
      width: '100%',
      height: 'auto',
      maxHeight: '85vh',
      objectFit: 'contain'
    }
  };

  return (
    <Card
      className="card-hover"
      sx={{
        maxWidth: "100%",
        marginBottom: "20px",
        display: show ? "none" : "block",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 8px 32px rgba(0,0,0,0.3)'
          : '0 8px 32px rgba(0,0,0,0.1)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
          zIndex: 1,
        },
        '& .MuiCardContent-root': {
          backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
          position: 'relative',
          zIndex: 2,
        },
        '& .MuiCardActions-root': {
          backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
          padding: theme.spacing(2),
          gap: theme.spacing(1),
        },
        '& .MuiTypography-root': {
          color: theme.palette.mode === 'dark' ? '#ffffff' : 'inherit',
        },
        '& .MuiTypography-colorTextSecondary': {
          color: theme.palette.mode === 'dark' ? '#aaaaaa' : 'text.secondary',
        }
      }}
    >
      <CardMedia
        component="img"
        height="400"
        image={dc.headCard.image}
        alt="green iguana"
        sx={{ cursor: 'pointer' }}
        onClick={() => setOpenModal(true)}
      />
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-image"
        sx={{
          backdropFilter: 'blur(5px)',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <Box sx={{
          ...modalStyle,
          bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : 'background.paper',
        }}>
          <img
            src={dc.headCard.image}
            alt="Enlarged view"
            style={{ 
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)'
              }
            }}
          />
        </Box>
      </Modal>
      <CardContent>
        <Typography 
          gutterBottom 
          variant="h5" 
          component="div"
          sx={{
            color: theme.palette.mode === 'dark' ? '#ffffff' : 'inherit',
          }}
        >
          {dc.headCard.title}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{
            color: theme.palette.mode === 'dark' ? '#aaaaaa' : 'text.secondary',
          }}
        >
          {dc.headCard.content}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{
            color: theme.palette.mode === 'dark' ? '#aaaaaa' : 'text.secondary',
          }}
        >
          {dc.headCard.content2}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{
            color: theme.palette.mode === 'dark' ? '#aaaaaa' : 'text.secondary',
          }}
        >
          {dc.headCard.content3}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className="enhanced-button"
          variant="contained"
          onClick={handleStart}
          disabled={showLetter}
          startIcon={<span style={{ fontSize: '1.2em' }}>🚀</span>}
          sx={{
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)'
              : 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
            color: '#ffffff',
            fontWeight: 600,
            borderRadius: '12px',
            textTransform: 'none',
            padding: theme.spacing(1.5, 3),
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            '&:hover': {
              background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
              boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
              transform: 'translateY(-2px)',
            },
            '&:disabled': {
              background: theme.palette.mode === 'dark' ? '#3a3a3a' : '#e0e0e0',
              color: theme.palette.mode === 'dark' ? '#8a8a8a' : '#9e9e9e',
              boxShadow: 'none',
            }
          }}
        >
          {dc.headCard.button1}
        </Button>
        <Button
          className="enhanced-button"
          variant="outlined"
          onClick={handleReadLetter}
          disabled={available}
          startIcon={<span style={{ fontSize: '1.2em' }}>📖</span>}
          sx={{
            borderColor: theme.palette.mode === 'dark' ? '#667eea' : '#667eea',
            color: theme.palette.mode === 'dark' ? '#667eea' : '#667eea',
            fontWeight: 600,
            borderRadius: '12px',
            textTransform: 'none',
            padding: theme.spacing(1.5, 3),
            borderWidth: '2px',
            '&:hover': {
              borderColor: '#764ba2',
              color: '#764ba2',
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(118, 75, 162, 0.1)' 
                : 'rgba(102, 126, 234, 0.05)',
              borderWidth: '2px',
              transform: 'translateY(-2px)',
            },
            '&:disabled': {
              borderColor: theme.palette.mode === 'dark' ? '#3a3a3a' : '#e0e0e0',
              color: theme.palette.mode === 'dark' ? '#8a8a8a' : '#9e9e9e',
            }
          }}
        >
          {dc.headCard.button2}
        </Button>
      </CardActions>
    </Card>
  );
};

export default HeadCard;