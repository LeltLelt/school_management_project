import { useState, useEffect } from "react";
import api from "../services/api";

import {
    Button,
    Typography,
    TextField,
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
    Box
} from "@mui/material";

function Teachers() {

    const [teachers, setTeachers] = useState([]);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: ""
    });

    const [editId, setEditId] = useState(null);
    const [open, setOpen] = useState(false);


    // Get teachers
    async function getTeachers() {

        try {

            const response = await api.get("/teachers");

            setTeachers(response.data);

        } catch (error) {

            console.log(error);

        }
    }


    // Add / Update teacher
    async function saveTeacher() {

        try {

            if (editId) {

                await api.put(
                    `/teachers/${editId}`,
                    form
                );

            } else {

                await api.post(
                    "/teachers",
                    form
                );

            }

            await getTeachers();

            setForm({
                name: "",
                phone: "",
                email: ""
            });

            setEditId(null);
            setOpen(false);

        } catch (error) {

            console.log(error);

        }
    }


    // Delete teacher
    async function deleteTeacher(id) {

        try {

            await api.delete(`/teachers/${id}`);

            getTeachers();

        } catch (error) {

            console.log(error);

        }
    }


    // Edit teacher
    function editTeacher(teacher) {

        setEditId(teacher.id);

        setForm({
            name: teacher.name,
            phone: teacher.phone,
            email: teacher.email
        });

        setOpen(true);
    }


    // Open Add Modal
    function openAddModal() {

        setEditId(null);

        setForm({
            name: "",
            phone: "",
            email: ""
        });

        setOpen(true);
    }


    // Close Modal
    function closeModal() {

        setOpen(false);
    }


    // Load teachers when page opens
    useEffect(() => {

        getTeachers();

    }, []);


    return (

        <Box>

            <Typography
                variant="h4"
                sx={{ marginBottom: 2 }}
            >
                Teacher Management
            </Typography>


            {/* Add Teacher */}

            <Button
                variant="contained"
                onClick={openAddModal}
            >
                Add Teacher
            </Button>


            {/* Add / Edit Dialog */}

            <Dialog
                open={open}
                onClose={closeModal}
                fullWidth
                maxWidth="sm"
            >

                <DialogTitle>

                    {editId
                        ? "Edit Teacher"
                        : "Add Teacher"
                    }

                </DialogTitle>


                <DialogContent>

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
                        label="Phone"
                        margin="normal"
                        value={form.phone}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                phone: e.target.value
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

                </DialogContent>


                <DialogActions>

                    <Button
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>


                    <Button
                        variant="contained"
                        onClick={saveTeacher}
                    >
                        {editId
                            ? "Update"
                            : "Add"
                        }
                    </Button>

                </DialogActions>

            </Dialog>


            {/* Teacher Table */}

            <Paper sx={{ marginTop: 3 }}>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>ID</TableCell>

                            <TableCell>
                                Name
                            </TableCell>

                            <TableCell>
                                Phone
                            </TableCell>

                            <TableCell>
                                Email
                            </TableCell>

                            <TableCell>
                                Action
                            </TableCell>

                        </TableRow>

                    </TableHead>


                    <TableBody>

                        {teachers.map((teacher) => (

                            <TableRow
                                key={teacher.id}
                            >

                                <TableCell>
                                    {teacher.id}
                                </TableCell>

                                <TableCell>
                                    {teacher.name}
                                </TableCell>

                                <TableCell>
                                    {teacher.phone}
                                </TableCell>

                                <TableCell>
                                    {teacher.email}
                                </TableCell>

                                <TableCell>

                                    <Button
                                        variant="outlined"
                                        onClick={() =>
                                            editTeacher(teacher)
                                        }
                                    >
                                        Edit
                                    </Button>


                                    <Button
                                        color="error"
                                        variant="outlined"
                                        sx={{
                                            marginLeft: 1
                                        }}
                                        onClick={() =>
                                            deleteTeacher(
                                                teacher.id
                                            )
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

        </Box>
    );
}

export default Teachers;