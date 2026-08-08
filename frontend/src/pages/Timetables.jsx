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
    MenuItem,
    Box,
    Paper,
    IconButton,
    InputAdornment
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";


// ========================================
// TIME SETTINGS
// ========================================

const START_HOUR = 7;
const END_HOUR = 18;

const HOUR_HEIGHT = 96;


// ========================================
// DAYS
// ========================================

const days = [
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
    "SUN"
];


// ========================================
// HELPER - START OF WEEK
// ========================================

function getMonday(date) {

    const d = new Date(date);

    const day = d.getDay();

    const difference = day === 0 ? -6 : 1 - day;

    d.setDate(d.getDate() + difference);

    d.setHours(0, 0, 0, 0);

    return d;
}


// ========================================
// DATE FORMAT
// ========================================

function formatDate(date) {

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
    });
}


// ========================================
// TIME FORMAT
// ========================================

function formatTime(time) {

    if (!time) {
        return "";
    }

    const [hour, minute] = time.split(":");

    const date = new Date();

    date.setHours(
        Number(hour),
        Number(minute),
        0
    );

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
    });
}


// ========================================
// GET MINUTES
// ========================================

function getMinutes(time) {

    if (!time) {
        return 0;
    }

    const [hour, minute] = time
        .split(":")
        .map(Number);

    return hour * 60 + minute;
}


// ========================================
// MAIN COMPONENT
// ========================================

function Timetables() {

    const [timetables, setTimetables] = useState([]);

    const [classes, setClasses] = useState([]);

    const [subjects, setSubjects] = useState([]);

    const [teachers, setTeachers] = useState([]);


    // Week currently displayed

    const [currentWeek, setCurrentWeek] = useState(
        getMonday(new Date())
    );


    // Search

    const [search, setSearch] = useState("");

    const [teacherFilter, setTeacherFilter] = useState("");


    // Modal

    const [open, setOpen] = useState(false);

    const [editId, setEditId] = useState(null);


    // Form

    const [form, setForm] = useState({
        class_id: "",
        subject_id: "",
        teacher_id: "",
        date: "",
        start_time: "",
        end_time: ""
    });


    // ========================================
    // GET TIMETABLES
    // ========================================

    async function getTimetables() {

        try {

            const response =
                await api.get("/timetables");

            setTimetables(response.data);

        } catch (error) {

            console.log(error);

        }
    }


    // ========================================
    // GET CLASSES
    // ========================================

    async function getClasses() {

        try {

            const response =
                await api.get("/classes");

            setClasses(response.data);

        } catch (error) {

            console.log(error);

        }
    }


    // ========================================
    // GET SUBJECTS
    // ========================================

    async function getSubjects() {

        try {

            const response =
                await api.get("/subjects");

            setSubjects(response.data);

        } catch (error) {

            console.log(error);

        }
    }


    // ========================================
    // GET TEACHERS
    // ========================================

    async function getTeachers() {

        try {

            const response =
                await api.get("/teachers");

            setTeachers(response.data);

        } catch (error) {

            console.log(error);

        }
    }


    // ========================================
    // LOAD ALL DATA
    // ========================================

    useEffect(() => {

        getTimetables();
        getClasses();
        getSubjects();
        getTeachers();

    }, []);


    // ========================================
    // OPEN ADD
    // ========================================

    function openAddModal(date = "") {

        setEditId(null);

        setForm({
            class_id: "",
            subject_id: "",
            teacher_id: "",
            date: date,
            start_time: "",
            end_time: ""
        });

        setOpen(true);
    }


    // ========================================
    // CLOSE
    // ========================================

    function closeModal() {

        setOpen(false);

    }


    // ========================================
    // SAVE
    // ========================================

    async function saveTimetable() {

        try {

            if (editId) {

                await api.put(
                    `/timetables/${editId}`,
                    form
                );

            } else {

                await api.post(
                    "/timetables",
                    form
                );

            }

            await getTimetables();

            setForm({
                class_id: "",
                subject_id: "",
                teacher_id: "",
                date: "",
                start_time: "",
                end_time: ""
            });

            setEditId(null);

            setOpen(false);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    }


    // ========================================
    // EDIT
    // ========================================

    function editTimetable(item) {

        setEditId(item.id);

        setForm({
            class_id: item.class_id,
            subject_id: item.subject_id,
            teacher_id: item.teacher_id,
            date: item.date,
            start_time: item.start_time,
            end_time: item.end_time
        });

        setOpen(true);
    }


    // ========================================
    // DELETE
    // ========================================

    async function deleteTimetable(id) {

        if (
            !window.confirm(
                "Delete this schedule?"
            )
        ) {
            return;
        }

        try {

            await api.delete(
                `/timetables/${id}`
            );

            getTimetables();

        } catch (error) {

            console.log(error);

        }
    }


    // ========================================
    // PREVIOUS WEEK
    // ========================================

    function previousWeek() {

        const date = new Date(currentWeek);

        date.setDate(
            date.getDate() - 7
        );

        setCurrentWeek(date);
    }


    // ========================================
    // NEXT WEEK
    // ========================================

    function nextWeek() {

        const date = new Date(currentWeek);

        date.setDate(
            date.getDate() + 7
        );

        setCurrentWeek(date);
    }


    // ========================================
    // TODAY
    // ========================================

    function goToday() {

        setCurrentWeek(
            getMonday(new Date())
        );
    }


    // ========================================
    // WEEK DATES
    // ========================================

    const weekDates = days.map(
        (_, index) => {

            const date =
                new Date(currentWeek);

            date.setDate(
                currentWeek.getDate() + index
            );

            return date;
        }
    );


    // ========================================
    // FILTER TIMETABLES
    // ========================================

    const filteredTimetables =
        timetables.filter((item) => {

            const className =
                classes.find(
                    (c) =>
                        String(c.id) ===
                        String(item.class_id)
                )?.name || "";

            const subjectName =
                subjects.find(
                    (s) =>
                        String(s.id) ===
                        String(item.subject_id)
                )?.name || "";

            const teacherName =
                teachers.find(
                    (t) =>
                        String(t.id) ===
                        String(item.teacher_id)
                )?.name || "";


            const searchText =
                `${className} ${subjectName}`
                    .toLowerCase();


            const matchesSearch =
                searchText.includes(
                    search.toLowerCase()
                );


            const matchesTeacher =
                teacherFilter === "" ||
                String(item.teacher_id) ===
                String(teacherFilter);


            return (
                matchesSearch &&
                matchesTeacher
            );
        });


    // ========================================
    // GET SCHEDULE FOR DAY
    // ========================================

    function getSchedulesForDay(date) {

        const dateString =
            date.toISOString()
                .split("T")[0];

        return filteredTimetables.filter(
            (item) => {

                return item.date === dateString;

            }
        );
    }


    // ========================================
    // GET NAME
    // ========================================

    function getClassName(id) {

        return (
            classes.find(
                (item) =>
                    String(item.id) ===
                    String(id)
            )?.name ||
            `Class ${id}`
        );
    }


    function getSubjectName(id) {

        return (
            subjects.find(
                (item) =>
                    String(item.id) ===
                    String(id)
            )?.name ||
            `Subject ${id}`
        );
    }


    function getTeacherName(id) {

        return (
            teachers.find(
                (item) =>
                    String(item.id) ===
                    String(id)
            )?.name ||
            `Teacher ${id}`
        );
    }


    // ========================================
    // WEEK TITLE
    // ========================================

    const weekStart =
        weekDates[0];

    const weekEnd =
        weekDates[6];


    const weekTitle =
        `${formatDate(weekStart)} – ${formatDate(weekEnd)}`;


    // ========================================
    // RENDER
    // ========================================

    return (

        <Box
            sx={{
                backgroundColor: "#f8fafc",
                minHeight: "100vh",
                p: 3
            }}
        >

            {/* ==================================
                HEADER
            ================================== */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3
                }}
            >

                <Box>

                    <Typography
                        variant="h4"
                        fontWeight="600"
                    >
                        Timetable
                    </Typography>

                    <Typography
                        color="text.secondary"
                    >
                        Weekly class schedule
                    </Typography>

                </Box>


                {/* ADD BUTTON */}

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() =>
                        openAddModal()
                    }
                >
                    ADD SCHEDULE
                </Button>

            </Box>


            {/* ==================================
                TOP CONTROLS
            ================================== */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                    gap: 2,
                    flexWrap: "wrap"
                }}
            >

                {/* SEARCH */}

                <TextField
                    size="small"
                    placeholder="Search class or course..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    sx={{
                        width: 300,
                        backgroundColor: "white"
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />


                {/* TEACHER FILTER */}

                <TextField
                    select
                    size="small"
                    label="Teacher"
                    value={teacherFilter}
                    onChange={(e) =>
                        setTeacherFilter(
                            e.target.value
                        )
                    }
                    sx={{
                        width: 200,
                        backgroundColor: "white"
                    }}
                >

                    <MenuItem value="">
                        All Teachers
                    </MenuItem>

                    {teachers.map(
                        (teacher) => (

                            <MenuItem
                                key={teacher.id}
                                value={teacher.id}
                            >
                                {teacher.name}
                            </MenuItem>

                        )
                    )}

                </TextField>


                {/* WEEK NAVIGATION */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        marginLeft: "auto"
                    }}
                >

                    <Button
                        variant="outlined"
                        onClick={goToday}
                    >
                        TODAY
                    </Button>


                    <IconButton
                        onClick={previousWeek}
                    >
                        <ChevronLeftIcon />
                    </IconButton>


                    <Typography
                        fontWeight="600"
                        sx={{
                            minWidth: 150,
                            textAlign: "center"
                        }}
                    >
                        {weekTitle}
                    </Typography>


                    <IconButton
                        onClick={nextWeek}
                    >
                        <ChevronRightIcon />
                    </IconButton>

                </Box>

            </Box>


            {/* ==================================
                CALENDAR
            ================================== */}

            <Paper
                sx={{
                    overflow: "hidden",
                    border: "1px solid #ddd"
                }}
            >

                {/* DAYS HEADER */}

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns:
                            "58px repeat(7, 1fr)"
                    }}
                >

                    {/* EMPTY */}

                    <Box
                        sx={{
                            borderRight:
                                "1px solid #ddd",
                            borderBottom:
                                "1px solid #ddd"
                        }}
                    />


                    {weekDates.map(
                        (date, index) => {

                            const isToday =
                                date.toDateString() ===
                                new Date()
                                    .toDateString();

                            return (

                                <Box
                                    key={index}
                                    sx={{
                                        height: 70,
                                        p: 1,
                                        borderRight:
                                            "1px solid #ddd",
                                        borderBottom:
                                            "1px solid #ddd",
                                        backgroundColor:
                                            isToday
                                                ? "#e3f2fd"
                                                : "#fff"
                                    }}
                                >

                                    <Typography
                                        variant="caption"
                                        fontWeight="600"
                                    >
                                        {days[index]}
                                    </Typography>

                                    <Typography
                                        variant="h6"
                                        color={
                                            isToday
                                                ? "primary"
                                                : "text.primary"
                                        }
                                    >
                                        {date.getDate()}
                                    </Typography>

                                </Box>

                            );

                        }
                    )}

                </Box>


                {/* CALENDAR BODY */}

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns:
                            "58px repeat(7, 1fr)"
                    }}
                >

                    {/* TIME COLUMN */}

                    <Box>

                        {Array.from(
                            {
                                length:
                                    END_HOUR -
                                    START_HOUR
                            },
                            (_, index) => {

                                const hour =
                                    START_HOUR +
                                    index;

                                return (

                                    <Box
                                        key={hour}
                                        sx={{
                                            height:
                                                HOUR_HEIGHT,
                                            borderRight:
                                                "1px solid #ddd",
                                            borderBottom:
                                                "1px dashed #ddd",
                                            textAlign:
                                                "right",
                                            pr: 1,
                                            pt: 0.5
                                        }}
                                    >

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {hour > 12
                                                ? hour -
                                                  12
                                                : hour}{" "}
                                            {hour >= 12
                                                ? "PM"
                                                : "AM"}
                                        </Typography>

                                    </Box>

                                );

                            }
                        )}

                    </Box>


                    {/* EACH DAY */}

                    {weekDates.map(
                        (date, dayIndex) => {

                            const schedules =
                                getSchedulesForDay(
                                    date
                                );


                            return (

                                <Box
                                    key={dayIndex}
                                    sx={{
                                        position:
                                            "relative",
                                        height:
                                            (END_HOUR -
                                                START_HOUR) *
                                            HOUR_HEIGHT,
                                        borderRight:
                                            "1px solid #ddd",
                                        backgroundColor:
                                            "#fff"
                                    }}
                                >

                                    {/* HOUR LINES */}

                                    {Array.from(
                                        {
                                            length:
                                                END_HOUR -
                                                START_HOUR
                                        },
                                        (_, index) => (

                                            <Box
                                                key={index}
                                                sx={{
                                                    position:
                                                        "absolute",
                                                    top:
                                                        index *
                                                        HOUR_HEIGHT,
                                                    left: 0,
                                                    right: 0,
                                                    height:
                                                        HOUR_HEIGHT,
                                                    borderBottom:
                                                        "1px dashed #ddd"
                                                }}
                                            />

                                        )
                                    )}


                                    {/* PLUS BUTTON */}

                                    <IconButton
                                        size="small"
                                        onClick={() =>
                                            openAddModal(
                                                date.toISOString()
                                                    .split("T")[0]
                                            )
                                        }
                                        sx={{
                                            position:
                                                "absolute",
                                            top: 3,
                                            right: 3,
                                            zIndex: 5
                                        }}
                                    >
                                        <AddIcon
                                            fontSize="small"
                                        />
                                    </IconButton>


                                    {/* SCHEDULES */}

                                    {schedules.map(
                                        (item) => {

                                            const start =
                                                getMinutes(
                                                    item.start_time
                                                );

                                            const end =
                                                getMinutes(
                                                    item.end_time
                                                );


                                            const top =
                                                ((start -
                                                    START_HOUR *
                                                        60) /
                                                    60) *
                                                HOUR_HEIGHT;


                                            const height =
                                                Math.max(
                                                    45,
                                                    ((end -
                                                        start) /
                                                        60) *
                                                        HOUR_HEIGHT
                                                );


                                            return (

                                                <Box
                                                    key={
                                                        item.id
                                                    }
                                                    onClick={() =>
                                                        editTimetable(
                                                            item
                                                        )
                                                    }
                                                    sx={{
                                                        position:
                                                            "absolute",
                                                        top:
                                                            top,
                                                        left: 4,
                                                        right: 4,
                                                        height:
                                                            height,
                                                        backgroundColor:
                                                            "#fce4ec",
                                                        borderLeft:
                                                            "4px solid #ec407a",
                                                        borderRadius:
                                                            1,
                                                        p: 1,
                                                        cursor:
                                                            "pointer",
                                                        zIndex: 2,
                                                        overflow:
                                                            "hidden",
                                                        "&:hover":
                                                            {
                                                                boxShadow:
                                                                    2
                                                            }
                                                    }}
                                                >

                                                    <Typography
                                                        variant="body2"
                                                        fontWeight="700"
                                                        color="#e91e63"
                                                    >
                                                        {getClassName(
                                                            item.class_id
                                                        )}
                                                    </Typography>


                                                    <Typography
                                                        variant="caption"
                                                        display="block"
                                                    >
                                                        {getSubjectName(
                                                            item.subject_id
                                                        )}
                                                    </Typography>


                                                    <Typography
                                                        variant="caption"
                                                        display="block"
                                                    >
                                                        {formatTime(
                                                            item.start_time
                                                        )}
                                                        {" – "}
                                                        {formatTime(
                                                            item.end_time
                                                        )}
                                                    </Typography>


                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {getTeacherName(
                                                            item.teacher_id
                                                        )}
                                                    </Typography>

                                                </Box>

                                            );

                                        }
                                    )}

                                </Box>

                            );

                        }
                    )}

                </Box>

            </Paper>


            {/* ==================================
                ADD / EDIT DIALOG
            ================================== */}

            <Dialog
                open={open}
                onClose={closeModal}
                fullWidth
                maxWidth="sm"
            >

                <DialogTitle>

                    {editId
                        ? "Edit Schedule"
                        : "Add Schedule"
                    }

                </DialogTitle>


                <DialogContent>

                    {/* CLASS */}

                    <TextField
                        select
                        fullWidth
                        label="Class"
                        margin="normal"
                        value={form.class_id}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                class_id:
                                    e.target.value
                            })
                        }
                    >

                        {classes.map(
                            (item) => (

                                <MenuItem
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.name}
                                </MenuItem>

                            )
                        )}

                    </TextField>


                    {/* SUBJECT */}

                    <TextField
                        select
                        fullWidth
                        label="Subject"
                        margin="normal"
                        value={form.subject_id}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                subject_id:
                                    e.target.value
                            })
                        }
                    >

                        {subjects.map(
                            (item) => (

                                <MenuItem
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.name}
                                </MenuItem>

                            )
                        )}

                    </TextField>


                    {/* TEACHER */}

                    <TextField
                        select
                        fullWidth
                        label="Teacher"
                        margin="normal"
                        value={form.teacher_id}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                teacher_id:
                                    e.target.value
                            })
                        }
                    >

                        {teachers.map(
                            (item) => (

                                <MenuItem
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.name}
                                </MenuItem>

                            )
                        )}

                    </TextField>


                    {/* DATE */}

                    <TextField
                        fullWidth
                        type="date"
                        label="Date"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={form.date}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                date:
                                    e.target.value
                            })
                        }
                    />


                    {/* START TIME */}

                    <TextField
                        fullWidth
                        type="time"
                        label="Start Time"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={
                            form.start_time
                        }
                        onChange={(e) =>
                            setForm({
                                ...form,
                                start_time:
                                    e.target.value
                            })
                        }
                    />


                    {/* END TIME */}

                    <TextField
                        fullWidth
                        type="time"
                        label="End Time"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={
                            form.end_time
                        }
                        onChange={(e) =>
                            setForm({
                                ...form,
                                end_time:
                                    e.target.value
                            })
                        }
                    />

                </DialogContent>


                <DialogActions>

                    {editId && (

                        <Button
                            color="error"
                            onClick={() => {

                                deleteTimetable(
                                    editId
                                );

                                setOpen(false);

                            }}
                        >
                            Delete
                        </Button>

                    )}


                    <Button
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>


                    <Button
                        variant="contained"
                        onClick={
                            saveTimetable
                        }
                    >
                        {editId
                            ? "UPDATE"
                            : "ADD"
                        }
                    </Button>

                </DialogActions>

            </Dialog>

        </Box>
    );
}

export default Timetables;