import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/img/logo.png';
import segurai from '../../../assets/img/segurai.png';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); 
  }, [localStorage.getItem("token")]); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); 
    navigate("/"); 
  };

  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      justifyContent="space-between"
      sx={{
        paddingY: '10px',
        paddingX: '10%',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
        width: '100%',
      }}
    >
      <Grid 
        item 
        xs={3}
        sx={{
          display: 'flex',  
          alignItems: 'center', 
          gap: 2, 
        }}
      >  
        <Link to="/home">
          <img src={logo} width={"100px"} alt="Logo" />
        </Link>
        <Link to="/home">
          <img src={segurai} width={"100px"} alt="Segurai" />
        </Link>
      </Grid>

      <Grid
        item
        xs={6}  
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        <Link to="/polizas" style={{ textDecoration: 'none' }}>
          <Typography sx={{ fontSize: '18px', color: '#4A4A4A' }}>
            Polizas
          </Typography>
        </Link>
        <Link to="/polizas/crear" style={{ textDecoration: 'none' }}>
          <Typography sx={{ fontSize: '18px', color: '#4A4A4A' }}>
            Crear polizas
          </Typography>
        </Link>
        <Link to="/seguros" style={{ textDecoration: 'none' }}>
          <Typography sx={{ fontSize: '18px', color: '#4A4A4A' }}>
            Seguros
          </Typography>
        </Link>
      </Grid>

      <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {isAuthenticated ? (
          <Button
            variant="contained"
            size="medium"
            sx={{
              fontSize: '16px',
              backgroundColor: '#08426f',
              textTransform: 'none',
              borderRadius: '5px',
              padding: '10px 20px',
              color: '#FFFFFF',
              minWidth: '120px',
            }}
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        ) : (
          <>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  fontSize: '16px',
                  backgroundColor: '#08426f',
                  textTransform: 'none',
                  borderRadius: '5px',
                  padding: '10px 20px',
                  color: '#FFFFFF',
                  minWidth: '120px',
                  marginRight: '10px', 
                }}
              >
                Registrarse
              </Button>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button
                size="medium"
                variant="outlined"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  color: '#08426f',
                  textTransform: 'none',
                  borderRadius: '5px',
                  border: "2px solid  #08426",
                  padding: '10px 20px',
                  minWidth: '120px',
                }}
              >
                Iniciar sesión
              </Button>
            </Link>
          </>
        )}
      </Grid>
    </Grid>
  );
}
