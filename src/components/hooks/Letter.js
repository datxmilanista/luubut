import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Collapse,
  Typography,
} from "@mui/material";
// import '../css/Letter.css'

const Letter = ({ show, data, showLetter }) => {
  return (
    <Collapse in={!show & showLetter}>
      <div className="letter-container">
        <Card
          variant="outlined"
          sx={{
            width: "100%",
          }}
        >
            <CardContent
                sx={{pt: 3, pb: 3 }}
            >
                <Typography variant="body1" sx={{ pl: 1, pr: 1, mb:5 }}>
                    <i>Ngày {data.date.day} tháng {data.date.month} năm {data.date.year}
                    <br/>
                    {data.date.hour} giờ {data.date.minute} phút.</i>
                    <br/>
                    <br/>
                    Gửi<strong> Đạt</strong>
                    <br/>
                    <br/>
                    Qua những lần gặp gỡ, ít nhiều, hoặc là tớ chỉ mới quen cậu được vài hôm thui. Tớ chấm cậu được {data.handsome} điểm đó. Mà thôi, cảm nhận của tớ về cậu này: 
                    <br/>
                    <br/>
                    <i>{data.about}</i>
                    <br/>
                    <br/>
                    Mấy năm học cấp ba đã kết thúc, tớ chẳng biết nói gì nữa, thôi thì ngồi ôn lại những gì đã từng là kỉ niệm. Kỉ niệm của chúng ta là đây:
                    <br/>
                    <br/>
                    <i>{data.memories}</i>
                    <br/>
                    <br/>
                    Chà, chúng thật đáng nhớ đúng không, mà thôi, không nhớ cũng được, hehe, nhớ kiến thức để mà ôn thi THPT cho tốt. Nhỡ đâu nhớ hoài thì sao mà thi nhỉ? Dù gì cũng đã ra trường, tớ cũng muốn nhắn cậu rằng:
                    <br/>
                    <br/>
                    <i>{data.message}</i>
                    <br/>
                    <br/>
                    Hết rùi nè, chắc tớ cũng k viết gì nữa, hi vọng là nó k lỗi để tớ còn gửi được =)))). Đỗ KMA nha :3
                    <br/>
                    Kí tên
                    <br/>
                    <strong>{data.name}</strong>.
                </Typography>
            </CardContent>
            <CardActionArea>
            <CardMedia
              component="img"
              height="400"
              image="/images/thank-you.jpg" // Thay thế bằng ảnh cảm ơn
              alt="Klee"
            />
          </CardActionArea>
        </Card>
      </div>
    </Collapse>
  );
};

export default Letter;
