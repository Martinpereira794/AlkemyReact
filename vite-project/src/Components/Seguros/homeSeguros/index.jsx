
import React from 'react';
import { Box, Typography, Card, CardActions, CardContent, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TablaSeguros from '../tablaSeguros';

export default function HomeSeguros() {


  const nombre = localStorage.getItem("username");
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', padding: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          minHeight: '40vh',
          padding: '0 100px',
        }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '20px', color: "#08426f" }}
          >
            Los mejores seguros
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: '2rem', fontWeight: '300', lineHeight: '1.5', color: "#08426f" }}
          >
            Elige entre una amplia variedad de seguros diseñados para tu seguridad y tranquilidad          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginTop:"20px",
        }}
      >
       <TablaSeguros/>
       
      </Box>
    </div>
  );
}
