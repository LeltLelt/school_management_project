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

function ExamResults() {
    const [results, setResults] = useState([]);
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        student_id: "",
        subject_id: "",
        marks: "",
    });

    const getResults = async () => {
        try {
            const response = await api.get("/exam-results");
            setResults(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getData = async () => {
        try {
            const [studentRes, subjectRes] =
                await Promise.all([
                    api.get("/students"),
                    api.get("/subjects"),
                ]);

            setStudents(studentRes.data);
            setSubjects(subjectRes.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getResults();
        getData();
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
            subject_id: "",
            marks: "",
        });

        setOpen(true);
    };

    const handleEdit = (item) => {
        setEditId(item.id);

        setForm({
            student_id: item.student_id || "",
            subject_id: item.subject_id || "",
            marks: item.marks || "",
        });

        setOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editId) {
                await api.put(
                    `/exam-results/${editId}`,
                    form
                );
            } else {
                await api.post("/exam-results", form);
            }

            setOpen(false);
            getResults();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this result?")) {
            return;
        }

        try {
            await api.delete(`/exam-results/${id}`);
            getResults();
        } catch (error) {
            console.log(error);
        }
    };

    const getName = (list, id) => {
        const item = list.find(
            (item) => item.id === id
        );

        return item ? item.name : "-";
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Exam Results
            </Typography>

            <Button
                variant="contained"
                onClick={handleOpenAdd}
                sx={{ mb: 2 }}
            >
                Add Result
            </Button>

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Student</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Marks</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {results.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    {item.id}
                                </TableCell>

                                <TableCell>
                                    {getName(
                                        students,
                                        item.student_id
                                    )}
                                </TableCell>

                                <TableCell>
                                    {getName(
                                        subjects,
                                        item.subject_id
                                    )}
                                </TableCell>

                                <TableCell>
                                    {item.marks}
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
                        ? "Edit Result"
                        : "Add Result"}
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
                        label="Subject"
                        name="subject_id"
                        value={form.subject_id}
                        onChange={handleChange}
                        margin="normal"
                    >
                        {subjects.map((subject) => (
                            <MenuItem
                                key={subject.id}
                                value={subject.id}
                            >
                                {subject.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        fullWidth
                        type="number"
                        label="Marks"
                        name="marks"
                        value={form.marks}
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

export default ExamResults;