import React, { useState, useRef } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Modal,
  IconButton,
  Fade,
  Collapse,
  CardActionArea
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  QueueMusic
} from '@mui/icons-material';
import audioFile from './nhac.mp3';
import styled from '@mui/material/styles/styled';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.palette.mode === 'dark' 
    ? 'none' 
    : '0 2px 4px rgba(0,0,0,0.1)',
}));

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(() => {
    return localStorage.getItem('musicLiked') === 'true';
  });
  const [showLyrics, setShowLyrics] = useState(false);
  const [volume, setVolume] = useState(() => {
    return parseFloat(localStorage.getItem('musicVolume')) || 0.7;
  });
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const audioRef = useRef(null);

  
  const lyrics = [
    { time: 0, text: "Mình cùng nhau đóng băng" },
    { time: 1, text: "Trước giây phút chúng ta chia xa" },
    { time: 3, text: "Thời học sinh lướt qua nhanh" },
    { time: 5, text: "Như giấc mơ không trở lại" },
    { time: 8, text: "Mình phải trải qua" },
    { time: 10, text: "Bạn đừng khóc mà" },
    { time: 12, text: "Bọn mình sẽ lớn" },
    { time: 13, text: "Sẽ đi trên những con đường mới" },
    { time: 17, text: "Là chưa hôm nào đến lớp sớm" },
    { time: 18, text: "Như hôm nay" },
    { time: 20, text: "Trời nắng nhẹ, êm đềm, gió lay" },
    { time: 23, text: "Là cảm xúc khó nói" },
    { time: 25, text: "Chỉ biết đứng ngẩn ngơ" },
    { time: 27, text: "Níu tà áo dài bay bay" },
    { time: 31, text: "Sẽ rất buồn và sẽ hẫng hụt" },
    { time: 34, text: "Sau hôm nay ta cách xa rồi" },
    { time: 38, text: "Đến bao giờ được thêm một lần" },
    { time: 41, text: "Chở nhau thong dong trên chiếc xe đạp" },
    { time: 44, text: "Mình cùng nhau đóng băng" },
    { time: 45, text: "Trước giây phút chúng ta chia xa" },
    { time: 47, text: "Để mình được sống trọn vẹn khoảnh khắc" },
    { time: 49, text: "Thiêng liêng lúc này" },
    { time: 51, text: "Để đừng quên lãng" },
    { time: 52, text: "Để đừng phai nhạt" },
    { time: 54, text: "Để lần cuối ta bên nhau" },
    { time: 56, text: "Sẽ kéo dài mãi mãi" },
    { time: 58, text: "Mình cùng nhau đóng băng" },
    { time: 59, text: "Trước giây phút chúng ta chia xa" },
    { time: 61, text: "Thời học sinh lướt qua nhanh" },
    { time: 62, text: "Như giấc mơ không trở lại" },
    { time: 64, text: "Mình phải trải qua" },
    { time: 66, text: "Bạn đừng khóc mà" },
    { time: 68, text: "Bọn mình sẽ lớn" },
    { time: 70, text: "Sẽ đi trên những con đường mới" },
    { time: 74, text: "Bạn ơi!" }
  ];

  React.useEffect(() => {
    localStorage.setItem('musicLiked', liked.toString());
  }, [liked]);

  React.useEffect(() => {
    localStorage.setItem('musicVolume', volume.toString());
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      const currentTime = audioRef.current.currentTime;
      setProgress((currentTime / duration) * 100 || 0);
      setCurrentTime(currentTime);
      setDuration(duration);
      
      const currentLyric = lyrics.findIndex((lyric, index) => {
        const nextLyric = lyrics[index + 1];
        return currentTime >= lyric.time && (!nextLyric || currentTime < nextLyric.time);
      });
      
      if (currentLyric !== -1 && currentLyric !== currentLyricIndex) {
        setCurrentLyricIndex(currentLyric);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      audioRef.current.volume = volume;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      audioRef.current.currentTime = (newProgress / 100) * duration;
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      }
      setPlaying(!playing);
    }
  };

  return (
    <>
      <Card sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        mb: 2,
        alignItems: 'center'
      }}>
        <CardActionArea onClick={() => setOpenModal(true)}>
          <CardMedia
            component="img"
            sx={{ width: { xs: '100%', md: 300 } }}
            image="/images/music-cover.jpg"
            alt="Live from space album cover"
          />
        </CardActionArea>

        <StyledBox>
          <CardContent sx={{ 
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
          }}>
            <Typography variant="h5" component="div" sx={{
              fontWeight: 500,
              letterSpacing: 0.5,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
              textAlign: 'center'
            }}>
              Mình Cùng Nhau Đóng Băng
            </Typography>
            
            <Typography variant="subtitle1" color="text.secondary">
              A12-K4
            </Typography>
            
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              @mrdatdepzai
            </Typography>

            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2, 
              mb: 2,
              width: '100%',
              justifyContent: 'center'
            }}>
              <IconButton onClick={() => {}} size="small">
                <SkipPrevious />
              </IconButton>
              <IconButton 
                onClick={handlePlayPause} 
                size="large"
                sx={{
                  '&:hover': {
                    transform: 'scale(1.1)',
                    transition: 'transform 0.2s'
                  }
                }}
              >
                {playing ? <Pause /> : <PlayArrow />}
              </IconButton>
              <IconButton onClick={() => {}} size="small">
                <SkipNext />
              </IconButton>
              <IconButton onClick={() => setLiked(!liked)} size="small">
                {liked ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
            </Box>

            <Box sx={{ 
              width: '100%', 
              mb: 2,
              px: 2 
            }}>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                style={{ 
                  width: '100%',
                  height: '4px',
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => setShowLyrics(!showLyrics)}
              >
                {showLyrics ? 'Hide Lyrics' : 'Show Lyrics'}
              </Button>
              <Button 
                variant="outlined" 
                color="success" 
                size="small"
                startIcon={<QueueMusic />}
                onClick={() => window.open("https://open.spotify.com/playlist/2ByAJQseXXgs4I0gsjCrko?si=647f46a8e72b45ac", "_blank")}
              >
                Playlist
              </Button>
            </Box>

            <Collapse in={showLyrics}>
              <Box sx={{ 
                textAlign: 'center', 
                mb: 3,
                maxWidth: '100%',
                px: 3,
                py: 3,
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 50%, rgba(255, 107, 107, 0.1) 100%)',
                borderRadius: '20px',
                border: '2px solid rgba(102, 126, 234, 0.3)',
                backdropFilter: 'blur(15px)',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.6), transparent)',
                  animation: 'shimmer 2s infinite'
                },
                '@keyframes shimmer': {
                  '0%': { transform: 'translateX(-100%)' },
                  '100%': { transform: 'translateX(100%)' }
                }
              }}>
                <Typography 
                  variant="h4" 
                  component="div"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    color: currentLyricIndex >= 0 ? '#667eea' : 'text.secondary',
                    textAlign: 'center',
                    lineHeight: 1.4,
                    minHeight: '3em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: currentLyricIndex >= 0 ? 'scale(1.02)' : 'scale(1)',
                    textShadow: currentLyricIndex >= 0 ? '0 4px 8px rgba(102, 126, 234, 0.4), 0 0 20px rgba(102, 126, 234, 0.2)' : 'none',
                    animation: currentLyricIndex >= 0 ? 'lyricGlow 0.8s ease-in-out' : 'none',
                    background: currentLyricIndex >= 0 ? 'linear-gradient(45deg, #667eea, #764ba2)' : 'none',
                    WebkitBackgroundClip: currentLyricIndex >= 0 ? 'text' : 'none',
                    WebkitTextFillColor: currentLyricIndex >= 0 ? 'transparent' : 'inherit',
                    backgroundClip: currentLyricIndex >= 0 ? 'text' : 'none',
                    letterSpacing: '0.5px',
                    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
                    '@keyframes lyricGlow': {
                      '0%': { 
                        opacity: 0.6, 
                        transform: 'scale(0.98) translateY(5px)',
                        filter: 'blur(1px)'
                      },
                      '50%': { 
                        opacity: 1, 
                        transform: 'scale(1.02) translateY(0px)',
                        filter: 'blur(0px)'
                      },
                      '100%': { 
                        opacity: 1, 
                        transform: 'scale(1.02) translateY(0px)',
                        filter: 'blur(0px)'
                      }
                    }
                  }}
                >
                  {currentLyricIndex >= 0 ? lyrics[currentLyricIndex].text : "🎵 Mình cầm băng đóng nhau ... 🎵"}
                </Typography>

                <Typography 
                  variant="h6" 
                  component="div"
                  sx={{
                    color: 'text.disabled',
                    textAlign: 'center',
                    lineHeight: 1.5,
                    mt: 2,
                    opacity: 0.7,
                    fontStyle: 'italic',
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    fontWeight: 500,
                    minHeight: '2em',
                    transition: 'all 0.4s ease',
                    letterSpacing: '0.3px',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {currentLyricIndex >= 0 && currentLyricIndex < lyrics.length - 1 
                    ? `Tiếp theo: ${lyrics[currentLyricIndex + 1].text}` 
                    : ""}
                </Typography>

                <Box sx={{ 
                  width: '100%', 
                  mt: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  px: 1
                }}>
                  <Typography variant="caption" sx={{ 
                    minWidth: '45px', 
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#667eea',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                  }}>
                    {formatTime(currentTime)}
                  </Typography>
                  <Box sx={{ 
                    flex: 1, 
                    height: '6px', 
                    bgcolor: 'rgba(102, 126, 234, 0.2)', 
                    borderRadius: '3px',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}>
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: `${progress}%`,
                      borderRadius: '3px',
                      transition: 'width 0.2s ease',
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #ff6b6b 100%)',
                      boxShadow: '0 2px 8px rgba(102, 126, 234, 0.4)',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        right: '-2px',
                        width: '4px',
                        height: '100%',
                        borderRadius: '50%',
                        background: '#ffffff',
                        boxShadow: '0 0 8px rgba(102, 126, 234, 0.6)'
                      }
                    }} />
                  </Box>
                  <Typography variant="caption" sx={{ 
                    minWidth: '45px', 
                    fontSize: '0.8rem', 
                    textAlign: 'right',
                    fontWeight: 600,
                    color: '#667eea',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                  }}>
                    {formatTime(duration)}
                  </Typography>
                </Box>

                <Box sx={{ 
                  mt: 3, 
                  maxHeight: '300px', 
                  overflowY: 'auto',
                  width: '100%',
                  bgcolor: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '15px',
                  p: 2,
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  '&::-webkit-scrollbar': {
                    width: '8px'
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(102, 126, 234, 0.1)',
                    borderRadius: '4px'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    borderRadius: '4px',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #764ba2, #667eea)'
                    }
                  }
                }}>
                  {lyrics.map((lyric, index) => (
                    <Typography
                      key={index}
                      variant="body1"
                      sx={{
                        py: 1,
                        px: 2,
                        mb: 0.5,
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        fontWeight: index === currentLyricIndex ? 700 : 500,
                        color: index === currentLyricIndex ? '#ffffff' : 
                               index < currentLyricIndex ? 'text.disabled' : 'text.secondary',
                        bgcolor: index === currentLyricIndex ? 'rgba(102, 126, 234, 0.3)' : 'transparent',
                        opacity: index === currentLyricIndex ? 1 : 
                                index < currentLyricIndex ? 0.6 : 0.8,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        borderRadius: '10px',
                        border: index === currentLyricIndex ? '2px solid rgba(102, 126, 234, 0.5)' : '1px solid transparent',
                        transform: index === currentLyricIndex ? 'scale(1.02)' : 'scale(1)',
                        textShadow: index === currentLyricIndex ? '0 2px 4px rgba(0, 0, 0, 0.3)' : 'none',
                        boxShadow: index === currentLyricIndex ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none',
                        '&:hover': {
                          bgcolor: 'rgba(102, 126, 234, 0.2)',
                          transform: 'scale(1.01)',
                          boxShadow: '0 2px 8px rgba(102, 126, 234, 0.2)'
                        },
                        textAlign: 'left',
                        letterSpacing: '0.3px',
                        lineHeight: 1.6
                      }}
                      onClick={() => {
                        if (audioRef.current) {
                          audioRef.current.currentTime = lyric.time;
                        }
                      }}
                    >
                      <span style={{ 
                        marginRight: '12px', 
                        fontSize: '0.8rem', 
                        opacity: 0.7,
                        fontWeight: 600,
                        color: index === currentLyricIndex ? '#ffffff' : '#667eea',
                        background: index === currentLyricIndex ? 'rgba(255, 255, 255, 0.2)' : 'rgba(102, 126, 234, 0.1)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        display: 'inline-block',
                        minWidth: '35px',
                        textAlign: 'center'
                      }}>
                        {formatTime(lyric.time)}
                      </span>
                      {lyric.text}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Collapse>
          </CardContent>
        </StyledBox>
      </Card>

      <audio
        ref={audioRef}
        src={audioFile}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setPlaying(false);
          setCurrentLyricIndex(-1);
        }}
        onError={(e) => console.error("Audio error:", e)}
      />

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        sx={{
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <Fade in={openModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            maxWidth: '90vw',
            maxHeight: '90vh',
          }}>
            <img
              src="/images/music-cover.jpg" 
              alt="Enlarged view"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default MusicPlayer;
