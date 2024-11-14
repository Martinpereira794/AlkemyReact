import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Typography, Card, CardContent, Divider, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Loader from '../../UI/Loader';
import PersonIcon from '@mui/icons-material/Person';
import PolicyIcon from '@mui/icons-material/Policy';
import SecurityIcon from '@mui/icons-material/Security';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';


export default function VerPoliza() {
  const { id } = useParams();
  const [poliza, setPoliza] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [alertaBorrar, setAlertaBorrar] = useState(false);
  const [alertaSuccess, setAlertaSuccess] = useState(false);

  const navigate = useNavigate();

  const redirect = () => {
    setCargando(true);
    setTimeout(() => {
      navigate(`/polizas/${id}/edit`);
    }, 2000); 
  };

  const alertaSi = () => {
    setAlertaBorrar(true); 
  };

  const alertaNo = () => {
    setAlertaBorrar(false); 
  };

  const eliminarPoliza = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Token no encontrado. Redirigiendo al login.");
      navigate("/"); 
      return;
    }

    fetch(`http://localhost:8080/api/polizas/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      setAlertaSuccess(true);
      setTimeout(() => {
        setAlertaSuccess(false); 
        navigate("/polizas");
      }, 2000);
    })
      .catch((e) => console.error(e))
      .finally(() => setAlertaBorrar(false)); 
  };



  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Token no encontrado. Redirigiendo al login.");
      navigate("/"); 
      return;
    }

    fetch(`http://localhost:8080/api/polizas/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setPoliza(data))
      .catch((e) => console.error(e))
      .finally(() => setTimeout(() => setCargando(false), 1000));
  }, [id, navigate]);

  if (cargando) {
    return <Loader />;
  }

  if (!poliza) {
    return <Typography variant="h6">No se encontro la poliza.</Typography>;
  }

  return (
    <>
      <Grid container spacing={3} sx={{ marginTop: '30px', justifyContent: 'center' }}>
        <Grid item xs={12} md={10}>
          {alertaSuccess && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" sx={{ marginBottom: '20px' }}>
            Poliza eliminada con exito
          </Alert>
          )}
          <Card sx={{ borderRadius: "16px", padding: '30px', boxShadow: '0 6px 24px rgba(0, 0, 0, 0.15)' }}>
            <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: 'bold', textAlign: 'center', color: '#08426f' }}>
              Detalle de Poliza
            </Typography>
            <CardContent>
              <Grid container spacing={4} justifyContent="center">
                <Grid item size={6} md={5}>
                  <Divider sx={{ marginBottom: '20px' }}>
                    <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#08426f', justifyContent: 'center' }}>
                      <PersonIcon sx={{ marginRight: '8px' }} /> Informacion del Usuario
                    </Typography>
                    </Divider>
                  <Box textAlign="center">
                    <Typography variant="body1"><strong>Nombre:</strong> {poliza.user.nombre} {poliza.user.apellido}</Typography>
                    <Typography variant="body1"><strong>DNI:</strong> {poliza.user.dni}</Typography>
                    <Typography variant="body1"><strong>Email:</strong> {poliza.user.email}</Typography>
                    <Typography variant="body1"><strong>Teléfono:</strong> {poliza.user.telefono}</Typography>
                    <Typography variant="body1"><strong>País:</strong> {poliza.user.pais}</Typography>
                  </Box>
                </Grid>
                <Grid item size={6} md={5}>
                  <Divider sx={{ marginBottom: '20px' }}>
                    <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#009688', justifyContent: 'center' }}>
                      <SecurityIcon sx={{ marginRight: '8px' }} /> Informacion del Seguro
                    </Typography>
                  </Divider>
                  <Box textAlign="center">
                    <Typography variant="body1"><strong>Nombre del Seguro:</strong> {poliza.seguro.nombre}</Typography>
                    <Typography variant="body1"><strong>Descripcion:</strong> {poliza.seguro.descripcion}</Typography>
                    <Typography variant="body1"><strong>Precio:</strong> ${poliza.seguro.precio}</Typography>
                  </Box>
                </Grid>
                <Grid item size={12}>
                  
                  <Divider sx={{ marginBottom: '20px' }}>
                    <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#f44336', justifyContent: 'center' }}>
                      <PolicyIcon sx={{ marginRight: '8px' }} /> Informacion de la Póliza
                    </Typography>
                  </Divider>
                  <Box textAlign="center">
                    <Typography variant="body1"><strong>Fecha de Emision:</strong> {new Date(poliza.fechaEmision).toLocaleDateString()}</Typography>
                    <Typography variant="body1"><strong>Fecha de Vencimiento:</strong> {new Date(poliza.fechaVencimiento).toLocaleDateString()}</Typography>
                    <Typography variant="body1"><strong>Estado:</strong> {poliza.activo ? "Activa" : "Inactiva"}</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "20px" }}>
                <Button
                  onClick = {redirect}
                  startIcon={<EditIcon />}
                  sx={{
                    width:150,
                    backgroundColor: "#1976D2",
                    padding: '10px 20px',
                    borderRadius: '5px',
                    color: "#f4f4f4",
                    '&:hover': { backgroundColor: "#08426f" },
                  }}
                >
                  Editar
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  sx={{
                    width:150,
                    backgroundColor: "#F26060",
                    padding: '10px 20px',
                    borderRadius: '5px',
                    color: "#f4f4f4",
                    '&:hover': { backgroundColor: "#D32F2F" },
                  }}
                  onClick={alertaSi} 
                >
                  Eliminar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog
        open={alertaBorrar}
        onClose={alertaNo}  
      >
        <DialogTitle>¿Estas seguro?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            ¿Estás seguro de que deseas eliminar esta poliza? Esta acción es irreversible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={alertaNo} sx={{color:"#08426f"}}>
            No
          </Button>
          <Button onClick={eliminarPoliza} sx={{color:"#D32F2F"}}>
            Sí
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
