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

function Subjects() {
    const [subjects, setSubjects] = useState([]);

    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        name: "",
    });

    const getSubjects = async () => {
        try {
            const response = await api.get("/subjects");
            setSubjects(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSubjects();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleOpenAdd = () => {
        setEditId(null);
        setForm({ name: "" });
        setOpen(true);
    };

    const handleEdit = (subject) => {
        setEditId(subject.id);

        setForm({
            name: subject.name || "",
        });

        setOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editId) {
                await api.put(`/subjects/${editId}`, form);
            } else {
                await api.post("/subjects", form);
            }

            setOpen(false);
            getSubjects();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this subject?")) {
            return;
        }

        try {
            await api.delete(`/subjects/${id}`);
            getSubjects();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Subjects
            </Typography>

            <Button
                variant="contained"
                onClick={handleOpenAdd}
                sx={{ mb: 2 }}
            >
                Add Subject
            </Button>

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Subject Name</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {subjects.map((subject) => (
                            <TableRow key={subject.id}>
                                <TableCell>{subject.id}</TableCell>

                                <TableCell>
                                    {subject.name}
                                </TableCell>

                                <TableCell>
                                    <Button
                                        onClick={() =>
                                            handleEdit(subject)
                                        }
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        color="error"
                                        onClick={() =>
                                            handleDelete(subject.id)
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
                    {editId ? "Edit Subject" : "Add Subject"}
                </DialogTitle>

                <DialogContent>
                    <TextField
                        fullWidth
                        label="Subject Name"
                        name="name"
                        value={form.name}
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

export default Subjects;