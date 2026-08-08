import { useEffect, useState } from "react";
import {
    Button,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Box,
} from "@mui/material";

import api from "../services/api";

function Students() {
    const [students, setStudents] = useState([]);

    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const getStudents = async () => {
        try {
            const response = await api.get("/students");
            setStudents(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getStudents();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleOpenAdd = () => {
        setEditId(null);

        setForm({
            name: "",
            phone: "",
            email: "",
        });

        setOpen(true);
    };

    const handleEdit = (student) => {
        setEditId(student.id);

        setForm({
            name: student.name || "",
            phone: student.phone || "",
            email: student.email || "",
        });

        setOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editId) {
                await api.put(`/students/${editId}`, form);
            } else {
                await api.post("/students", form);
            }

            setOpen(false);
            getStudents();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this student?")) {
            return;
        }

        try {
            await api.delete(`/students/${id}`);
            getStudents();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Students
            </Typography>

            <Button
                variant="contained"
                onClick={handleOpenAdd}
                sx={{ mb: 2 }}
            >
                Add Student
            </Button>

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>
                                    {student.id}
                                </TableCell>

                                <TableCell>
                                    {student.name}
                                </TableCell>

                                <TableCell>
                                    {student.phone}
                                </TableCell>

                                <TableCell>
                                    {student.email}
                                </TableCell>

                                <TableCell>
                                    <Button
                                        onClick={() =>
                                            handleEdit(student)
                                        }
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        color="error"
                                        onClick={() =>
                                            handleDelete(student.id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>
                    {editId ? "Edit Student" : "Add Student"}
                </DialogTitle>

                <DialogContent>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        margin="normal"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Students; 