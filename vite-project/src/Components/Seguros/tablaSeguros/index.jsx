import { Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Loader from '../../UI/Loader';
import Grid from '@mui/material/Grid2';

export default function TablaSeguros() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetchDatos();
  }, []);

  const fetchDatos = () => {
    fetch('http://localhost:8080/api/seguros')
      .then((response) => response.json())
      .then((data) => setDatos(data))
      .catch((e) => console.log(e))
      .finally(() => {
        setTimeout(() => setCargando(false), 1500);
      });
  };

  if (cargando) {
    return <Loader />;
  }

  return (
    <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', padding: '10px 60px' }}>
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        {datos?.map((dato) => (
          <Grid item size={3} key={dato.id}>
            <Card
                sx={{
                    borderRadius: '16px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#ffffff',
                    maxWidth: 350,
                    maxHeight: 350,
                    borderTop: "2px solid #08426f",
                    borderBottom: "2px solid #08426f"

                }}
                >
               <CardContent
                >
                <Typography
                    variant="h5"
                    sx={{
                    height: '80px',
                    }}
                >
                    {dato.nombre}
                </Typography>
                <Typography
                    sx={{
                    height: '100px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 5,
                    }}
                >
                    {dato.descripcion}
                </Typography>
                <Typography
                    sx={{
                    height: '25px',
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    }}
                >
                    ${dato.precio}
                </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: 'center', }}>
                    <Button
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


          </Grid>
        ))}
      </Grid>
    </div>
  );
}
