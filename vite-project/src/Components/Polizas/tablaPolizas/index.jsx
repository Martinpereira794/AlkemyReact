import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../UI/Loader';

export default function tablaPolizas() {
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDatos();
    }, []);

    


    const fetchDatos = () => {
        fetch("http://localhost:8080/api/polizas")
            .then((response) => response.json())
            .then((data) => setDatos(data))
            .catch((e) => console.log(e))
            .finally(() => {
                setTimeout(() => setCargando(false), 1000);
            });
    };

    if (cargando) {
        return <Loader />;
    }

    return (
        <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', padding: '20px' }}>
            <Typography variant="h4" sx={{ textAlign: "center", marginTop: "30px", color:"#08426f", fontWeight:"bold", }}>
                Lista de Polizas
            </Typography>
            <Table
                sx={{
                    width: "80%",
                    margin: "0 auto",
                    marginTop: "30px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    overflow: "hidden",
                    tableLayout: "fixed",
                }}


            >
                <TableHead
                sx={{
                    backgroundColor: "#08426f",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                }}
                >
                <TableRow>
                    <TableCell align="center" sx={{ color: "white" }}>Dueño de la póliza</TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>DNI</TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>Tipo de Seguro</TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>Precio</TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>Fecha de Vencimiento</TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>Estado</TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>Acción</TableCell>
                </TableRow>
                </TableHead>

                <TableBody>
                {datos?.slice(0, 5).map((dato) => (
                    <TableRow key={dato.id}>
                    <TableCell align="center">{dato.user.nombre} {dato.user.apellido}</TableCell>
                    <TableCell align="center">{dato.user.dni}</TableCell>
                    <TableCell align="center">{dato.seguro.nombre}</TableCell>
                    <TableCell align="center">{dato.seguro.precio}</TableCell>
                    <TableCell align="center">{dato.fechaVencimiento}</TableCell>
                    <TableCell align="center">{dato.activo ? "Activa" : "Inactiva"}</TableCell>
                    <TableCell align="center">
                        <Button
                        onClick={() => navigate(`/polizas/${dato.id}`)}
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(267deg, rgba(8,66,111,1) 50%, rgba(25,118,210,1) 100%)',
                            borderRadius: '5px',
                            padding: '10px 20px',
                        }}
                        >
                        Ver Más
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    );

}
