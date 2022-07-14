import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const Question = (props) => {
  return (
    <Card
        sx={{ maxWidth: 300, height:400, cursor: "pointer",position:"relative"}}>
        <CardMedia
            component="img"
            height="330"
            sx={{background: "black"}}/>
        <CardContent>
            <Typography 
                variant="body2" 
                color="text.secondary">
                {props.question}
            </Typography>
        </CardContent>
    </Card>
  )
}

export default Question