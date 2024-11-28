import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import image from '../../public/image.png'
export default function ActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }} style = {{background: 'none' , color: 'white' , padding: '20px 0 0'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image= {image}
          alt="green iguana"
        />
        <CardContent>
           <Typography variant='h5' color='gold'>
            {props.prayer}
           </Typography>
           <Typography variant='h4' color='text.secodary' padding={'10px 0'}>
            {props.taim}
           </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}