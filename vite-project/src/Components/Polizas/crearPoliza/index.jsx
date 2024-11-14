import React, { useState, useEffect } from 'react';
import { TextField, Card, Button, Typography, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Loader from '../../UI/Loader';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';



export default function CrearPoliza() {
  const [form, setForm] = useState({
    fechaEmision: '',
    fechaVencimiento: '',
    userId: '',
    seguroId: '',
  });
  const [polizas, setPolizas] = useState([]);
  const [users, setUsers] = useState([]);
  const [seguros, setSeguros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [alertaSuccess, setAlertaSuccess] = useState(false);
  const [alertaError, setAlertaError] = useState(false);



  useEffect(() => {
    fetchUsuarios();
    fetchSeguros();
    fetchPolizas();
  }, []);

  const fetchUsuarios = () => {
    fetch('http://localhost:8080/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((e) => console.error(e))
      .finally(() => setTimeout(() => setCargando(false), 1000));
  };

  const fetchSeguros = () => {
    fetch('http://localhost:8080/api/seguros')
      .then((response) => response.json())
      .then((data) => setSeguros(data))
      .catch((e) => console.error(e))
      .finally(() => setTimeout(() => setCargando(false), 1000));
  };

  const fetchPolizas = () => {
    fetch('http://localhost:8080/api/polizas')
      .then((response) => response.json())
      .then((data) => setPolizas(data))
      .catch((e) => console.error(e))
      .finally(() => setTimeout(() => setCargando(false), 1000));
  };

  const crear = (e) => {
    e.preventDefault();
  
    const nuevaPoliza = {
      fechaEmision: form.fechaEmision,
      fechaVencimiento: form.fechaVencimiento,
      user: { id: form.userId },
      seguro: { id: form.seguroId },
    };
  
    fetch('http://localhost:8080/api/polizas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaPoliza),
    })
      .then((response) => response.json())
      .then((data) => {
        setPolizas([...polizas, data]);
        setForm({
          fechaEmision: '',
          fechaVencimiento: '',
          userId: '',
          seguroId: '',
        });
        setAlertaSuccess(true);
        setTimeout(() => setAlertaSuccess(false), 1000); 
      })
      .catch((e) => {
        console.error(e);
        setAlertaError(true);
        setTimeout(()=> setAlertaError(false), 1000)
      })
      .finally(() => setCargando(false));
  };


  if (cargando) {
    return <Loader />;
  }

  return (
    <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', padding: '20px' }}>
      <Card
        sx={{
          width: '80%',
          margin: '0 auto',
          marginTop: '5vh',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '16px',
        }}
      >
              {alertaSuccess && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" sx={{ marginBottom: '20px' }}>
          Póliza creada con éxito.
        </Alert>
      )}
      {alertaError && (
        <Alert icon={<ErrorOutlineIcon fontSize="inherit" />} severity="error" sx={{ marginBottom: '20px' }}>
          Hubo un error al crear la póliza.
        </Alert>
      )}
        <form onSubmit={crear} sx={{ marginBottom: '20px' }}>
          <Typography variant="h4" gutterBottom sx={{ margin: '10vh', textAlign:"center" }}>
            Crear Póliza
          </Typography>

          <Grid container spacing={2} sx={{ margin: '10vh' }}>
            <Grid item size={12} sm={6}>
              <TextField
                label="Fecha de Emisión"
                type="date"
                value={form.fechaEmision}
                onChange={(e) => setForm({ ...form, fechaEmision: e.target.value })}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item size={12} sm={6}>
              <TextField
                label="Fecha de Vencimiento"
                type="date"
                value={form.fechaVencimiento}
                onChange={(e) => setForm({ ...form, fechaVencimiento: e.target.value })}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item size={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Usuario</InputLabel>
                <Select
                  label="Usuario"
                  value={form.userId}
                  onChange={(e) => setForm({ ...form, userId: e.target.value })}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.nombre} {user.apellido} {user.dni}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item size={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Seguro</InputLabel>
                <Select
                  label="Seguro"
                  value={form.seguroId}
                  onChange={(e) => setForm({ ...form, seguroId: e.target.value })}
                >
                  {seguros.map((seguro) => (
                    <MenuItem key={seguro.id} value={seguro.id}>
                      {seguro.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Button
                margin="margin 0 auto"
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  background: 'linear-gradient(267deg, rgba(8,66,111,1) 50%, rgba(25,118,210,1) 100%)',
                  padding: '10px 20px',
                  borderRadius: '5px',
                }}
              >
                Crear Poliza
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </div>
  );
}
