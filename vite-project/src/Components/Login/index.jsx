import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Login() {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setUser({ username: "", password: "" });
    }, []);

    const login = async () => {
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.username,
                    password: user.password,
                }),
            });
            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", user.username);
            navigate("/home");
    
        } catch (e) {
            setError(true);
            setErrorMessage("Datos incorrectos");
            setOpenSnackbar(true);
            setUser({
                username: "",
                password: "",
            });
        }
    };
    

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
        <Box sx={{ width: 400, padding: '20px', borderRadius: '8px', backgroundColor: 'white', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
            <Typography variant="h5" sx={{ marginBottom: '20px' }}> Inicio de Sesión </Typography>

            <form>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    error={e}
                    sx={{ marginBottom: '15px' }}
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    error={e}
                    sx={{ marginBottom: '20px' }}
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />

                <Button
                    onClick={login}
                    variant="contained"
                    fullWidth
                    sx={{ 
                      background: 'linear-gradient(267deg, rgba(8,66,111,1) 50%, rgba(25,118,210,1) 100%)',
                      padding: '10px 20px', 
                      borderRadius: '5px'  
                    }}
                >
                    Iniciar Sesión
                </Button>
            </form>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                message={errorMessage}
                action={
                    <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </Box>
      </Box>
    );
}
