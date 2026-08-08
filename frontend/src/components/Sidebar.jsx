import { useEffect, useState } from "react";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { NavLink } from "react-router-dom";

function Sidebar({ open, onClose }) {

    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "en"
    );


    useEffect(() => {

        const handleLanguageChange = () => {

            setLanguage(
                localStorage.getItem("language") || "en"
            );

        };


        window.addEventListener(
            "settingsChanged",
            handleLanguageChange
        );


        return () => {

            window.removeEventListener(
                "settingsChanged",
                handleLanguageChange
            );

        };

    }, []);


    const menuItems = [

        {
            text: language === "my"
                ? "ပင်မစာမျက်နှာ"
                : "Dashboard",

            path: "/"
        },

        {
            text: language === "my"
                ? "ကျောင်းသားများ"
                : "Students",

            path: "/students"
        },

        {
            text: language === "my"
                ? "ဆရာ/ဆရာမများ"
                : "Teachers",

            path: "/teachers"
        },

        {
            text: language === "my"
                ? "အတန်းများ"
                : "Classes",

            path: "/classes"
        },

        {
            text: language === "my"
                ? "ဘာသာရပ်များ"
                : "Subjects",

            path: "/subjects"
        },

        {
            text: language === "my"
                ? "ကျောင်းသားစာရင်းသွင်းခြင်း"
                : "Student Enrollment",

            path: "/student-enrollments"
        },

        {
            text: language === "my"
                ? "တက်ရောက်မှု"
                : "Attendance",

            path: "/attendances"
        },

        {
            text: language === "my"
                ? "အချိန်ဇယား"
                : "Timetable",

            path: "/timetables"
        },

        {
            text: language === "my"
                ? "စာမေးပွဲရလဒ်"
                : "Exam Results",

            path: "/exam-results"
        },

        {
            text: language === "my"
                ? "ဆက်တင်များ"
                : "Settings",

            path: "/settings"
        }

    ];


    return (

        <Drawer
            open={open}
            onClose={onClose}
        >

            <List
                sx={{
                    width: 250
                }}
            >

                {menuItems.map((item) => (

                    <ListItem
                        key={item.path}
                        disablePadding
                    >

                        <ListItemButton
                            component={NavLink}
                            to={item.path}
                            onClick={onClose}
                        >

                            <ListItemText
                                primary={item.text}
                            />

                        </ListItemButton>

                    </ListItem>

                ))}

            </List>

        </Drawer>

    );

}

export default Sidebar;

