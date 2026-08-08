import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

import {
    Box,
    Button,
    TextField,
    Typography,
    Paper
} from "@mui/material";

function Signup() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        organization_id: ""
    });


    async function handleSignup(e) {

        e.preventDefault();

        try {

            await api.post("/signup", form);

            alert("Signup successful!");

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Signup failed"
            );
        }
    }


    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh"
            }}
        >

            <Paper
                sx={{
                    padding: 4,
                    width: 400
                }}
            >

                <Typography
                    variant="h4"
                    sx={{ mb: 3 }}
                >
                    Sign Up
                </Typography>


                <form onSubmit={handleSignup}>

                    <TextField
                        fullWidth
                        label="Name"
                        margin="normal"
                        value={form.name}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                name: e.target.value
                            })
                        }
                    />


                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        margin="normal"
                        value={form.email}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                email: e.target.value
                            })
                        }
                    />


                    <TextField
                        fullWidth
                        label="Organization ID"
                        type="number"
                        margin="normal"
                        value={form.organization_id}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                organization_id: e.target.value
                            })
                        }
                    />


                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        value={form.password}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                password: e.target.value
                            })
                        }
                    />


                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        margin="normal"
                        value={form.password_confirmation}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                password_confirmation:
                                    e.target.value
                            })
                        }
                    />


                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{ mt: 2 }}
                    >
                        Sign Up
                    </Button>

                </form>


                <Typography sx={{ mt: 2 }}>

                    Already have an account?

                    {" "}

                    <Link to="/login">
                        Login
                    </Link>

                </Typography>

            </Paper>

        </Box>
    );
}

export default Signup;