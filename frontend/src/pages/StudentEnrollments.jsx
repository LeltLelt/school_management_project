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

function StudentEnrollments() {
    const [enrollments, setEnrollments] = useState([]);
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);

    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        student_id: "",
        class_id: "",
    });

    const getEnrollments = async () => {
        try {
            const response = await api.get(
                "/student-enrollments"
            );

            setEnrollments(response.data);
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

    const getClasses = async () => {
        try {
            const response = await api.get("/classes");
            setClasses(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getEnrollments();
        getStudents();
        getClasses();
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
            class_id: "",
        });

        setOpen(true);
    };

    const handleEdit = (item) => {
        setEditId(item.id);

        setForm({
            student_id: item.student_id || "",
            class_id: item.class_id || "",
        });

        setOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editId) {
                await api.put(
                    `/student-enrollments/${editId}`,
                    form
                );
            } else {
                await api.post(
                    "/student-enrollments",
                    form
                );
            }

            setOpen(false);
            getEnrollments();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this enrollment?")) {
            return;
        }

        try {
            await api.delete(
                `/student-enrollments/${id}`
            );

            getEnrollments();
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

    const getClassName = (id) => {
        const item = classes.find(
            (item) => item.id === id
        );

        return item ? item.name : "-";
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Student Enrollments
            </Typography>

            <Button
                variant="contained"
                onClick={handleOpenAdd}
                sx={{ mb: 2 }}
            >
                Add Enrollment
            </Button>

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Student</TableCell>
                            <TableCell>Class</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {enrollments.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    {item.id}
                                </TableCell>

                                <TableCell>
                                    {getStudentName(
                                        item.student_id
                                    )}
                                </TableCell>

                                <TableCell>
                                    {getClassName(
                                        item.class_id
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
                    {editId
                        ? "Edit Enrollment"
                        : "Add Enrollment"}
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
                        select
                        fullWidth
                        label="Class"
                        name="class_id"
                        value={form.class_id}
                        onChange={handleChange}
                        margin="normal"
                    >
                        {classes.map((item) => (
                            <MenuItem
                                key={item.id}
                                value={item.id}
                            >
                                {item.name}
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

export default StudentEnrollments;