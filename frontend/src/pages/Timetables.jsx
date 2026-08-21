import React, { useState, useEffect } from "react";
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

const START_HOUR = 7;
const END_HOUR = 18;
const HOUR_HEIGHT = 96;

const days = [
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
    "SUN"
];

function getMonday(date) {
    const d = new Date(date);

    const day = d.getDay();

    const difference =
        day === 0 ? -6 : 1 - day;

    d.setDate(d.getDate() + difference);

    d.setHours(0, 0, 0, 0);

    return d;
}

function formatDate(date) {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
    });
}

function formatTime(time) {
    if (!time) return "";

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

function getMinutes(time) {
    if (!time) return 0;

    const [hour, minute] = time
        .split(":")
        .map(Number);

    return hour * 60 + minute;
}

function Timetables() {

    // =========================================
    // DATA
    // =========================================

    const [timetables, setTimetables] = useState([]);

    const [classes, setClasses] = useState([]);

    const [subjects, setSubjects] = useState([]);

    const [teachers, setTeachers] = useState([]);

    // =========================================
    // CLASS
    // =========================================

    const [selectedClass, setSelectedClass] =
        useState("");

    // =========================================
    // TIMETABLE GROUP
    // =========================================

    const [timetableGroups, setTimetableGroups] =
        useState([]);

    const [selectedTimetableGroup, setSelectedTimetableGroup] =
        useState("");

    // =========================================
    // ADD TIMETABLE DIALOG
    // =========================================

    const [groupOpen, setGroupOpen] =
        useState(false);

    const [newGroupName, setNewGroupName] =
        useState("");

    const [creatingGroup, setCreatingGroup] =
        useState(false);

    // =========================================
    // WEEK
    // =========================================

    const [currentWeek, setCurrentWeek] =
        useState(getMonday(new Date()));

    // =========================================
    // SEARCH
    // =========================================

    const [search, setSearch] =
        useState("");

    const [teacherFilter, setTeacherFilter] =
        useState("");

    // =========================================
    // ADD / EDIT LESSON DIALOG
    // =========================================

    const [open, setOpen] =
        useState(false);

    const [editId, setEditId] =
        useState(null);

    // =========================================
    // LESSON FORM
    // =========================================

    const [form, setForm] = useState({
        class_id: "",
        subject_id: "",
        teacher_id: "",
        timetable_group_id: "",
        date: "",
        start_time: "",
        end_time: ""
    });

    // =========================================
    // GET TIMETABLES
    // =========================================

    async function getTimetables(
        timetableGroup = selectedTimetableGroup,
        classId = selectedClass
    ) {

        try {

            let url = "/timetables";

            const params = new URLSearchParams();

            // IMPORTANT:
            // Filter by CLASS
            if (classId) {
                params.append(
                    "class_id",
                    classId
                );
            }

            // IMPORTANT:
            // Filter by TIMETABLE
            if (timetableGroup) {
                params.append(
                    "timetable_group_id",
                    timetableGroup
                );
            }

            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            const response =
                await api.get(url);

            setTimetables(
                response.data
            );

        } catch (error) {

            console.log(
                "GET TIMETABLE ERROR:",
                error
            );

        }
    }

    // =========================================
    // GET CLASSES
    // =========================================

    async function getClasses() {

        try {

            const response =
                await api.get("/classes");

            setClasses(
                response.data
            );

        } catch (error) {

            console.log(error);

        }
    }

    // =========================================
    // GET SUBJECTS
    // =========================================

    async function getSubjects() {

        try {

            const response =
                await api.get("/subjects");

            setSubjects(
                response.data
            );

        } catch (error) {

            console.log(error);

        }
    }

    // =========================================
    // GET TEACHERS
    // =========================================

    async function getTeachers() {

        try {

            const response =
                await api.get("/teachers");

            setTeachers(
                response.data
            );

        } catch (error) {

            console.log(error);

        }
    }

    // =========================================
    // GET TIMETABLE GROUPS
    // =========================================

    async function getTimetableGroups(
        classId
    ) {

        try {

            if (!classId) {

                setTimetableGroups([]);

                setSelectedTimetableGroup("");

                setTimetables([]);

                return;
            }

            const response =
                await api.get(
                    `/timetable_groups?class_id=${classId}`
                );

            const groups =
                response.data;

            setTimetableGroups(
                groups
            );

            if (groups.length > 0) {

                const firstGroup =
                    String(groups[0].id);

                setSelectedTimetableGroup(
                    firstGroup
                );

                await getTimetables(
                    firstGroup,
                    classId
                );

            } else {

                setSelectedTimetableGroup("");

                setTimetables([]);

            }

        } catch (error) {

            console.log(
                "GET GROUP ERROR:",
                error
            );

        }
    }

    // =========================================
    // INITIAL LOAD
    // =========================================

    useEffect(() => {

        getClasses();

        getSubjects();

        getTeachers();

    }, []);

    // =========================================
    // CLASS CHANGE
    // =========================================

    async function handleClassChange(e) {

        const classId =
            e.target.value;

        setSelectedClass(
            classId
        );

        setSelectedTimetableGroup("");

        setTimetableGroups([]);

        setTimetables([]);

        if (classId) {

            await getTimetableGroups(
                classId
            );

        }

    }

    // =========================================
    // TIMETABLE CHANGE
    // =========================================

    async function handleTimetableChange(e) {

        const groupId =
            e.target.value;

        setSelectedTimetableGroup(
            groupId
        );

        await getTimetables(
            groupId,
            selectedClass
        );
    }

    // =========================================
    // CREATE TIMETABLE
    // =========================================

    async function createTimetableGroup() {

        if (!selectedClass) {

            alert(
                "Please select a class first."
            );

            return;
        }

        if (!newGroupName.trim()) {

            alert(
                "Please enter timetable name."
            );

            return;
        }

        try {

            setCreatingGroup(true);

            // CREATE GROUP
            const response =
                await api.post(
                    "/timetable_groups",
                    {
                        class_id:
                            selectedClass,

                        name:
                            newGroupName.trim()
                    }
                );

            const newGroup =
                response.data.data;

            // GET UPDATED GROUPS
            const groupsResponse =
                await api.get(
                    `/timetable_groups?class_id=${selectedClass}`
                );

            const groups =
                groupsResponse.data;

            setTimetableGroups(
                groups
            );

            // SELECT NEW TIMETABLE
            setSelectedTimetableGroup(
                String(newGroup.id)
            );

            // CLEAR OLD LESSONS
            setTimetables([]);

            // CLOSE DIALOG
            setNewGroupName("");

            setGroupOpen(false);

            // LOAD NEW TIMETABLE
            await getTimetables(
                String(newGroup.id),
                selectedClass
            );

        } catch (error) {

            console.log(
                "CREATE GROUP ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to create timetable"
            );

        } finally {

            setCreatingGroup(false);

        }
    }

    // =========================================
    // OPEN ADD LESSON
    // =========================================

    function openAddModal(
        date = ""
    ) {

        if (!selectedClass) {

            alert(
                "Please select a class first."
            );

            return;
        }

        if (!selectedTimetableGroup) {

            alert(
                "Please select a timetable first."
            );

            return;
        }

        setEditId(null);

        setForm({

            class_id:
                selectedClass,

            subject_id:
                "",

            teacher_id:
                "",

            // IMPORTANT:
            // LESSON IS CONNECTED
            // TO SELECTED TIMETABLE
            timetable_group_id:
                selectedTimetableGroup,

            date:
                date,

            start_time:
                "",

            end_time:
                ""

        });

        setOpen(true);
    }

    // =========================================
    // CLOSE LESSON DIALOG
    // =========================================

    function closeModal() {

        setOpen(false);

    }

    // =========================================
    // SAVE LESSON
    // =========================================

    async function saveTimetable() {

        try {

            if (!form.timetable_group_id) {

                alert(
                    "Please select a timetable."
                );

                return;
            }

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

            await getTimetables(
                selectedTimetableGroup,
                selectedClass
            );

            setOpen(false);

            setEditId(null);

        } catch (error) {

            console.log(
                "SAVE LESSON ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }
    }

    // =========================================
    // EDIT LESSON
    // =========================================

    function editTimetable(item) {

        setEditId(
            item.id
        );

        setForm({

            class_id:
                item.class_id,

            subject_id:
                item.subject_id,

            teacher_id:
                item.teacher_id,

            timetable_group_id:
                item.timetable_group_id,

            date:
                item.date,

            start_time:
                item.start_time,

            end_time:
                item.end_time

        });

        setOpen(true);
    }

    // =========================================
    // DELETE LESSON
    // =========================================

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

            setOpen(false);

            await getTimetables(
                selectedTimetableGroup,
                selectedClass
            );

        } catch (error) {

            console.log(error);

        }
    }

    // =========================================
    // WEEK NAVIGATION
    // =========================================

    function previousWeek() {

        const date =
            new Date(currentWeek);

        date.setDate(
            date.getDate() - 7
        );

        setCurrentWeek(
            date
        );
    }

    function nextWeek() {

        const date =
            new Date(currentWeek);

        date.setDate(
            date.getDate() + 7
        );

        setCurrentWeek(
            date
        );
    }

    function goToday() {

        setCurrentWeek(
            getMonday(new Date())
        );
    }

    // =========================================
    // WEEK DATES
    // =========================================

    const weekDates =
        days.map(
            (_, index) => {

                const date =
                    new Date(
                        currentWeek
                    );

                date.setDate(
                    currentWeek.getDate() +
                    index
                );

                return date;

            }
        );

    // =========================================
    // FILTER
    // =========================================

    const filteredTimetables =
        timetables.filter(
            (item) => {

                const subjectName =
                    subjects.find(
                        (s) =>
                            String(s.id) ===
                            String(
                                item.subject_id
                            )
                    )?.name || "";

                const className =
                    classes.find(
                        (c) =>
                            String(c.id) ===
                            String(
                                item.class_id
                            )
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
                    String(
                        item.teacher_id
                    ) ===
                    String(
                        teacherFilter
                    );

                return (
                    matchesSearch &&
                    matchesTeacher
                );
            }
        );

    // =========================================
    // GET DAY SCHEDULES
    // =========================================

    function getSchedulesForDay(
        date
    ) {

        const dateString =
            date.toISOString()
                .split("T")[0];

        return filteredTimetables.filter(
            (item) => {

                return (
                    item.date ===
                    dateString
                );

            }
        );
    }

    // =========================================
    // NAMES
    // =========================================

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

    // =========================================
    // WEEK TITLE
    // =========================================

    const weekTitle =
        `${formatDate(
            weekDates[0]
        )} – ${formatDate(
            weekDates[6]
        )}`;

    // =========================================
    // RENDER
    // =========================================

    return (

        <Box
            sx={{
                backgroundColor:
                    "#f8fafc",
                minHeight:
                    "100vh",
                p: 3
            }}
        >

            {/* =================================
                HEADER
            ================================= */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems:
                        "center",
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

                <Button
                    variant="contained"
                    startIcon={
                        <AddIcon />
                    }
                    onClick={() =>
                        openAddModal()
                    }
                >
                    ADD LESSON
                </Button>

            </Box>

            {/* =================================
                CONTROLS
            ================================= */}

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    alignItems:
                        "center",
                    mb: 2,
                    flexWrap:
                        "wrap"
                }}
            >

                {/* CLASS */}

                <TextField
                    select
                    size="small"
                    label="Class"
                    value={
                        selectedClass
                    }
                    onChange={
                        handleClassChange
                    }
                    sx={{
                        width: 200,
                        backgroundColor:
                            "white"
                    }}
                >

                    <MenuItem value="">
                        Select Class
                    </MenuItem>

                    {classes.map(
                        (item) => (

                            <MenuItem
                                key={
                                    item.id
                                }
                                value={
                                    item.id
                                }
                            >
                                {
                                    item.name
                                }
                            </MenuItem>

                        )
                    )}

                </TextField>

                {/* =================================
                    TIMETABLE DROPDOWN
                ================================= */}

                <Box
                    sx={{
                        display:
                            "flex",
                        alignItems:
                            "center",
                        gap: 1
                    }}
                >

                    <TextField
                        select
                        size="small"
                        label="Timetable"
                        value={
                            selectedTimetableGroup
                        }
                        onChange={
                            handleTimetableChange
                        }
                        disabled={
                            !selectedClass
                        }
                        sx={{
                            width: 200,
                            backgroundColor:
                                "white"
                        }}
                    >

                        {timetableGroups.map(
                            (group) => (

                                <MenuItem
                                    key={
                                        group.id
                                    }
                                    value={
                                        String(
                                            group.id
                                        )
                                    }
                                >
                                    {
                                        group.name
                                    }
                                </MenuItem>

                            )
                        )}

                    </TextField>

                    {/* ADD TIMETABLE */}

                    <Button
                        variant="outlined"
                        onClick={() => {

                            setNewGroupName("");

                            setGroupOpen(
                                true
                            );

                        }}
                        disabled={
                            !selectedClass
                        }
                    >
                        + Add Timetable
                    </Button>

                </Box>

                {/* SEARCH */}

                <TextField
                    size="small"
                    placeholder="Search subject..."
                    value={
                        search
                    }
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    sx={{
                        width: 260,
                        backgroundColor:
                            "white"
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment
                                position="start"
                            >
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />

                {/* TEACHER */}

                <TextField
                    select
                    size="small"
                    label="Teacher"
                    value={
                        teacherFilter
                    }
                    onChange={(e) =>
                        setTeacherFilter(
                            e.target.value
                        )
                    }
                    sx={{
                        width: 200,
                        backgroundColor:
                            "white"
                    }}
                >

                    <MenuItem value="">
                        All Teachers
                    </MenuItem>

                    {teachers.map(
                        (teacher) => (

                            <MenuItem
                                key={
                                    teacher.id
                                }
                                value={
                                    teacher.id
                                }
                            >
                                {
                                    teacher.name
                                }
                            </MenuItem>

                        )
                    )}

                </TextField>

                {/* WEEK */}

                <Box
                    sx={{
                        display:
                            "flex",
                        alignItems:
                            "center",
                        gap: 1,
                        ml: "auto"
                    }}
                >

                    <Button
                        variant="outlined"
                        onClick={
                            goToday
                        }
                    >
                        TODAY
                    </Button>

                    <IconButton
                        onClick={
                            previousWeek
                        }
                    >
                        <ChevronLeftIcon />
                    </IconButton>

                    <Typography
                        fontWeight="600"
                        sx={{
                            minWidth: 150,
                            textAlign:
                                "center"
                        }}
                    >
                        {
                            weekTitle
                        }
                    </Typography>

                    <IconButton
                        onClick={
                            nextWeek
                        }
                    >
                        <ChevronRightIcon />
                    </IconButton>

                </Box>

            </Box>

            {/* =================================
                CALENDAR
            ================================= */}

            <Paper
                sx={{
                    overflow:
                        "hidden",
                    border:
                        "1px solid #ddd"
                }}
            >

                {/* DAY HEADER */}

                <Box
                    sx={{
                        display:
                            "grid",
                        gridTemplateColumns:
                            "58px repeat(7, 1fr)"
                    }}
                >

                    <Box
                        sx={{
                            borderRight:
                                "1px solid #ddd",
                            borderBottom:
                                "1px solid #ddd"
                        }}
                    />

                    {weekDates.map(
                        (
                            date,
                            index
                        ) => {

                            const isToday =
                                date.toDateString() ===
                                new Date()
                                    .toDateString();

                            return (

                                <Box
                                    key={
                                        index
                                    }
                                    sx={{
                                        height:
                                            70,
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
                                        {
                                            days[
                                                index
                                            ]
                                        }
                                    </Typography>

                                    <Typography
                                        variant="h6"
                                        color={
                                            isToday
                                                ? "primary"
                                                : "text.primary"
                                        }
                                    >
                                        {
                                            date.getDate()
                                        }
                                    </Typography>

                                </Box>

                            );

                        }
                    )}

                </Box>

                {/* BODY */}

                <Box
                    sx={{
                        display:
                            "grid",
                        gridTemplateColumns:
                            "58px repeat(7, 1fr)"
                    }}
                >

                    {/* TIME */}

                    <Box>

                        {Array.from(
                            {
                                length:
                                    END_HOUR -
                                    START_HOUR
                            },
                            (
                                _,
                                index
                            ) => {

                                const hour =
                                    START_HOUR +
                                    index;

                                return (

                                    <Box
                                        key={
                                            hour
                                        }
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
                                            {
                                                hour >
                                                12
                                                    ? hour -
                                                      12
                                                    : hour
                                            }{" "}
                                            {
                                                hour >=
                                                12
                                                    ? "PM"
                                                    : "AM"
                                            }
                                        </Typography>

                                    </Box>

                                );

                            }
                        )}

                    </Box>

                    {/* DAYS */}

                    {weekDates.map(
                        (
                            date,
                            dayIndex
                        ) => {

                            const schedules =
                                getSchedulesForDay(
                                    date
                                );

                            return (

                                <Box
                                    key={
                                        dayIndex
                                    }
                                    sx={{
                                        position:
                                            "relative",
                                        height:
                                            (
                                                END_HOUR -
                                                START_HOUR
                                            ) *
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
                                        (
                                            _,
                                            index
                                        ) => (

                                            <Box
                                                key={
                                                    index
                                                }
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

                                    {/* ADD LESSON */}

                                    <IconButton
                                        size="small"
                                        onClick={() =>
                                            openAddModal(
                                                date
                                                    .toISOString()
                                                    .split(
                                                        "T"
                                                    )[0]
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

                                    {/* LESSONS */}

                                    {schedules.map(
                                        (
                                            item
                                        ) => {

                                            const start =
                                                getMinutes(
                                                    item.start_time
                                                );

                                            const end =
                                                getMinutes(
                                                    item.end_time
                                                );

                                            const top =
                                                (
                                                    (
                                                        start -
                                                        START_HOUR *
                                                        60
                                                    ) /
                                                    60
                                                ) *
                                                HOUR_HEIGHT;

                                            const height =
                                                Math.max(
                                                    45,
                                                    (
                                                        (
                                                            end -
                                                            start
                                                        ) /
                                                        60
                                                    ) *
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
                                                        top,
                                                        left: 4,
                                                        right: 4,
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
                                                        {
                                                            getSubjectName(
                                                                item.subject_id
                                                            )
                                                        }
                                                    </Typography>

                                                    <Typography
                                                        variant="caption"
                                                        display="block"
                                                    >
                                                        {
                                                            formatTime(
                                                                item.start_time
                                                            )
                                                        }
                                                        {" – "}
                                                        {
                                                            formatTime(
                                                                item.end_time
                                                            )
                                                        }
                                                    </Typography>

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {
                                                            getTeacherName(
                                                                item.teacher_id
                                                            )
                                                        }
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

            {/* =================================
                ADD TIMETABLE DIALOG
            ================================= */}

            <Dialog
                open={
                    groupOpen
                }
                onClose={() => {

                    if (!creatingGroup) {
                        setGroupOpen(
                            false
                        );
                    }

                }}
                fullWidth
                maxWidth="xs"
            >

                <DialogTitle>
                    Add Timetable
                </DialogTitle>

                <DialogContent>

                    <Typography
                        sx={{
                            mt: 1,
                            mb: 1
                        }}
                    >
                        Class
                    </Typography>

                    <Typography
                        fontWeight="600"
                        sx={{
                            mb: 2
                        }}
                    >
                        {
                            getClassName(
                                selectedClass
                            )
                        }
                    </Typography>

                    <TextField
                        autoFocus
                        fullWidth
                        label="Timetable Name"
                        placeholder="Timetable 2"
                        margin="normal"
                        value={
                            newGroupName
                        }
                        onChange={(e) =>
                            setNewGroupName(
                                e.target.value
                            )
                        }
                    />

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() =>
                            setGroupOpen(
                                false
                            )
                        }
                        disabled={
                            creatingGroup
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={
                            createTimetableGroup
                        }
                        disabled={
                            creatingGroup
                        }
                    >
                        {
                            creatingGroup
                                ? "ADDING..."
                                : "ADD"
                        }
                    </Button>

                </DialogActions>

            </Dialog>

            {/* =================================
                ADD / EDIT LESSON DIALOG
            ================================= */}

            <Dialog
                open={open}
                onClose={closeModal}
                fullWidth
                maxWidth="sm"
            >

                <DialogTitle>

                    {
                        editId
                            ? "Edit Lesson"
                            : "Add Lesson"
                    }

                </DialogTitle>

                <DialogContent>

                    {/* CLASS */}

                    <TextField
                        fullWidth
                        select
                        label="Class"
                        margin="normal"
                        value={
                            form.class_id
                        }
                        disabled
                    >

                        {classes.map(
                            (item) => (

                                <MenuItem
                                    key={
                                        item.id
                                    }
                                    value={
                                        item.id
                                    }
                                >
                                    {
                                        item.name
                                    }
                                </MenuItem>

                            )
                        )}

                    </TextField>

                    {/* TIMETABLE */}

                    <TextField
                        fullWidth
                        select
                        label="Timetable"
                        margin="normal"
                        value={
                            form.timetable_group_id
                        }
                        disabled
                    >

                        {timetableGroups.map(
                            (group) => (

                                <MenuItem
                                    key={
                                        group.id
                                    }
                                    value={
                                        String(
                                            group.id
                                        )
                                    }
                                >
                                    {
                                        group.name
                                    }
                                </MenuItem>

                            )
                        )}

                    </TextField>

                    {/* SUBJECT */}

                    <TextField
                        fullWidth
                        select
                        label="Subject"
                        margin="normal"
                        value={
                            form.subject_id
                        }
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
                                    key={
                                        item.id
                                    }
                                    value={
                                        item.id
                                    }
                                >
                                    {
                                        item.name
                                    }
                                </MenuItem>

                            )
                        )}

                    </TextField>

                    {/* TEACHER */}

                    <TextField
                        fullWidth
                        select
                        label="Teacher"
                        margin="normal"
                        value={
                            form.teacher_id
                        }
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
                                    key={
                                        item.id
                                    }
                                    value={
                                        item.id
                                    }
                                >
                                    {
                                        item.name
                                    }
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
                        value={
                            form.date
                        }
                        onChange={(e) =>
                            setForm({
                                ...form,
                                date:
                                    e.target.value
                            })
                        }
                    />

                    {/* START */}

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

                    {/* END */}

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
                            onClick={() =>
                                deleteTimetable(
                                    editId
                                )
                            }
                        >
                            Delete
                        </Button>

                    )}

                    <Button
                        onClick={
                            closeModal
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={
                            saveTimetable
                        }
                    >
                        {
                            editId
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