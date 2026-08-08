import { useEffect, useState } from "react";

import {
    Button,
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
    TextField,
    MenuItem,
} from "@mui/material";

import api from "../services/api";

function Attendances() {
    const [attendances, setAttendances] = useState([]);
    const [students, setStudents] = useState([]);

    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        student_id: "",
        date: "",
        status: 1,
    });

    const getAttendances = async () => {
        try {
            const response = await api.get("/attendances");
            setAttendances(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getStudents = async () => {
        try {
            const response = await api.get("/students");
            setStudents(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAttendances();
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
            student_id: "",
            date: "",
            status: 1,
        });

        setOpen(true);
    };

    const handleEdit = (item) => {
        setEditId(item.id);

        setForm({
            student_id: item.student_id || "",
            date: item.date || "",
            status: item.status ?? 1,
        });

        setOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editId) {
                await api.put(
                    `/attendances/${editId}`,
                    form
                );
            } else {
                await api.post("/attendances", form);
            }

            setOpen(false);
            getAttendances();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this attendance?")) {
            return;
        }

        try {
            await api.delete(`/attendances/${id}`);
            getAttendances();
        } catch (error) {
            console.log(error);
        }
    };

    const getStudentName = (id) => {
        const student = students.find(
            (item) => item.id === id
        );

        return student ? student.name : "-";
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Attendances
            </Typography>

            <Button
                variant="contained"
                onClick={handleOpenAdd}
                sx={{ mb: 2 }}
            >
                Add Attendance
            </Button>

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Student</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {attendances.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>

                                <TableCell>
                                    {getStudentName(
                                        item.student_id
                                    )}
                                </TableCell>

                                <TableCell>
                                    {item.date}
                                </TableCell>

                                <TableCell>
                                    {Number(item.status) === 1
                                        ? "Present"
                                        : "Absent"}
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
                    {editId
                        ? "Edit Attendance"
                        : "Add Attendance"}
                </DialogTitle>

                <DialogContent>
                    <TextField
                        select
                        fullWidth
                        label="Student"
                        name="student_id"
                        value={form.student_id}
                        onChange={handleChange}
                        margin="normal"
                    >
                        {students.map((student) => (
                            <MenuItem
                                key={student.id}
                                value={student.id}
                            >
                                {student.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        fullWidth
                        type="date"
                        label="Date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        select
                        fullWidth
                        label="Status"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        margin="normal"
                    >
                        <MenuItem value={1}>
                            Present
                        </MenuItem>

                        <MenuItem value={0}>
                            Absent
                        </MenuItem>
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

export default Attendances;