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
    MenuItem,
} from "@mui/material";

import api from "../services/api";

function Classes() {
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        name: "",
        teacher_id: "",
    });

    const getClasses = async () => {
        try {
            const response = await api.get("/classes");
            setClasses(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getTeachers = async () => {
        try {
            const response = await api.get("/teachers");
            setTeachers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getClasses();
        getTeachers();
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
            teacher_id: "",
        });

        setOpen(true);
    };

    const handleEdit = (item) => {
        setEditId(item.id);

        setForm({
            name: item.name || "",
            teacher_id: item.teacher_id || "",
        });

        setOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editId) {
                await api.put(`/classes/${editId}`, form);
            } else {
                await api.post("/classes", form);
            }

            setOpen(false);
            getClasses();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this class?")) {
            return;
        }

        try {
            await api.delete(`/classes/${id}`);
            getClasses();
        } catch (error) {
            console.log(error);
        }
    };

    const getTeacherName = (teacherId) => {
        const teacher = teachers.find(
            (item) => item.id === teacherId
        );

        return teacher ? teacher.name : "-";
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Classes
            </Typography>

            <Button
                variant="contained"
                onClick={handleOpenAdd}
                sx={{ mb: 2 }}
            >
                Add Class
            </Button>

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Class Name</TableCell>
                            <TableCell>Teacher</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {classes.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>

                                <TableCell>
                                    {item.name}
                                </TableCell>

                                <TableCell>
                                    {getTeacherName(
                                        item.teacher_id
                                    )}
                                </TableCell>

                                <TableCell>
                                    <Button
                                        onClick={() =>
                                            handleEdit(item)
                                        }
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        color="error"
                                        onClick={() =>
                                            handleDelete(item.id)
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
                    {editId ? "Edit Class" : "Add Class"}
                </DialogTitle>

                <DialogContent>
                    <TextField
                        fullWidth
                        label="Class Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        margin="normal"
                    />

                    <TextField
                        select
                        fullWidth
                        label="Teacher"
                        name="teacher_id"
                        value={form.teacher_id}
                        onChange={handleChange}
                        margin="normal"
                    >
                        {teachers.map((teacher) => (
                            <MenuItem
                                key={teacher.id}
                                value={teacher.id}
                            >
                                {teacher.name}
                            </MenuItem>
                        ))}
                    </TextField>
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

export default Classes;