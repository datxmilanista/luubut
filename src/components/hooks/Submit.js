import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardMedia, 
  CardActions, 
  CardActionArea, 
  Button, 
  Typography, 
  Collapse,
  CircularProgress,
  Snackbar,
  Alert,
  LinearProgress
} from "@mui/material";
import emailjs from "@emailjs/browser";
import dc from "../lib/DataConfig";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Submit = ({
  setShowLetter,
  onDevelopmentEnv,
  setShow,
  setData,
  data,
  setAvailable,
  available,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const showMessage = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const validateForm = () => {
    const errors = [];
    if (data.name.length < 2) errors.push("Tên phải có ít nhất 2 ký tự");
    if (data.about.length < 5) errors.push("Đánh giá phải có ít nhất 5 ký tự");
    if (data.memories.length < 5) errors.push("Kỷ niệm phải có ít nhất 5 ký tự");
    if (data.message.length < 5) errors.push("Lời nhắn phải có ít nhất 5 ký tự");
    
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    
    if (errors.length > 0) {
      showMessage(errors.join(', '), 'error');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await submitForm();
      setSubmitSuccess(true);
      showMessage('Gửi thành công! Cảm ơn bạn đã chia sẻ 💖', 'success');
    } catch (error) {
      console.error('Submit error:', error);
      showMessage('Có lỗi xảy ra khi gửi. Vui lòng thử lại!', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitForm = async () => {
    setShow(false);
    setShowLetter(true);
    setAvailable(false);
    
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);

    // Get current date/time
    const date = new Date();
    const time = {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      hour: date.getHours(),
      minute: String(date.getMinutes()).padStart(2, "0"),
    };

    // Update data with timestamp
    const updatedData = { ...data, date: time };
    setData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));

    // Send email with better error handling
    if (!onDevelopmentEnv) {
      try {
        await emailjs.send(
          "service_wx2sjz9",
          "template_85fd4h7",
          {
            name: data.name,
            date_day: time.day,
            date_month: time.month,
            date_year: time.year,
            date_hour: time.hour,
            date_minute: time.minute,
            about_me: data.about,
            memories: data.memories,
            message: data.message,
            point: data.handsome,
          },
          "0jVndDZKFli8zjBvE"
        );
      } catch (error) {
        console.error('EmailJS error:', error);
        throw error;
      }
    }
  };
  

  return (
    <>
      <Collapse in={available && data.message !== "" && data.message !== undefined ? true : false}>
        <div className="submit-container">
          <Card variant="outlined" className="card-hover">
            {isSubmitting && (
              <LinearProgress 
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 1,
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#667eea'
                  }
                }}
              />
            )}
            <CardHeader
              title={dc.submit.title}
              titleTypographyProps={{ variant: "h6", fontWeight: 600 }}
              sx={{
                pl: 3,
                pr: 3,
                pt: 3,
              }}
              subheader={dc.submit.subheader}
              subheaderTypographyProps={{ variant: "subtitle2" }}
            />
            <CardActionArea>
              <CardMedia
                component="img"
                height="400"
                image={dc.submit.image}
                alt="Klee"
                sx={{
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              />
            </CardActionArea>
            <CardContent
              sx={{ borderBottom: 1, borderColor: "divider", pt: 3, pb: 3 }}
            >
              <Typography variant="body1" sx={{ pl: 1, pr: 1, mb: 3, lineHeight: 1.6 }}>
                {dc.submit.content}
                <br />
                <br />
                {dc.submit.content2}
              </Typography>
            </CardContent>
            <CardActions sx={{ pl: 3, pr: 3, pb: 3, pt: 3, gap: 1 }}>
              <Button 
                className="enhanced-button"
                endIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : 
                         submitSuccess ? <CheckCircleIcon /> : <SendRoundedIcon />}
                variant="contained"
                onClick={handleSubmit}
                disabled={isSubmitting}
                sx={{
                  background: submitSuccess 
                    ? 'linear-gradient(45deg, #4caf50 30%, #8bc34a 90%)'
                    : 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                  color: '#ffffff',
                  fontWeight: 600,
                  borderRadius: '12px',
                  textTransform: 'none',
                  padding: '12px 24px',
                  minWidth: '140px',
                  boxShadow: submitSuccess 
                    ? '0 4px 15px rgba(76, 175, 80, 0.4)'
                    : '0 4px 15px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    background: submitSuccess
                      ? 'linear-gradient(45deg, #8bc34a 30%, #4caf50 90%)'
                      : 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: submitSuccess
                      ? '0 6px 20px rgba(76, 175, 80, 0.6)'
                      : '0 6px 20px rgba(102, 126, 234, 0.6)',
                  },
                  '&:disabled': {
                    background: '#e0e0e0',
                    color: '#9e9e9e',
                  }
                }}
              >
                {isSubmitting ? 'Đang gửi...' : 
                 submitSuccess ? 'Đã gửi!' : dc.submit.button}
              </Button>
              <Button 
                variant="text" 
                onClick={() => {
                  window.scrollTo({ top: 750, behavior: "smooth" });
                }}
                disabled={isSubmitting}
                sx={{
                  fontWeight: 500,
                  borderRadius: '12px',
                  textTransform: 'none',
                  padding: '12px 16px',
                }}
              >
                Xem lại
              </Button>
            </CardActions>
          </Card>
        </div>
      </Collapse>
      
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity}
          variant="filled"
          sx={{ 
            borderRadius: '12px',
            '& .MuiAlert-icon': {
              fontSize: '1.2rem'
            }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Submit;
