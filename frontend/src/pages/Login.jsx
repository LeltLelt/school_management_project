import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
} from "@mui/material";

import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        try {
            const response = await api.post("/login", {
                email: email,
                password: password,
            });

            console.log(response.data);

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/");
        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message ||
                "Email or password is incorrect"
            );
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: 400,
                    padding: 4,
                }}
            >
                <Typography
                    variant="h4"
                    textAlign="center"
                    mb={3}
                >
                    Login
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleLogin}
                >
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        margin="normal"
                    />

                    {error && (
                        <Typography
                            color="error"
                            sx={{ mt: 1 }}
                        >
                            {error}
                        </Typography>
                    )}

                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{ mt: 3 }}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default Login;