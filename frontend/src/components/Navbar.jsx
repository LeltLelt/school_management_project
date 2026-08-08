import { useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import MenuIcon from "@mui/icons-material/Menu";


function Navbar({ onMenuClick }) {

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


    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";

    };


    return (

        <AppBar position="static">

            <Toolbar>

                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={onMenuClick}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>


                <Typography variant="h6">

                    {language === "my"
                        ? "ကျောင်းစီမံခန့်ခွဲမှုစနစ်"
                        : "School Management System"}

                </Typography>


                <Button
                    color="inherit"
                    onClick={handleLogout}
                    sx={{
                        marginLeft: "auto"
                    }}
                >

                    {language === "my"
                        ? "ထွက်မည်"
                        : "Logout"}

                </Button>

            </Toolbar>

        </AppBar>

    );

}


export default Navbar;

