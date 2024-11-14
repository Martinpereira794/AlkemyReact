import React from 'react';
import { Box, Typography, Card, CardActions, CardContent, CardMedia, Button } from '@mui/material';
import logo from "../../assets/img/logo.png";
import polizas from "../../assets/img/polizas.png";
import seguros from "../../assets/img/seguros.png";
import { useNavigate } from 'react-router-dom';

export default function Home() {
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
            Bienvenido {nombre}
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: '2rem', fontWeight: '300', lineHeight: '1.5', color: "#08426f" }}
          >
            Innovando en proteccion para tu tranquilidad
          </Typography>
        </Box>

        <Box
          sx={{
            width: '20%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={logo} width="250px" alt="Logo" />
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
        <Card sx={{ 
          maxWidth: 350, 
          borderRadius: '15px', 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          borderTop: "2px solid #08426f",
          borderBottom: "2px solid #08426f"
         }}>
          <CardMedia
            component="img"
            image={seguros}
            alt="Seguros"
            sx={{ height: 130, objectFit: 'cover',}}
          />
          <CardContent sx={{textAlign:"center"}}>
            <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'hsl(0, 0%, 13%)' }}>
              Seguros
            </Typography>
            <Typography variant="body2" sx={{ color: 'hsl(0, 0%, 29%)' }}>
              Innovando en proteccion para tu tranquilidad con tecnologia de vanguardia
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button
              onClick={() => navigate(`/seguros`)}
              variant="contained"
              sx={{
                background: 'linear-gradient(267deg, rgba(8,66,111,1) 50%, rgba(25,118,210,1) 100%)',
                borderRadius: '10px',
                padding: '10px 20px',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'none',
                width:"90%"

              }}
            >
              Más información
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 350, 
          borderRadius: '15px', 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          borderTop: "2px solid #08426f",
          borderBottom: "2px solid #08426f" }}>
          <CardMedia
            component="img"
            image={polizas}
            alt="Seguros"
            sx={{ height: 130, objectFit: 'cover',}}
          />
          <CardContent sx={{textAlign:"center"}}>
            <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'hsl(0, 0%, 13%)' }}>
              Mis polizas
            </Typography>
            <Typography variant="body2" sx={{ color: 'hsl(0, 0%, 29%)' }}>
            Consulta y administra todas tus pólizas de propiedad en un solo lugar
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button
              onClick={() => navigate(`/seguros`)}
              variant="contained"
              sx={{
                background: 'linear-gradient(267deg, rgba(8,66,111,1) 50%, rgba(25,118,210,1) 100%)',
                borderRadius: '10px',
                padding: '10px 20px',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'none',
                width:"90%"
              }}
            >
              Más información
            </Button>
          </CardActions>
        </Card>
       
      </Box>
    </div>
  );
}
