import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardActionArea,
  Button,
  Collapse,
  Typography, 
  Dialog,
} from "@mui/material";

const Thanks = ({ show, data, available }) => {
  const [openImage, setOpenImage] = useState(false);

  const handleImageClick = () => {
    setOpenImage(true);
  };

  const handleCloseImage = () => {
    setOpenImage(false);
  };

  const handleReadLetter = () => {
    // Handle read letter action
  };

  return (
    <>
      <Collapse 
        in={!show && !available}
        timeout={800}
      >
        <div className="thanks-container">
          <Card
            variant="outlined"
            sx={{
              width: "100%",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <CardContent
              sx={{ pt: 3, pb: 3, borderBottom: 1, borderColor: "divider" }}
            >
              <Typography variant="body1" sx={{ pl: 1, pr: 1, fontStyle: "italic" }}>
                Cảm ơn {data.name} đã gửi thư cho tớ, chắc là tớ sẽ đọc sớm thôi. Thư gửi tớ k biết có đến tay tớ hay không nhưng mà chắc là có đó. Nếu hong đến được thì chúng ta có thể nói chuyện nhaaa. 😺
              </Typography>
            </CardContent>
            <CardActionArea onClick={handleImageClick}>
              <CardMedia
                component="img"
                height="400"
                image="/images/thank-you.jpg"
                alt="Tớ ngồi code sml"
                sx={{
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            </CardActionArea>
            <CardActions sx={{ pl: 2, pr: 2, pt: 2, pb: 2 }}>
              <Button size="small" color="primary" onClick={handleReadLetter}>
                Đọc lại thư
              </Button>
              <Button size="small" color="primary" onClick={() => { window.open("https://m.me/MrDatDepZai", "_blank") }}>
                Direct của tớ
              </Button>
              <Button size="small" color="primary" onClick={() => { window.open("https://open.spotify.com/playlist/05ZbS9r25KsfrJOfKinPbe?si=aad3afacf4c94f4b", "_blank") }}>
                Playlist của tớ nè
              </Button>
            </CardActions>
          </Card>
        </div>
      </Collapse>

      <Dialog
        open={openImage}
        onClose={handleCloseImage}
        maxWidth="xl"
        fullWidth
      >
        <img
          src="/images/thank-you.jpg"
          alt="Tớ ngồi code sml"
          style={{ width: '100%', height: 'auto' }}
        />
      </Dialog>
    </>
  );
};

export default Thanks;
