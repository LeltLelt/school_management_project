import { useEffect, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import {
    ThemeProvider,
    createTheme,
    CssBaseline,
} from "@mui/material";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Classes from "./pages/Classes";
import Subjects from "./pages/Subjects";
import StudentEnrollments from "./pages/StudentEnrollments";
import Attendance from "./pages/Attendances";
import Timetables from "./pages/Timetables";
import ExamResults from "./pages/ExamResults";
import Settings from "./pages/Settings";


function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}


function App() {

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );


    useEffect(() => {

        const handleSettingsChange = () => {

            setDarkMode(
                localStorage.getItem("darkMode") === "true"
            );

        };

        window.addEventListener(
            "settingsChanged",
            handleSettingsChange
        );

        return () => {

            window.removeEventListener(
                "settingsChanged",
                handleSettingsChange
            );

        };

    }, []);


    const theme = createTheme({

        palette: {
            mode: darkMode ? "dark" : "light",
        },

    });


    return (

        <ThemeProvider theme={theme}>

            <CssBaseline />

            <BrowserRouter>

                <Routes>

                    {/* Login */}

                    <Route
                        path="/login"
                        element={<Login />}
                    />


                    {/* Signup */}

                    <Route
                        path="/signup"
                        element={<Signup />}
                    />


                    {/* Protected Pages */}

                    <Route
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }
                    >

                        <Route
                            path="/"
                            element={<Home />}
                        />

                        <Route
                            path="/students"
                            element={<Students />}
                        />

                        <Route
                            path="/teachers"
                            element={<Teachers />}
                        />

                        <Route
                            path="/classes"
                            element={<Classes />}
                        />

                        <Route
                            path="/subjects"
                            element={<Subjects />}
                        />

                        <Route
                            path="/student-enrollments"
                            element={<StudentEnrollments />}
                        />

                        <Route
                            path="/attendances"
                            element={<Attendance />}
                        />

                        <Route
                            path="/timetables"
                            element={<Timetables />}
                        />

                        <Route
                            path="/exam-results"
                            element={<ExamResults />}
                        />

                        <Route
                            path="/settings"
                            element={<Settings />}
                        />

                    </Route>

                </Routes>

            </BrowserRouter>

        </ThemeProvider>

    );
}

export default App;






